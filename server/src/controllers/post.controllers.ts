import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { Post,Tag, User } from "../models";
import { ENV } from "../config";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface ModRequest extends Request {
    user?: {
        id: string,
        username: string,
        created_at: Date,
        updated_at: Date,
    }
}

export const createPost = async (req: ModRequest, res: Response) => {
    const session = await mongoose.startSession(); 
    session.startTransaction(); 
  
    try {
      const { title, type, tags, link, desc } = req.body;
      const user_id = req.user?.id;
  
      if (!title || !type || !tags || !link) {
        await session.abortTransaction(); 
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'All fields are required' });
      }
  
      if (!user_id) {
        await session.abortTransaction(); 
        return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
      }

      const tagIds: mongoose.Types.ObjectId[] = [];

      for (const tagName of tags) {
        let tag = await Tag.findOne({ name: tagName });
  
        if (!tag) {
          tag = await Tag.create({ name: tagName });
        }
  
        tagIds.push(tag._id);
      }
  
      const newPost = new Post({ title, type, tags:tagIds, link, user: user_id, desc });
      const savedPost = await newPost.save({ session });

      await Promise.all(
      tagIds.map(async (tagId) => {
        await Tag.findByIdAndUpdate(tagId, {
          $addToSet: { posts: newPost._id }
        });
      })
    );

      await User.updateOne(
        { _id: user_id },
        { $push: { posts: savedPost._id } },
        { session }
      );
  
      await session.commitTransaction(); 
  
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Post created successfully',
        post: {
          id: savedPost._id,
          title: savedPost.title,
          link: savedPost.link,
          user_id: user_id,
          created_at: savedPost.created_at,
          updated_at: savedPost.updated_at,
        },
      });
    } catch (error: any) {
      await session.abortTransaction(); 
      console.log("🔴 Error creating post:", error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    } finally {
      session.endSession(); 
    }
  };

export const getPosts = async (req: ModRequest, res: Response) => {
    try {
        const user_id = req.user?.id; 
        const {
            page = '1',
            limit = '10',
            sortBy = 'created_at',
            order = 'desc',
            type,
            tags
          } = req.query;
      
          const pageNumber = parseInt(page as string);
          const limitNumber = parseInt(limit as string);
          const sortOrder = order === 'asc' ? 1 : -1;
      
          // Build filter object
          const filter: any = {
            is_deleted: false,
            user: user_id 
          };
      
          if (type) filter.type = type;
          if (tags) filter.tags = { $in: (tags as string).split(',') };
      
          // Query the database
          const posts = await Post.find(filter)
            .populate('user', 'username') // populate user info
            .populate('tags', 'name')           // populate tag names
            .sort({ [sortBy as string]: sortOrder })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
      
          const totalPosts = await Post.countDocuments(filter);
      
          res.status(200).json({
            success: true,
            message: "Posts retrieved successfully",
            data: {
                page: pageNumber,
                totalPages: Math.ceil(totalPosts / limitNumber),
                totalPosts,
                posts,
            }
          });
    } catch (error: any) {
        console.log("🔴 Error retrieving posts:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
    }
};

export const deletePost = async (req: ModRequest, res: Response) => {
  let session:any = null;

  try {
      const postId = req.params.id;
      const user_id = req.user?.id;

      if (!user_id) {
          return res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ success: false, message: "User not authenticated" });
      }

      if (!postId) {
          return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ success: false, message: "Post ID is required" });
      }

      session = await mongoose.startSession();
      session.startTransaction(); 

      const post = await Post.findOne({ _id: postId, is_deleted: false }).session(session); 

      if (!post) {
          await session.abortTransaction(); 
          return res
              .status(StatusCodes.NOT_FOUND)
              .json({ success: false, message: "Post not found" });
      }

      if (post.user.toString() !== user_id.toString()) {
          await session.abortTransaction(); 
          return res
              .status(StatusCodes.FORBIDDEN)
              .json({ success: false, message: "You are not authorized to delete this post" });
      }

      const associatedTagIds = post.tags;

      post.is_deleted = true;
      await post.save({ session }); 

      if (associatedTagIds && associatedTagIds.length > 0) {
          await Tag.updateMany(
              { _id: { $in: associatedTagIds } },
              { $pull: { posts: post._id } },
              { session } 
          );
      }

      await User.updateOne(
          { _id: user_id },
          { $pull: { posts: post._id } },
          { session }
      );

      await session.commitTransaction();

      res.status(StatusCodes.OK).json({
          success: true,
          message: "Post deleted successfully",
          post: {
              id: post._id,
              title: post.title,
              user_id: post.user,
          },
      });

  } catch (error: any) {
      if (session) {
          await session.abortTransaction(); 
      }
      console.error("🔴 Error deleting post:", error.message);
      res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: "Internal Server Error" });
  } finally {
      if (session) {
          session.endSession(); 
      }
  }
};

