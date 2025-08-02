import { posts_url } from "../Endpoints/Feed";

export const getPosts=async()=>{
    try {
        const response = await fetch(posts_url, {
            method: 'GET',
            credentials: 'include',
        });

        console.log('responce of api -> ', response);

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        console.log(response);

        const data = await response.json();
        return data.data.posts;
    } catch (error:any) {
        console.error('Failed to fetch posts:', error.message);
        throw error;
    }
}