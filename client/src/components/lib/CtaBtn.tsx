import React, { useEffect } from 'react';

interface ButtonProps {
    label: string;
    onClick?: (e:React.FormEvent) => Promise<void>;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    className?: string;
    type?: "button" | "submit" | "reset";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    loading?: boolean;
}

const btnTypes = {
    primary: "bg-primary hover:bg-primary-hover text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    ghost: "bg-background hover:bg-gray-100 text-gray-700 border border-border hover:bg-primary-lighter hover:border-primary-lighter",
}

const btnSizes = {
    small: "py-2 px-4 text-[0.7rem] font-semibold",
    medium: "py-[6px] px-5 text-[0.9rem]",
    large: "py-2 px-10 text-[1rem]",
}

const defaultStyles = "rounded-lg font-sans focus:outline-none transition-all duration-400 self-start";

export default function CtaBtn({className,type,variant="primary",size="medium",onClick,label,disabled=false, startIcon, endIcon, loading}: ButtonProps) {
    if (loading) {
        return (
            <button disabled={true} className={`${btnTypes[variant]} ${btnSizes[size]} ${className} ${defaultStyles} focus:outline-none  opacity-60`} onClick={onClick}><span className='flex items-center gap-2'>{startIcon}{"Loading..."}{endIcon}</span></button>
        );
    }
  return <button onKeyDown={onClick} disabled={false} className={`${btnTypes[variant]} ${btnSizes[size]} ${className} ${defaultStyles} focus:outline-none`} onClick={onClick}><span className='flex items-center gap-2'>{startIcon}{label}{endIcon}</span></button>
}
