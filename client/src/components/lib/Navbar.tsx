import Logo from '../../assets/savestream.png';
import CtaBtn from './CtaBtn';
import Toggle from './Toggle';
import { Star } from 'lucide-react'
export default function Navbar() {
  return (
    <div className="w-screen h-25 bg-white fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-10">
      {/* Img */}
      <div className='flex items-center'>
        <img src={Logo} alt="savestream_logo" className="h-10 w-10 rounded-full" />
        <div className='lg:flex flex-col hidden'>
            <span className="text-xl font-bold text-gray-800 ml-3 font-serif">Savestream</span>
            <span className="text-sm text-gray-500 ml-3 mt-[-3px]">Your personal AI-powered knowledge base</span>
        </div>
      </div>
      <ul className='flex items-center md:gap-5 gap-2'>
          <Toggle/>
          <CtaBtn variant='ghost' label='Starred' startIcon={<Star size={18}/>} onClick={()=>{}}/>
          <span className='text-gray-500 text-sm md:block hidden'>3 resources saved</span>
      </ul>
    </div>
  )
}
