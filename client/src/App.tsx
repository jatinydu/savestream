import Toast from "./components/lib/Toast"

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
         <Toast message="successfull transaction" variant="success" />
    </div>
  )
}

export default App