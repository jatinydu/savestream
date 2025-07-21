import { SimpleInput, TextArea } from "../lib/Input";
import SearchInput from "../autoComplete/SearchInput";

interface CreateInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  tagType?: 'input' | 'textarea' | 'dropdown';
  required?: boolean;
}

export default function CreateInput(props:CreateInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
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
        props.tagType === 'input' ?  <SimpleInput className="w-full rounded-xl"/> : props.tagType === 'textarea' ? <TextArea className="w-full rounded-xl" /> : props.tagType === "dropdown" ? <SearchInput/> : null
      }
    </div>
  )
}
