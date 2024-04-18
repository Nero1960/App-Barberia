import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";



function AppLayout() {

    const { auth , cargando } = useAuth();

    if(cargando) return 'cargando....'
  

  return (
    <>
       <Header/>

        {auth?.idClientes && !auth?.admin ? (<Outlet/>) : <Navigate to={'/'}/>}

        
       

        <Footer/>

    </>

  )
}

export default AppLayout