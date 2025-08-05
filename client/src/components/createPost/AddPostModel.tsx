import { Link2, X } from "lucide-react";
import ActionBtn from "../lib/ActionBtn";
import CreateInput from "./CreateInput";
import CtaBtn from "../lib/CtaBtn";
import { useState, useRef } from "react";
import { Dropdown } from "../lib/Input";

const categoryOptions = [
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "Education", value: "education" },
  { label: "Finance", value: "finance" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Travel", value: "travel" }
]

export default function AddPostModel({className}: {className?: string}) {
  const [ suggestions, setSuggestions ] = useState([]);
  const tagRef = useRef(null);
  return (
    <div className={`min-w-1/3 h-auto flex flex-col gap-1 p-5 bg-white rounded-2xl ${className}`}>
      <ul className="flex justify-between items-center">
        <li className="flex gap-2 items-center">
         <span className="text-primary"><Link2 size={22}/></span>
         <span className="font-serif text-[1.40rem] font-normal">Save Resource</span>
        </li>
        <ActionBtn variant="ghost" icon={<X className="closeModel" size={15}/>}  size="xsmall" className="mt-3 border-none outline-none hover:bg-transparent closeModel" onClick={() => console.log("Save Resource clicked")}/>
      </ul>
      <form className="w-full h-auto py-1 flex flex-col gap-4">
          <CreateInput tagType="input" type="text" label="URL" required={true}/>
          <CreateInput tagType="input" type="text" label="Title" required={true}/>
          <CreateInput tagType="textarea" type="textarea" label="Notes" required={false} placeholder="Add personal notes or key takeways.."/>
          <Dropdown placeholder="select a category" onSelect={()=>{}} options={categoryOptions}/>
          <CreateInput className="text-gray-500 text-[15px]" tagType="dropdown" label="Tags" required={true} placeholder="Choose Tags" reference={tagRef} suggestions={suggestions}/>
      </form>
      <div className="flex gap-4 mt-4">
        <CtaBtn label="Cancel" className="flex-1 flex justify-center items-center" variant="ghost" size="large" onClick={() => console.log("cancel")}/>
        <CtaBtn label="Save Resource" className="flex-1 flex justify-center items-center" variant="primary" size="large" onClick={() => console.log("save")}/>
      </div>
    </div>
  )
}
