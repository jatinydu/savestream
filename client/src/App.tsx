import Toast from "./components/lib/Toast"

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
         <Toast message="you can use the placeholder:font-{weight}" variant="success" />
    </div>
  )
}

export default App