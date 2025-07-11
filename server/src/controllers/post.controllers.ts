import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { Post,Tag } from "../models";
import mongoose from "mongoose";

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
      const { title, type, tags, link } = req.body;
      const user_id = req.user?.id;
  
      if (!title || !type || !tags || !link) {
        await session.abortTransaction(); 
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'All fields are required' });
      }
  
      if (!user_id) {
        await session.abortTransaction(); 
        return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'User not authenticated' });
      }
  
      const newPost = new Post({ title, type, tags, link, user: user_id });
      const savedPost = await newPost.save({ session });
  
      if (tags && tags.length > 0) {
        await Tag.updateMany(
          { _id: { $in: tags } },
          { $push: { posts: savedPost._id } },
          { session } 
        );
      }
  
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
    try {
        const postId = req.params.id;
        const user_id = req.user?.id;

        if( !user_id) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ success: false, message: "User not authenticated" });
        }
    
        if (!postId) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ success: false, message: "Post ID is required" });
        }
    
        const post = await Post.findById(postId);
    
        if (!post) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ success: false, message: "Post not found" });
        }

        if( post.user.toString() !== user_id.toString() ) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ success: false, message: "You are not authorized to delete this post" });
        }

        const associatedTagIds = post.tags;
    
        post.is_deleted = true;
        await post.save();
 
        if (associatedTagIds && associatedTagIds.length > 0) {
            await Tag.updateMany(
                { _id: { $in: associatedTagIds } }, 
                { $pull: { posts: post._id } } 
            );
        }
    
        res.status(StatusCodes.OK).json({
        success: true,
        message: "Post deleted successfully",
        post: {
            id: post._id,
            title: post.title,
            link: post.link,
            user_id: post.user,
            created_at: post.created_at,
            updated_at: post.updated_at,
        },
        });
    
    } catch (error: any) {
        console.log("🔴 Error deleting post:", error.message);
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success:false, message: "Internal Server Error" });
    }
};