export const getShareLink = async (req: ModRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { share } = req.body;
      const user_id = req.user?.id;
  
      if (typeof share !== "boolean") {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({ message: "Invalid 'share' value" });
      }
  
      const post = await Post.findById(id);
  
      if (!post || post.is_deleted) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found" });
      }

      if( post.user.toString() !== user_id ) {
        return res.status(StatusCodes.UNAUTHORIZED).json({success:false, message: "You are not authorized to share this post" });
      }
  
      if (share) {
        if (!post.share_id) {
          post.share_id = uuidv4(); 
        }
      } else {
        post.share_id = undefined;
      }
  
      await post.save();
  
      const link = share ? `${ENV.BASE_URL}/${post.share_id}` : null;
  
      return res.status(StatusCodes.OK).json({success:true, message:"operation succesfull", link });
    } catch (error:any) {
      console.error("Error sharing post:", error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success:false, message: "Internal Server Error" });
    }
  };

  export const getPublicBrain = async (req: Request, res: Response) => {
    try {
      const { shareId } = req.params;

      if( !shareId ) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Share ID is required" });
      }

      const data = await User.findOne({ share_id: shareId, is_deleted:false }).populate({
        path:"posts",
        match:{is_deleted:false},
        options: { sort: { 'createdAt': -1 } }
      });

      if(!data || !data.posts || data.posts.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          success: false, 
          message: "Public brain not found or no posts available" 
        });
      }

      res.status(StatusCodes.OK).json({ 
        success: true,
        message: "Public brain retrieved successfully",
        data: {
          username:data?.username || "Anonymous",
          contents: data?.posts || [],
        }
       });
    } catch (error: any) {
      console.error("🔴 Error retrieving public brain:", error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  export const addToStar = async(req:ModRequest, res:Response) => {
    try{
      const userId = req.user?.id;
      const post_id = req.params?.id;
      const starred = req.query?.starred;

      console.log("user_id : ", userId);
      console.log("post_id : ",post_id);
      console.log("starred : ", starred);

      if(!userId){
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          success: false, 
          message: "Unauthorized user is trying to access the route!" 
        });
      }

      if(!post_id){
        return res.status(StatusCodes.NOT_FOUND).json({ 
          success: false, 
          message: "post id is required" 
        });
      }

      let data = null;
      if(starred == '0'){
        data = await User.findByIdAndUpdate(userId, {
          $addToSet:{
            starredPosts:post_id
          }
        }, {new:true,  select: '-password -__v'});
      }else{
        data = await User.findByIdAndUpdate(userId,{
         $pull:{ starredPosts:post_id } 
        },{new:true,  select: '-password -__v'})
      }

      console.log('data : ', data);

      res.status(StatusCodes.OK).json({
        success:true,
        message:`post ${starred == '0' ? "added to" : "removed from"} star succesfully!`,
        post:data
      })

    }catch(error:any){
      console.error("🔴 Error adding starred posts:", error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  export const getMyStarPosts=async(req:ModRequest, res:Response)=>{
    try{
       const user_id = req.user?.id;

       if(!user_id){
          return res.status(StatusCodes.FORBIDDEN).json({
            success:false,
            message:"unauthorized to access this route!"
          })
       }

       const result = await User.findById(user_id).select('_id').populate({
          path:'starredPosts',
          populate:{
            path:'tags'
          }
       });

       if(!result || result?.starredPosts?.length === 0 ){
         return res.status(StatusCodes.NOT_FOUND).json({
          success:false,
          message:"No starred post found!"
         })
       }

       res.status(StatusCodes.OK).json({
        success:true,
        message:"Sucesfully fetched starred posts!",
        posts:result
       })

    }catch(error:any){
      console.log('🔴 Error while getting starred post',error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
    }
  }