import { Import, Star, Plus } from 'lucide-react';
import {SimpleInput} from "./components/lib/Input";

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

          {/* <AiInput 
          type="text"
          placeholder="AI Input"
          className="bg-gray-100 text-gray-800"
          size="md"
          startIcon={<Import className="text-gray-500" />}
          endIcon={<Star className="text-yellow-500" />}
          /> */}
      </div>
    </>
  )
}

export default App
