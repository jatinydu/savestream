import PrivateRoutes from "./hooks/usePrivateRoutes"
import AuthForm from "./pages/AuthForm"
import { Route, Routes } from "react-router"

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center pt-10 overflow-x-hidden z-30">
        <Routes>
          <Route element={<PrivateRoutes/>}>
             <Route path="/feed" element={<h1>Home Page</h1>} />
          </Route>
          <Route path="/" element={<AuthForm type="login" title="Welcome back!" desc="Login to your account"/>} />
          <Route path="/signup" element={<AuthForm type="signup" title="Create a free account" desc="Join us today!"/>} />
        </Routes>
    </div>
  )
}

export default App