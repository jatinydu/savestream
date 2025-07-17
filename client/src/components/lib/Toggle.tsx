import { useState } from "react";
import CtaBtn from "./CtaBtn";
import { Share2 } from "lucide-react";

const Toggle = () => {
  const [checked, setChecked] = useState(false);
  const toggle=()=>{
    setChecked(!checked);
  }
  return (
    <div className="flex items-center space-x-3">  
      {
        checked && <CtaBtn 
        variant="ghost"
        size="medium"
        startIcon={<Share2 size={15}/>}
        className=""
        label="Share Brain"
        onClick={() => console.log("Share Brain clicked")}
      />  
      }
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={toggle}
        className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-6 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm font-medium">
        {
          checked ? 'Public' : 'Private'
        }
      </span>
    </div>
  );
};

export default Toggle;
