import Card from "../components/Common/Card";
import FeedHeader from "../components/Feed/FeedHeader";
import { usePost } from '../hooks/usePost';

export default function Feed() {
  const { posts } = usePost();

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
      <div className="py-5 h-auto flex flex-wrap gap-3">
        {
          posts.length > 0 && posts.map((post) => (
            <Card key={post._id} tags={post.tags} title={post.title} description={post.desc} date={new Date(post.createdAt).toLocaleDateString()} link={post.link} type={post.type} user={post.user} />
          ))
        }
      </div>
    </div>
  )
}
