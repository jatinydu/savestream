import { login, signup } from './auth.controllers';
import { createPost, getPosts, deletePost } from './post.controllers';
import { createTag, getTags } from './tag.controllers';

export const Auth = {
  login,
  signup,
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