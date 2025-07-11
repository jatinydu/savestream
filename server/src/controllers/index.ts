import { login, signup } from './auth.controllers';
import { createPost, getPosts, deletePost } from './post.controllers';

export const Auth = {
  login,
  signup,
};

export const Post = {
  createPost,
  getPosts,
  deletePost,
}