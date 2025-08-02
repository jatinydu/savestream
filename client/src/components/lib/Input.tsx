import React from 'react';
import ActionBtn from "./ActionBtn";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  name?: string;
  size?: "sm" | "md" | "lg";
  reference?: React.Ref<HTMLInputElement>;
}

interface AiProps extends InputProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const sizeStyles = {
  sm: "h-10 md:min-w-[18rem] min-w-[12rem] px-2 font-xs placeholder:font-semibold placeholder:text-[13px]",
  md: "h-11 md:min-w-[20rem] min-w-[15rem] px-3 text-base placeholder:font-300 placeholder:text-sm",
  lg: "h-12 md:min-w-[35rem] min-w-[30rem] px-4 text-lg placeholder:font-300 placeholder:text-base"
}

const simple = "border-2 border-gray-200 focus:border-blue-600 focus:ring-blue-600 outline-none";
const ai = "border-2 border-gray-100 outline-none bg-transparent shadow-sm text-gray-500"
const defaultStyles = "h-10 px-3 rounded-2xl text-black placeholder:font-300";

export function SimpleInput({type,placeholder,value,className,required,name,size="md"}: InputProps) {
  return (
    <div>
      <input type={type} placeholder={placeholder} value={value} className={`${defaultStyles} ${className} ${simple} ${sizeStyles[size]}`} required={required} name={name} />
    </div>
  )
}

export function AiInput({type,placeholder,reference,value,className,required,name,startIcon,endIcon}: AiProps) {
  return (
    <div className={`flex gap-2 ${ai} px-3 py-1 self-start items-center justify-between rounded-2xl ${className}`}>
      {startIcon && <span className="">{startIcon}</span>}
      <input ref={reference} type={type} placeholder={placeholder} value={value} className={`w-full outline-none`} required={required} name={name} />
      {endIcon && <ActionBtn onClick={()=>{}} className="px-5 py-3 rounded-xl cursor-pointer" variant="quick" size="small" icon={endIcon}/>}
    </div>
  )
}

export function TextArea({placeholder,value,className,required,name}: InputProps) {
  return (
    <div>
      <textarea placeholder={placeholder} value={value} className={`${defaultStyles} ${className} ${simple} h-32 resize-none ${sizeStyles.md}`} required={required} name={name}></textarea>
    </div>
  )
}