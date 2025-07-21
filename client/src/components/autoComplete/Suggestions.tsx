import React from 'react'

export default function Suggestions(props:{ categories: any[] }) {
  return (
    <div className='w-full flex flex-col gap-1 max-h-[100px] overflow-x-hidden overflow-y-scroll scroll-auto'>
      {
        props.categories.map((category, index) => (
          <div key={index} className='flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer'>
            <span className='text-gray-700'>{category.title}</span>
            <span className='text-gray-500 text-sm'>{category.category}</span>
          </div>
        ))
      }
    </div>
  )
}
