import useToast from "./hooks/useToast";
import CtaBtn from "./components/lib/CtaBtn"

function App() {
  const { showToast } = useToast();
  const submitHandler = () => {
    console.log("Button clicked!");
    showToast({
      message: "This is a toast message!",
      variant: "success",
      position: "bottom-right",
      duration: 9000
    })
  }
  const errorHandler = () => {
    console.log("Error button clicked!");
    showToast({
      message: "This is an error message!",
      variant: "error",
      position: "bottom-right",
      duration: 3000
    })
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center pt-10">
         <CtaBtn variant="primary" size="medium" label="Click me" onClick={submitHandler}/>
         <CtaBtn variant="ghost" size="medium" label="Click me" onClick={errorHandler}/>
    </div>
  )
}

export default App