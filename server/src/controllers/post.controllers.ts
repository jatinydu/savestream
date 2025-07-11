import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { Post,Tag } from "../models";

interface ModRequest extends Request {
    user?: {
        id: string,
        username: string,
        created_at: Date,
        updated_at: Date,
    }
}

export const createPost = async (req: ModRequest, res: Response) => {
  try {
    const { title, type, tags, link } = req.body;
    const user_id = req.user?.id;
    if (!title || !type || !tags || !link) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "All fields are required" });
    }

    if (!user_id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: "User not authenticated" });
    }

    const newPost = new Post({
      title,
      type,
      tags,
      link,
      user:user_id,
    });

    const savedPost = await newPost.save();

    // After successfully saving the post, update the associated Tags
    if (tags && tags.length > 0) {
        await Tag.updateMany(
          { _id: { $in: tags } }, // Find all tags whose IDs are in the 'tags' array
          { $push: { posts: savedPost._id } } // Push the new post's ID to the 'posts' array of each tag
        );
      }

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Post created successfully",
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
    console.log("🔴 Error creating post:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success:false, message: "Internal Server Error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {};

export const deletePost = async (req: Request, res: Response) => {};
