export default function Tag({text, onClick}: {text: string, onClick?: () => void}) {
  return (
    <button onClick={onClick} className='px-3 py-1 rounded-2xl bg-gray-200 text-black text-xs font-medium self-start'>
      {text}
    </button>
  )
}
