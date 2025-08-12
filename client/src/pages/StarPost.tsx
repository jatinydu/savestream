import React, { useEffect, useState, type FormEvent } from 'react'
import CtaBtn from '../components/lib/CtaBtn'
import { ArrowLeft } from 'lucide-react'
import FeedHeader from '../components/Feed/FeedHeader'
import useToast from '../hooks/useToast'
import { posts_url } from '../Endpoints/Feed'
import Spinner from '../components/lib/Spinner'
import Card from '../components/Common/Card'
import { useNavigate } from 'react-router'

export default function StarPost() {
  const [isStarred,setIsStarred] = useState('1');
  const [isStarOff, setIsStarOff] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const fetchPosts=async()=>{
    setLoading(true);
    try{
        const response = await fetch(`${posts_url}/stars`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }) 

        const result = await response.json();

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
  },[isStarOff])

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
                return <Card setIsStarOff={setIsStarOff} defaultStar='1' key={index} post_id={current._id} link={current.link} title={current.title} description={current.desc} tags={current.tags} created_at={current.created_at} type={current.type}/>
            }) : <div className='w-full h-[50vh] flex items-center justify-center'>
                <p>No Starred posts!</p>
            </div>
        }
        </div>
    </div>
  )
}
