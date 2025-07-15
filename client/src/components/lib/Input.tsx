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

// interface AiProps extends InputProps {
//   startIcon?: React.ReactNode;
//   endIcon?: React.ReactNode;
// }

const sizeStyles = {
  sm: "h-10 min-w-[18rem] px-2 font-xs placeholder:font-semibold placeholder:text-[13px]",
  md: "h-11 min-w-[20rem] px-3 text-base placeholder:font-300 placeholder:text-sm",
  lg: "h-12 min-w-[35rem] px-4 text-lg placeholder:font-300 placeholder:text-base"
}

const simple = "border-2 border-gray-200 focus:border-blue-600 focus:ring-blue-600 outline-none";
// const ai = "border-gray-400 focus:border-blue-600 focus:ring-blue-600"
const defaultStyles = "h-10 px-3 rounded-2xl text-black placeholder:font-300";

export function SimpleInput({type,placeholder,value,reference,className,required,name,size="md"}: InputProps) {
  return (
    <div>
      <input type={type} placeholder={placeholder} value={value} ref={reference} className={`${defaultStyles} ${className} ${simple} ${sizeStyles[size]}`} required={required} name={name} />
    </div>
  )
}

// export function AiInput({type,placeholder,value,reference,className,required,name,size="md"}: AiProps) {
//   return (
//     <div>
//       <input type={type} placeholder={placeholder} value={value} ref={reference} className={`${defaultStyles} ${className} ${ai} ${sizeStyles[size]}`} required={required} name={name} />
//     </div>
//   )
// }
