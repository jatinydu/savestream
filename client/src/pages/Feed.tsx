import { useEffect } from "react";
import Card from "../components/Common/Card";
import FeedHeader from "../components/Feed/FeedHeader";
import { usePost } from '../hooks/usePost';
import Spinner from "../components/lib/Spinner";

export default function Feed() {
  const { posts, loading } = usePost();


  useEffect(() => {
     console.log('Posts in Feed:', posts);
   }, [posts]);

  if(loading) {
    return <Spinner/>
  }

  if( posts.length === 0) {
    return (
      <div  className='w-full h-[100vh] flex justify-center items-center'>
           <p>No Posts Found...</p>
      </div>
    )
  }

  return (
    <div className='w-full min-h-[100vh] pt-[7%] px-10'>
      <FeedHeader />
      {/* Card container */}
      <div className="py-8 h-auto flex flex-wrap gap-8">
        {
          posts.length > 0 && posts.map((post) => (
            <Card key={post._id} tags={post.tags} title={post.title} description={post.desc} created_at={new Date(post.created_at).toLocaleDateString()} link={post.link} type={post.type} user={post.user} />
          ))
        }
      </div>
    </div>
  )
}
