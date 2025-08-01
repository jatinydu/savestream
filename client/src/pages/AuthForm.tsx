import Logo from '../assets/savestream.png';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

interface AuthFormProps {
    type: "login" | "signup";
    title: string;
    desc: string;
}

export interface AuthCommonProps {
    type: "login" | "signup";
}

export default function AuthForm(props:AuthFormProps) {
  return (
    <div className="w-full px-5 h-auto flex flex-col justify-center items-center">
      {/* Header */}
      <div className='flex flex-col items-center gap-0.5'>
        <img src={Logo} alt="Logo_savestream"  className='w-[5em] mb-2'/>
        <h3 className='font-serif font-semibold text-2xl'>{props.title}</h3>
        <p className='text-md font-sens font-medium text-gray-500'>{props.desc}</p>
        {
            props.type === "signup" ? <SignupForm /> : props.type === "login" ? <LoginForm /> : null
        }
      </div>
    </div>
  )
}
