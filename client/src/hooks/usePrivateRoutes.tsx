import { Navigate, Outlet } from 'react-router'
import useToast from './useToast'
import { useEffect, useState } from 'react'
import { me_url } from '../Endpoints/Auth'

const PrivateRoutes = () => {
  const [isAuth,setIsAuth] = useState(false)
  const {showToast} = useToast()

  const getMe = async()=>{
    try{
      const data = await fetch(me_url,{
        method: "POST",
        credentials: "include",
      })
      const response = await data.json();
      console.log("🔵 Response from getMe:", response);
      if(response.success){
        console.log("🔵 User is authenticated:", response);
        setIsAuth(true);
        showToast({
          message: response.message,
          variant: "success",
        });
      }else{
        setIsAuth(false);
        showToast({
          message: "Please login to continue",
          variant: "error",
        });
      }
    }catch(error:any){
      showToast({
        message: "Failed to authenticate user",
        variant: "error",
      });
    }
  }
 
  useEffect(()=>{
    getMe();
  },[])

  if(!isAuth) {
    return null;
  }

return (
    isAuth ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoutes