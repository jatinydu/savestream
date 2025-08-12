import { login, signup,isUserAuthenticated } from './auth.controllers';
import { createPost, getPosts, deletePost, addToStar, getMyStarPosts } from './post.controllers';
import { createTag, getTags, queryTags } from './tag.controllers';

export const Auth = {
  login,
  signup,
  isUserAuthenticated
};

export const Post = {
  createPost,
  getPosts,
  deletePost,
  addToStar,
  getMyStarPosts
}

export const Tag = {
  createTag,
  getTags,
  queryTags
};