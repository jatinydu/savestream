import ActionBtn from "./ActionBtn";
import { GrClose } from "react-icons/gr";
import { VscCheck } from "react-icons/vsc";
import { MdOutlineErrorOutline } from "react-icons/md";
import { TbInfoTriangle } from "react-icons/tb";
import { RiAlarmWarningLine } from "react-icons/ri";

interface ToastProps {
  message: string;
  duration?: number; 
  onClose?: () => void; 
  variant?: 'success' | 'error' | 'info' | 'warning'; 
}

const variantTitle = {
  success: 'Sucesss!',
  error: 'Failiure!',
  info: 'Info!',
  warning: 'Warning!',
}

const variantIcon = {
  success: <span className="text-green-500 px-1 py-1 border-2 border-green-500 rounded-full font-bold text-md"><VscCheck/></span>,
  error: <span className="text-red-500 px-1 py-1 border-2 border-red-500 rounded-full font-bold text-md"><MdOutlineErrorOutline/></span>,
  info: <span className="text-blue-500 px-1 py-1 border-2 border-blue-500 rounded-full font-bold text-md"><TbInfoTriangle/></span>,
  warning: <span className="text-yellow-500 px-1 py-1 border-2 border-yellow-500 rounded-full font-bold text-md"><RiAlarmWarningLine/></span>,
}

const variantStyle={
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-yellow-100 text-yellow-800',
}

const defaultStyle = 'flex flex-col justify-between items-start p-4 rounded-lg shadow-md w-80 gap-2';

export default function Toast({message="Test message..",variant="success"}: ToastProps) {
  return (
    <div className={`${variantStyle[variant]} ${defaultStyle}`}>
      <span className="flex gap-1.5 items-center">
        {variantIcon[variant]} {variantTitle[variant]}
      </span>
      <p>{message}</p>
      <ActionBtn variant="ghost" size="small" icon={<GrClose/>} onClick={() => {}} className="" />
    </div>
  )
}
