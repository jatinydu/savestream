import { posts_url } from "../Endpoints/Feed";

export const starToggle=async(post_id:string)=>{
    const res = await fetch(`${posts_url}/star/${post_id}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
      })
  
      const data = await res.json();
      
      return data;
}

export const getMyStarPosts=async()=>{
    const response = await fetch(`${posts_url}/stars`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
    }) 

    const result = await response.json();

    return result;
}