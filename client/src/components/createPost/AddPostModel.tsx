import { Link2, X } from "lucide-react";
import ActionBtn from "../lib/ActionBtn";
import CreateInput from "./CreateInput";
import CtaBtn from "../lib/CtaBtn";

export default function AddPostModel() {
  return (
    <div className="min-w-1/3 h-auto flex flex-col gap-1 p-5 bg-white rounded-2xl">
      <ul className="flex justify-between items-center">
        <li className="flex gap-2 items-center">
         <span className="text-primary"><Link2 size={22}/></span>
         <span className="font-serif text-[1.40rem] font-normal">Save Resource</span>
        </li>
        <ActionBtn variant="ghost" icon={<X size={15}/>}  size="xsmall" className="mt-3 border-none outline-none hover:bg-transparent" onClick={() => console.log("Save Resource clicked")}/>
      </ul>
      <form className="w-full h-auto py-1 flex flex-col gap-4">
          <CreateInput tagType="input" type="text" label="URL" required={true} placeholder="https://example.com"/>
          <CreateInput tagType="input" type="text" label="Title" required={true} placeholder="Custome title for this resource"/>
          <CreateInput tagType="textarea" type="textarea" label="Notes" required={false} placeholder="Add personal notes or key takeways.."/>
          <CreateInput tagType="dropdown" label="Category" required={true} placeholder="Select a category"/>
      </form>
      <div className="flex gap-4 mt-4">
        <CtaBtn label="Cancel" className="flex-1 flex justify-center items-center" variant="ghost" size="large" onClick={() => console.log("cancel")}/>
        <CtaBtn label="Save Resource" className="flex-1 flex justify-center items-center" variant="primary" size="large" onClick={() => console.log("save")}/>
      </div>
    </div>
  )
}
