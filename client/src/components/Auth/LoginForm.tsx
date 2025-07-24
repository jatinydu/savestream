import {type AuthCommonProps} from '../../pages/AuthForm';
import CreateInput from '../createPost/CreateInput';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router';
import CtaBtn from '../lib/CtaBtn';

export default function LoginForm(props:AuthCommonProps) {
  return (
    <div className='lg:w-[28vw] md:w-[50vw] w-[90vw] flex flex-col p-4 px-8 border-2 border-gray-200 py-6 mt-6 rounded-2xl'>
       <h4 className='font-serif font-semibold text-2xl mb-3'>Signin to your account</h4>
       <form className='flex flex-col gap-6 mt-3 w-full'>
          <CreateInput startIcon={<Mail size={15} color="#99a1af"/>} required={true} type="email" label='Email' placeholder='Enter your email' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          <CreateInput startIcon={<Lock size={15} color="#99a1af"/>} required={true} type="password" label='Password' placeholder='Enter your password' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          <Link to="/" className='text-sm text-primary-light font-medium'>Forgot Password?</Link>
          <CtaBtn label='Sign in' size='large' onClick={(()=>{})} className='w-full flex justify-center'/>
          <div className='w-full h-[2px] bg-gray-200 my-2'></div>
          <p className='text-center text-gray-400'>Dont have an account? <Link to="/signup" className="text-primary-light">Sign up</Link></p>
       </form>
    </div>
  )
}
