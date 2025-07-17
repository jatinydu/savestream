import { Link2, X } from "lucide-react";
import ActionBtn from "../lib/ActionBtn";

export default function AddPostModel() {
  return (
    <div className="min-w-1/2 h-auto flex flex-col gap-1 p-4">
      <ul className="flex justify-between items-center">
        <li className="flex gap-2 items-center">
         <span><Link2 size={15}/></span>
         <span className="text-sm font-semibold">Save Resource</span>
        </li>
        <ActionBtn variant="ghost" icon={<X />}  size="small" className="mt-2" onClick={() => console.log("Save Resource clicked")}/>
      </ul>
    </div>
  )
}
