import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = () => {
    return (
        <>
            <main className="md:grid md:grid-cols-2 gap-x-2 items-center justify-center h-screen">
                <Outlet />
            </main>

            <ToastContainer
                theme="colored"
                position="top-left"
            />
        </>
    )
}

export default AuthLayout