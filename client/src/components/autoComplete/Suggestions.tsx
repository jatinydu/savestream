export default function Suggestions(props:{ categories: any[] }) {
  return (
    <div className='w-full flex flex-col gap-1 max-h-[100px] overflow-y-scroll bg-gray-200 py-1 rounded-lg custom-scrollbar'>
      {
        props.categories.map((category, index) => (
          <div key={index} className='flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-all duration-300'>
            <span className='text-gray-700 hover:text-gray-600'>{category.title}</span>
          </div>
        ))
      }
    </div>
  )
}
