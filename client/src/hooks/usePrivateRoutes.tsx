import { Navigate, Outlet } from 'react-router'
import useToast from './useToast'
import { useCallback, useEffect } from 'react'

const PrivateRoutes = () => {
  let auth = {'token':false}
  const {showToast} = useToast()
  const displayToast = useCallback(()=>{
    if(!auth.token){
        showToast({
            message: 'You need to login first',
            variant: 'error',
            position: 'bottom-right',
            duration: 4000
        })
      }
  },[])
 
  useEffect(()=>{
    setTimeout(() => {
        displayToast();
    }, 1000);
  },[])

return (
    auth.token ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoutes