import Button from "./components/lib/Button"

function App() {
  return (
    <>
      <div className="flex flex-col gap-1.5 py-10 px-10">
         <Button label="Save" variant="primary" size="large" onClick={()=>{}}/>
         <Button label="Save" variant="primary" size="medium" onClick={()=>{}}/>
         <Button label="Save" variant="primary" size="small" onClick={()=>{}}/>
      </div>
    </>
  )
}

export default App
