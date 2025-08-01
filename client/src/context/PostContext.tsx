import React, { createContext, useState, type ReactNode } from 'react';

export interface Post {
    _id: string;
    title: string;
    desc?: string;
    link: string;
    type: 'tweet' | 'youtube' | 'article';
    tags: string[];
    user: Object;
    createdAt: string;
  }

  interface PostContextType {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    addPost: (post: Post) => void;
    removePost: (id: string) => void;
  }

  export const PostContext = createContext<PostContextType | undefined>(undefined);

  export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
  
    const addPost = (post: Post) => setPosts((prev) => [post, ...prev]);
  
    const removePost = (id: string) =>
      setPosts((prev) => prev.filter((post) => post._id !== id));
  
    return (
      <PostContext.Provider value={{ posts, setPosts, addPost, removePost }}>
        {children}
      </PostContext.Provider>
    );
  };