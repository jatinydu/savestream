import { useEffect, useState } from "react";
import Card from "../components/Common/Card";
import FeedHeader from "../components/Feed/FeedHeader";
import { usePost } from '../hooks/usePost';
import Spinner from "../components/lib/Spinner";

export default function Feed() {
  const [starClick, setStarClick] = useState(false);
  const { posts, loading, setLoading, fetchPosts } = usePost();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetchPosts();
      setLoading(false);
    };

    fetchData();
   }, [starClick]);

  // if(loading) {
  //   // return <Spinner/>
  // }

  if( posts.length === 0) {
    return (
      <div className='w-full h-[100vh] flex justify-center items-center'>
           <p>No Posts Found...</p>
      </div>
    )
  }

  return (
    <div className='w-full min-h-[100vh] lg:pt-[10%] md:pt-[15%] pt-[28%] px-10'>
      <FeedHeader />
      {/* Card container */}
      <div className="py-8 h-auto flex flex-wrap gap-8">
        {
          posts.length > 0 && posts.map((post,index) => (
            <Card setStarClick={setStarClick} is_starred={post.is_starred} key={`${post._id}-${index}`} tags={post.tags} post_id={post._id} title={post.title} description={post.desc} created_at={post.created_at} link={post.link} type={post.type} user={post.user} />
          ))
        }
      </div>
    </div>
  )
}
