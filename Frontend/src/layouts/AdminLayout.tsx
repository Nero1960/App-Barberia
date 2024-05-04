import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import SideBar from "../components/SideBar"
import { ToastContainer } from "react-toastify";


function AdminLayout() {

  const { auth, cargando } = useAuth();

  if (cargando) return 'cargando....'


  return (
    <>

      {auth?.admin ? (
        <>
          <main className="flex md:flex-row flex-col">
            <SideBar />
            <Outlet/>

            <ToastContainer
              theme="colored"
              position="top-left"
            />
          </main>

        </>
      ) : <Navigate to={'/'} />}

    </>
  )
}

export default AdminLayout