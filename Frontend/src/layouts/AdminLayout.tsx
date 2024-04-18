import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";


function AdminLayout() {

    const { auth , cargando } = useAuth();

    if(cargando) return 'cargando....'
  

  return (
    <>

        {auth?.admin ? (<Outlet/>) : <Navigate to={'/'}/>}

    </>
  )
}

export default AdminLayout