import { Navigate, Outlet } from 'react-router'

const PrivateRoutes = () => {
  let auth = {'token':true}
return (
    auth.token ? <Outlet/> : <Navigate to='/'/>
  )
}