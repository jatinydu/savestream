import { Import, Star, Plus } from 'lucide-react';
import {SimpleInput, AiInput} from "./components/lib/Input";
import { PiShootingStarLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";


function App() {
  return (
    <>
      <div className="flex flex-col gap-1.5 py-10 px-10 font-sans">
         <SimpleInput
          type="text"
          placeholder="Simple Input"
          className="bg-white text-gray-800"
          size="md"
          />

          <AiInput 
          type="text"
          placeholder="Ask your brain anything..."
          startIcon={<PiShootingStarLight color='blue'/>}
          endIcon={<FiSearch color="white" size={13}/>}
          />
      </div>
    </>
  )
}

export default App
