import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import { posts_url } from '../Endpoints/Feed';
import { getPosts } from '../services/feed';
import useToast from '../hooks/useToast';
interface TagProps {
  _id: string;
  name: string;
}

interface UserProps {
  _id: string;
  username: string;
}
export interface Post {
    _id: string;
    title: string;
    desc?: string;
    link: string;
    type: 'tweet' | 'youtube' | 'article';
    tags: TagProps[];
    user: UserProps;
    created_at: string;
  }

  interface PostContextType {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    addPost: (post: Post) => void;
    removePost: (id: string) => void;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export const PostContext = createContext<PostContextType | undefined>(undefined);

  export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { showToast } = useToast();
  
    const addPost = (post: Post) => setPosts((prev) => [post, ...prev]);
  
    const removePost = (id: string) =>
      setPosts((prev) => prev.filter((post) => post._id !== id));

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const postArray = await getPosts();
            setPosts(postArray);
            showToast({
                variant: 'success',
                message: 'Posts fetched successfully!'
            })
        } catch (error) {
            showToast({
                variant: 'error',
                message: 'Failed to fetch posts. Please try again later.'
            })
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPosts();
        console.log('Posts fetched successfully');
    },[])
  
    return (
      <PostContext.Provider value={{ posts, setPosts, addPost, removePost, loading, setLoading }}>
        {children}
      </PostContext.Provider>
    );
  };