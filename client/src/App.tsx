import PrivateRoutes from "./hooks/usePrivateRoutes"
import AuthForm from "./pages/AuthForm"
import Feed from "./pages/Feed"
import { Route, Routes } from "react-router"
import Navbar from "./components/lib/Navbar"
import { PostProvider } from "./context/PostContext"

function App() {
  return (
    <div className="w-screen min-h-screen p-0 m-0 flex justify-center items-center overflow-x-hidden z-30">
        <Navbar />
        <PostProvider>
        <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/" element={<Feed/>} index />
            </Route>
          <Route path="/login" element={<AuthForm type="login" title="Welcome back!" desc="Login to your account"/>} />
          <Route path="/signup" element={<AuthForm type="signup" title="Create a free account" desc="Join us today!"/>} />
        </Routes>
        </PostProvider>
    </div>
  )
}

export default App