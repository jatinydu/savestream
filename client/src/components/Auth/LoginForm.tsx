import {type AuthCommonProps} from '../../pages/AuthForm';
import CreateInput from '../createPost/CreateInput';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router';
import CtaBtn from '../lib/CtaBtn';
import { useRef, useState, type FormEvent } from 'react';
import useToast from '../../hooks/useToast';
import { login_url } from '../../Endpoints/Auth';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

export default function LoginForm(props:AuthCommonProps) {
  const [loading, setLoading] = useState(false);
  const { showToast} = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error,setError] = useState({
    username: '',
    password: ''
  });

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler=async(e:FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    setError({
      username: '',
      password: ''
    });
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if(username?.length === 0){
      setLoading(false);
      setError((prev)=>({
        ...prev,
        username: 'Username is required!'
      }))
    }

    if(password?.length === 0){
      setLoading(false);
      setError((prev)=>({
        ...prev,
        password: 'Password is required!'
      }))
    }

    try{

       console.log('Logging in with:', { username, password });

       const data = await fetch(login_url, {
         method:'POST',
         headers:{
          'Content-Type':'application/json'
         },
         body: JSON.stringify({
          username,
          password
         }),
         credentials: 'include' // Include cookies in the request
       })

       const res = await data.json();

       if(res.success){
        setError({
          username: '',
          password: ''
        })

        console.log(res);

        login({
          username: res.user.username
        })

        setLoading(false);
        showToast({
          variant: 'success',
          message: res.message || 'Login successful!'
        });

        navigate('/feed'); 
       }
        else{
          setLoading(false);
          showToast({
            variant: 'error',
            message: 'Login failed. Please try again.'
          });
        }
    }catch(error:any){
      setLoading(false);
      showToast({
        variant: 'error',
        message: error.message || 'An error occurred. Please try again later.'
      })
    }
  }
  return (
    <div className='lg:w-[28vw] md:w-[50vw] w-[90vw] flex flex-col p-4 px-8 border-2 border-gray-200 py-6 mt-6 rounded-2xl'>
       <h4 className='font-serif font-semibold text-2xl mb-3'>Signin to your account</h4>
       <form onSubmit={loginHandler} className='flex flex-col gap-6 mt-3 w-full'>
          <CreateInput reference={usernameRef} startIcon={<Mail size={15} color="#99a1af"/>} required={true} type="username" label='Username' placeholder='Enter your username' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          { error.username && <p className='text-red-500 text-sm'>{error.username}</p> }
          <CreateInput reference={passwordRef} startIcon={<Lock size={15} color="#99a1af"/>} required={true} type="password" label='Password' placeholder='Enter your password' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          { error.password && <p className='text-red-500 text-sm'>{error.password}</p> }
          <Link to="/" className='text-sm text-primary-light font-medium'>Forgot Password?</Link>
          <CtaBtn type='submit' loading={loading} label='Sign in' size='large' onClick={(()=>{})} className='w-full flex justify-center'/>
          <div className='w-full h-[2px] bg-gray-200 my-2'></div>
          <p className='text-center text-gray-400'>Dont have an account? <Link to="/signup" className="text-primary-light">Sign up</Link></p>
       </form>
    </div>
  )
}
