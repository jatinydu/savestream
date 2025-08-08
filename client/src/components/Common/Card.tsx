import { Link } from 'react-router'
import ActionBtn from '../lib/ActionBtn'
import { Star, Globe, Calendar, ExternalLink } from 'lucide-react'
import Tag from '../lib/Tag'

interface TagProps {
  _id: string;
  name: string;
}

interface UserProps {
  _id: string;
}

export default function Card({link="https://savestream.vercel.app",linkLabel="example.com", title="Title is Not Working", description, tags=[], created_at="01/01/2025", type, user}: { link?: string, linkLabel?: string, title: string, description?: string, tags: TagProps[], created_at: string, type: 'tweet' | 'youtube' | 'article', user?: UserProps }) {
  return (
    <div className='w-[450px] border-1 border-gray-300 rounded-2xl py-7 px-7 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-100'>
      {/* Card Header */}
      <ul className='flex justify-between items-center w-full'>
        <span className='flex items-center gap-2'>
           <Globe size={15} color='gray'/>
           <Link to={link} className='text-gray-600 text-xs'>{linkLabel}</Link>
        </span>
        <ActionBtn size='xsmall' className='rounded-lg border-none' icon={<Star size={13}/>} variant='ghost' onClick={()=>{}}/>
      </ul>
      {/* Card Content */}
      <div className='w-full flex flex-col justify-between gap-3 mt-5'>
         <h2 className='font-serif text-[1.40rem] font-medium leading-6 overflow-hidden'>{title}</h2>
         <p className='text-sm text-gray-400'>{description}</p>
         <div className='flex gap-2 items-center py-3'>
            {
                tags && tags.map((tag, index) => (
                    <Tag key={`${index} ${tag._id}`} text={tag.name} onClick={() => {}}/>
                ))
            }
         </div>
         <div className='w-full h-[1px] bg-gray-200 opacity-70'></div>
         {/* date & links */}
         <div className='w-full flex items-center justify-between'>
            <span className='flex items-center gap-1'>
                <Calendar size={13} color='gray'/>
                <p className='text-xs text-gray-500'>{created_at}</p>
            </span>
            <ActionBtn size='xsmall' className='rounded-lg border-none' icon={<ExternalLink size={15} color='black'/>} variant='ghost' onClick={()=>{}}/>
         </div>
      </div>
    </div>
  )
}
