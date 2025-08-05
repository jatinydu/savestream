interface Tag{
  id:string,
  name:string,
  created_at:string,
  updated_at:string
}

export default function Suggestions(props:{ tagsSuggestions: Tag[] }) {
  return (
    <div className='w-full flex flex-col gap-1 max-h-[100px] overflow-y-scroll bg-gray-200 py-1 rounded-lg custom-scrollbar'>
      {
        props.tagsSuggestions.map((tag) => (
          <div key={tag.id} className='flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-all duration-300'>
            <span className='text-gray-700 hover:text-gray-600'>{tag.name}</span>
          </div>
        ))
      }
    </div>
  )
}
