import React, { useState } from 'react';
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
  reference?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
const ai = "border-2 border-gray-100 shadow-sm text-gray-500 focus:border-blue-600 focus:ring-blue-600";
const defaultStyles = "h-10 px-3 rounded-2xl";

export function SimpleInput({type,placeholder,handleKeyDown,reference,value,className,required,name,size="md",onChange}: InputProps) {
  return (
    <div>
      <input onChange={onChange} onKeyDown={handleKeyDown} ref={reference} type={type} placeholder={placeholder} value={value} className={`${defaultStyles} ${className} ${simple} ${sizeStyles[size]}`} required={required} name={name} />
    </div>
  )
}

export function AiInput({type,placeholder,reference,value,className,required,name,startIcon,endIcon}: AiProps) {
  return (
    <div className={`flex gap-2 ${ai} px-3 py-2 self-start items-center justify-between rounded-2xl ${className} focus:border-blue-600 focus:ring-blue-600`}>
      {startIcon && <span className="">{startIcon}</span>}
      <input ref={reference} type={type} placeholder={placeholder} value={value} className={`w-full outline-none`} required={required} name={name} />
      {endIcon && <ActionBtn onClick={()=>{}} className="px-5 py-3 rounded-xl cursor-pointer" variant="quick" size="small" icon={endIcon}/>}
    </div>
  )
}

export function TextArea({placeholder,value,className,required,name, reference}: InputProps) {
  return (
    <div>
      <textarea ref={reference} placeholder={placeholder} value={value} className={`${defaultStyles} ${className} ${simple} h-32 resize-none ${sizeStyles.md}`} required={required} name={name}></textarea>
    </div>
  )
}

interface Option{
  label:string;
  value:string;
}
interface DropdownProps {
  options: Option[];
  placeholder?: string;
  onSelect: (selected: Option) => void
}

export const Dropdown=({options,placeholder="select a option",onSelect}:DropdownProps)=>{
   const [isOpen,setIsOpen] = useState(false);
   const [selected, setSelected] = useState<Option | null>(null);

   const handleSelect = (option: Option) => {
    setSelected(option)
    onSelect(option)
    setIsOpen(false)
  }

  const modelToggle=()=>{
    setIsOpen(!isOpen);
  }

    return (
      <div className="relative text-left w-full">
        <label htmlFor="dropdown-button cursor-pointer">Category *</label>
        <div className='mt-1 cursor-pointer'>
          <button
            type='button'
            name="dropdown-button"
            onClick={modelToggle}
            className="w-full px-4 py-[11px] bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            {selected ? selected.label : placeholder}
          </button>
        </div>
  
        {isOpen && (
          <div className="fixed mt-2 w-[91%] max-h-[150px] overflow-y-auto rounded-md shadow-lg bg-white ring-2 ring-primary-light z-10">
            <div className="py-1 text-left">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    selected?.value === option.value ? 'bg-gray-100 font-semibold' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
}