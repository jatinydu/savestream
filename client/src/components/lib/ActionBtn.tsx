import React from 'react';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    variant?: 'add' | 'delete' | 'ghost' | 'quick';
    size?: 'small' | 'medium' | 'large' | 'xsmall';
    className?: string;
    icon?: React.ReactNode;
}

const btnTypes = {
    add: "bg-primary hover:bg-primary-hover text-white",
    delete: "bg-red-500 hover:bg-gray-600 text-white",
    quick: "text-white rounded-xl bg-primary hover:bg-primary-hover",
    ghost: "bg-background hover:bg-gray-100 text-gray-700 border border-border hover:bg-primary-lighter hover:border-primary-lighter",
}

const btnSizes = {
    xsmall: "py-2 px-2 text-[0.6rem] font-semibold",
    small: "py-3 px-3 text-[0.7rem] font-semibold",
    medium: "py-5 px-5 text-[0.9rem]",
    large: "py-6 px-6 text-[1rem]",
}

const defaultStyles = "rounded-full font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 self-start cursor-pointer";

export default function ActionBtn({className,variant="add",size="medium",onClick,disabled=false, icon}: ButtonProps) {
  return <button disabled={disabled} className={`${btnTypes[variant]} ${btnSizes[size]} ${className} ${defaultStyles}`} onClick={onClick}>{icon}</button>
}
