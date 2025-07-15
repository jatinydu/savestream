import ActionBtn from "./ActionBtn";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  reference?: React.Ref<HTMLInputElement>;
  required?: boolean;
  name?: string;
  size?: "sm" | "md" | "lg";
}

interface AiProps extends InputProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const sizeStyles = {
  sm: "h-10 min-w-[18rem] px-2 font-xs placeholder:font-semibold placeholder:text-[13px]",
  md: "h-11 min-w-[20rem] px-3 text-base placeholder:font-300 placeholder:text-sm",
  lg: "h-12 min-w-[35rem] px-4 text-lg placeholder:font-300 placeholder:text-base"
}

const simple = "border-2 border-gray-200 focus:border-blue-600 focus:ring-blue-600 outline-none";
const ai = "border-2 border-gray-100 outline-none bg-transparent shadow-sm text-gray-500"
const defaultStyles = "h-10 px-3 rounded-2xl text-black placeholder:font-300";

export function SimpleInput({type,placeholder,value,reference,className,required,name,size="md"}: InputProps) {
  return (
    <div>
      <input type={type} placeholder={placeholder} value={value} ref={reference} className={`${defaultStyles} ${className} ${simple} ${sizeStyles[size]}`} required={required} name={name} />
    </div>
  )
}

export function AiInput({type,placeholder,value,reference,className,required,name,startIcon,endIcon}: AiProps) {
  return (
    <div className={`flex gap-2 ${ai} px-3 py-1 self-start items-center justify-between min-w-[40rem] rounded-2xl`}>
      {startIcon && <span className="">{startIcon}</span>}
      <input type={type} placeholder={placeholder} value={value} ref={reference} className={`${className} w-full outline-none`} required={required} name={name} />
      {endIcon && <ActionBtn onClick={()=>{}} className="px-5 py-3 rounded-xl cursor-pointer" variant="quick" size="small" icon={endIcon}/>}
    </div>
  )
}
