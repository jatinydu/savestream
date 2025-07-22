import AuthForm from "./pages/AuthForm"

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center pt-10 overflow-x-hidden">
        <AuthForm type="signup" title="Create your account" desc="Start building your knowledge base"/>
    </div>
  )
}

export default App