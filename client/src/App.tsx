import CtaBtn from "./components/lib/CtaBtn"
import { Import, Star, Plus } from 'lucide-react';
import ActionBtn  from "./components/lib/ActionBtn";

function App() {
  return (
    <>
      <div className="flex flex-col gap-1.5 py-10 px-10">
         <CtaBtn label="Save" variant="primary" size="large" startIcon={<Import size={20}/>} onClick={()=>{}}/>
         <CtaBtn label="Save" variant="primary" size="medium" startIcon={<Import size={18}/>} onClick={()=>{}}/>
         <CtaBtn label="Save" variant="primary" size="small" startIcon={<Import size={15}/>} onClick={()=>{}}/>
         <br />
          <CtaBtn label="Starred" variant="ghost" size="small" startIcon={<Star size={15}/>} onClick={()=>{}}/>
          <CtaBtn label="Starred" variant="ghost" size="medium" startIcon={<Star size={18}/>} onClick={()=>{}}/>
          <CtaBtn label="Starred" variant="ghost" size="large" startIcon={<Star size={20}/>} onClick={()=>{}}/>
          <br />
          <div className="flex gap-2">
          <ActionBtn variant="add" size="medium" icon={<Plus size={18}/>} onClick={()=>{}}/>
          <ActionBtn variant="add" size="large" icon={<Plus size={20}/>} onClick={()=>{}}/>
          <ActionBtn variant="add" size="small" icon={<Plus size={16}/>} onClick={()=>{}}/>
          <ActionBtn variant="delete" size="small" icon={<Plus size={16}/>} onClick={()=>{}}/>
          <ActionBtn variant="delete" size="small" icon={<Plus size={16}/>} onClick={()=>{}}/>
          </div>
      </div>
    </>
  )
}

export default App
