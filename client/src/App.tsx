import PrivateRoutes from "./hooks/usePrivateRoutes"
import AuthForm from "./pages/AuthForm"
import Feed from "./pages/Feed"
import { Route, Routes } from "react-router"
import Navbar from "./components/lib/Navbar"
import { PostProvider } from "./context/PostContext"
import ActionBtn from "./components/lib/ActionBtn"
import { Plus } from "lucide-react"
import AddPostModel from "./components/createPost/AddPostModel"
import { useState } from "react"
import { useAuth } from "./context/AuthContext"

function App() {
  const { isAuthenticated } = useAuth();
  const [modelOpen, setModelOpen] = useState(false);
  function closeModel(e:any){
    if(e.target.tagName === "DIV" || e.target.classList.contains('closeModel')) setModelOpen(false);
  }

  function openModel(e:any){
    setModelOpen(true);
  }
  return (
    <div className="w-screen min-h-screen p-0 m-0 flex justify-center items-center overflow-x-hidden z-30">
        {
          isAuthenticated && <Navbar /> 
        }
        <PostProvider>
        <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/" element={<Feed/>} index />
            </Route>
          <Route path="/login" element={<AuthForm type="login" title="Welcome back!" desc="Login to your account"/>} />
          <Route path="/signup" element={<AuthForm type="signup" title="Create a free account" desc="Join us today!"/>} />
        </Routes>
         {
           isAuthenticated && <ActionBtn className="z-50 fixed bottom-10 right-10" variant="add" size="medium" icon={ <Plus/> } onClick={openModel} /> 
         }
         <div onClick={closeModel} className={`w-full h-full fixed top-0 left-0 z-40 bg-[#080914b5] ${modelOpen === false ? 'hidden' : 'fixed'}`}>
         {
            modelOpen && <AddPostModel className="z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"/>
         }
         </div>
        </PostProvider>
    </div>
  )
}

export default App