import { AiInput, SimpleInput, TextArea } from "../lib/Input";
import SearchInput from "../autoComplete/SearchInput";

interface CreateInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  tagType?: 'input' | 'textarea' | 'dropdown';
  required?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  reference?: React.Ref<HTMLInputElement>;
  className?: string;
  outerClass?: string;
}

export default function CreateInput(props:CreateInputProps) {
  return (
    <div className={`flex flex-col gap-1 w-full`}>
      <span>
        {
          props.label
        }
        <span>
        {
          props.required ? " * " : " (optional) " 
        }
        </span>
      </span>
      {
        props.tagType === 'input' ?  <AiInput reference={props.reference} placeholder={props.placeholder} startIcon={props.startIcon} endIcon={props.endIcon} type={props.type} className={`w-full rounded-xl ${props.className}`}/> : props.tagType === 'textarea' ? <TextArea className="w-full rounded-xl" /> : props.tagType === "dropdown" ? <SearchInput/> : null
      }
    </div>
  )
}
