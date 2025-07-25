import { Link } from 'react-router';
import CreateInput from '../createPost/CreateInput';
import CtaBtn from '../lib/CtaBtn';
import { UserRound, Lock } from 'lucide-react';
import { useRef, useState } from 'react';
import useToast from '../../hooks/useToast';
import { signup_url } from '../../Endpoints/Auth';
import { signup } from '../../services/auth';
interface errorProps{
  username:string,
  password:string,
}

export default function SignupForm() {
  const {showToast} = useToast();
  const [error,setError] = useState<errorProps>({
    username:"", password:""
  });

  const [loading, setLoading] = useState<boolean>(false);

  const nameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const handlesubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    setError({
      password:"",
      username:""
    })

    if(name.length<=0){
      setError((prev)=>({
        ...prev,
        username:"username field is required"
      }))
    }

    if(password.length<=6){
      setError((prev)=>({
        ...prev,
        password:"password field should atleast 6 char long"
      }))
    }

    try{
      const res = await signup({name, password, signup_url});

      if(!res.success){
        throw new Error(res.message || "Something went wrong!");
      }

      setLoading(false);

      showToast({
        variant:"success",
        message:res.message || "Account created successfully!"
      })
      console.log("res: ",res);
    }catch(error:any){
      console.log(error.message);
      setLoading(false);
      showToast({
        variant:"error",
        message:error.message || "Something went wrong!"
      })
    }
  }

  return (
    <div className='lg:w-[28vw] md:w-[50vw] w-[90vw] flex flex-col p-4 px-8 border-2 border-gray-200 py-6 mt-6 rounded-2xl'>
       <h4 className='font-serif font-semibold text-2xl mb-3'>Signup for free</h4>
       <form onSubmit={handlesubmit} className='flex flex-col gap-6 mt-3 w-full'>
          <CreateInput reference={nameRef} startIcon={<UserRound size={15} color="#99a1af"/>} required={true} type="text" label='Username' placeholder='Enter your username' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          { error.username && <p className="text-red-500 transition-all duration-500">{error.username}</p>}
          <CreateInput reference={passwordRef}  startIcon={<Lock size={15} color="#99a1af"/>} required={true} type="password" label='Password' placeholder='Enter your password' tagType='input' className='h-[2.5rem] focus-within:ring-2 focus-within:ring-primary rounded-sm border-2 border-gray-100'/>
          { error.password && <p className="text-red-500 transition-all duration-500">{error.password}</p>}
          <CtaBtn loading={loading} type="submit" label='Create Account' size='large' onClick={(()=>{})} className='w-full flex justify-center'/>
          <div className='w-full h-[2px] bg-gray-200 my-2'></div>
          <p className='text-center text-gray-400'>Already have an account? <Link to="/" className="text-primary-light">signin</Link></p>
       </form>
    </div>
  )
}
