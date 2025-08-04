import { Navigate, Outlet, useNavigate } from 'react-router'
import useToast from './useToast'
import { useEffect, useState } from 'react'
import { me_url } from '../Endpoints/Auth'
import Spinner from '../components/lib/Spinner'
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const [isAuth,setIsAuth] = useState(false)
  const {showToast} = useToast()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setIsAuthenticated, isAuthenticated } = useAuth();

  const getMe = async()=>{
    try{
      setLoading(true);
      const data = await fetch(me_url,{
        method: "POST",
        credentials: "include",
      })
      const response = await data.json();
      console.log("Response from getMe:", response);
      if(response.success){
        setIsAuth(true);
        setIsAuthenticated(true); 
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
        navigate('/login');
      }
      setLoading(false);
    }catch(error:any){
      setLoading(false);
      showToast({
        message: "Failed to authenticate user",
        variant: "error",
      });
    }
  }
 
  useEffect(()=>{
      getMe();
  },[])

  if(loading) {
    return <Spinner/>
  }

  if(!isAuth) {
    return <Navigate to='/login' replace />;
  }

return (
    <Outlet/> 
  )
}

export default PrivateRoutes