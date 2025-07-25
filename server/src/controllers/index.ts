import { login, signup,isUserAuthenticated } from './auth.controllers';
import { createPost, getPosts, deletePost } from './post.controllers';
import { createTag, getTags } from './tag.controllers';

export const Auth = {
  login,
  signup,
  isUserAuthenticated
};

export const Post = {
  createPost,
  getPosts,
  deletePost,
}

export const Tag = {
  createTag,
  getTags,
};