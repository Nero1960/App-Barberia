import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function AppLayout() {

  const { auth, cargando } = useAuth();

  if (cargando) return 'cargando....'


  return (
    <>
      <Header />
      {auth?.idClientes && !auth?.admin ? (<Outlet />) : <Navigate to={'/'} />}
      <Footer />

      <ToastContainer
        theme='colored'
        position='top-left'
      />

    </>

    

  )
}

export default AppLayout