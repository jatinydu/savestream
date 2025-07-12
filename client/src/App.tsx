import Button from "./components/lib/Button"
import { Import, Star } from 'lucide-react';


function App() {
  return (
    <>
      <div className="flex flex-col gap-1.5 py-10 px-10">
         <Button label="Save" variant="primary" size="large" startIcon={<Import size={20}/>} onClick={()=>{}}/>
         <Button label="Save" variant="primary" size="medium" startIcon={<Import size={18}/>} onClick={()=>{}}/>
         <Button label="Save" variant="primary" size="small" startIcon={<Import size={15}/>} onClick={()=>{}}/>
         <br />
          <Button label="Starred" variant="ghost" size="small" startIcon={<Star size={15}/>} onClick={()=>{}}/>
          <Button label="Starred" variant="ghost" size="medium" startIcon={<Star size={18}/>} onClick={()=>{}}/>
          <Button label="Starred" variant="ghost" size="large" startIcon={<Star size={20}/>} onClick={()=>{}}/>
      </div>
    </>
  )
}

export default App
