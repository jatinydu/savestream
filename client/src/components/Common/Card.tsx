import React from 'react'
import { Link } from 'react-router'
import ActionBtn from '../lib/ActionBtn'
import { Star, Globe, Calendar, ExternalLink } from 'lucide-react'
import Tag from '../lib/Tag'

export default function Card() {
  return (
    <div className='w-[450px] min-h-[350px] border-1 border-gray-300 rounded-2xl py-7 px-7'>
      {/* Card Header */}
      <ul className='flex justify-between items-center w-full'>
        <span className='flex items-center gap-2'>
           <Globe size={15} color='gray'/>
           <Link to="xyz.com" className='text-gray-600 text-xs'>example.com</Link>
        </span>
        <ActionBtn size='xsmall' className='rounded-lg border-none' icon={<Star size={13}/>} variant='ghost' onClick={()=>{}}/>
      </ul>
      {/* Card Content */}
      <div className='w-full flex flex-col justify-between gap-3 mt-5'>
         <h2 className='font-serif text-[1.40rem] font-medium leading-6'>The Future in Ai and Personal Knowledge Management</h2>
         <p className='text-sm text-gray-400'>A comprehensive look at AI-powered knowledge management tools and their impact on productivity.</p>
         <div className='flex gap-2 items-center py-3'>
            <Tag text='AI' onClick={() => {}} />
            <Tag text='Technology' onClick={() => {}} />
         </div>
         <div className='w-full h-[1px] bg-gray-200 opacity-70'></div>
         {/* date & links */}
         <div className='w-full flex items-center justify-between'>
            <span className='flex items-center gap-1'>
                <Calendar size={13} color='gray'/>
                <p className='text-xs text-gray-500'>1/15/2025</p>
            </span>
            <ActionBtn size='xsmall' className='rounded-lg border-none' icon={<ExternalLink size={15} color='black'/>} variant='ghost' onClick={()=>{}}/>
         </div>
      </div>
    </div>
  )
}
