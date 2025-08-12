import { useEffect, useState } from 'react'
import CtaBtn from '../components/lib/CtaBtn'
import { ArrowLeft } from 'lucide-react'
import FeedHeader from '../components/Feed/FeedHeader'
import useToast from '../hooks/useToast'
import Spinner from '../components/lib/Spinner'
import Card from '../components/Common/Card'
import { useNavigate } from 'react-router'
import { getMyStarPosts } from '../services/star'

export default function StarPost() {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [starClick, setStarClick] = useState(false);
  
  const fetchPosts=async()=>{
    setLoading(true);
    try{
        
        const result = await getMyStarPosts();

        if(!result.success){
            showToast({
                variant:'info',
                message:result.message
            })
        }else{
            console.log("result : ", result);
            setPosts(result.posts.starredPosts);
        }
    }catch(error:any){
        console.log('🔴error getting starred posts!', error.message);
        showToast({
            variant:'error',
            message: "error while getting starred post!"
        })
    }finally{
        setLoading(false);
    }
  }

  useEffect(()=>{
    fetchPosts();
  },[starClick])

  if(loading){
    return <Spinner/>
  }

  return (
    <div className='w-full min-h-[100vh] pt-[8%] px-10 flex flex-col gap-5'>
        <CtaBtn className='mt-[2px]' variant='ghost' startIcon={<ArrowLeft size={18}/>} label='Back to Feeds' onClick={()=>{ navigate('/')  }}/>
        <FeedHeader/>
        <div className='flex gap-6 flex-wrap h-auto overflow-hidden py-7'>
        {
            posts?.length ? posts.map((current:any,index:any)=>{
                return <Card is_starred={current.is_starred} setStarClick={setStarClick} key={index} post_id={current._id} link={current.link} title={current.title} description={current.desc} tags={current.tags} created_at={current.created_at} type={current.type}/>
            }) : <div className='w-full h-[50vh] flex items-center justify-center'>
                <p>No Starred posts!</p>
            </div>
        }
        </div>
    </div>
  )
}
