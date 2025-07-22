import { Link } from 'react-router';
import { type AuthCommonProps} from '../../pages/AuthForm';
import CreateInput from '../createPost/CreateInput';
import CtaBtn from '../lib/CtaBtn';
import { Mail, UserRound, Lock } from 'lucide-react';

export default function SignupForm(props:AuthCommonProps) {
  return (
    <div className='lg:w-[28vw] flex flex-col p-4 px-8 border-2 border-gray-200 py-6 mt-6 rounded-2xl'>
       <h4 className='font-serif font-semibold text-2xl mb-3'>Signup for free</h4>
       <form className='flex flex-col gap-6 mt-3 w-full'>
          <CreateInput startIcon={<UserRound size={15} color="#99a1af"/>} required={true} type="text" label='Fullname' placeholder='Enter your name' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          <CreateInput startIcon={<Mail size={15} color="#99a1af"/>} required={true} type="email" label='Email' placeholder='Enter your email' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          <CreateInput startIcon={<Lock size={15} color="#99a1af"/>} required={true} type="password" label='Password' placeholder='Enter your password' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          <CtaBtn label='Create Account' size='large' onClick={(()=>{})} className='w-full flex justify-center'/>
          <div className='w-full h-[2px] bg-gray-200 my-2'></div>
          <p className='text-center text-gray-400'>Already have an account? <Link to="/" className="text-primary-light">signin</Link></p>
       </form>
    </div>
  )
}
