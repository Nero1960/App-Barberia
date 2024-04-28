import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = () => {
    return (
        <>
            <main className="max-w-[90%] space-y-10 md:space-y-0 my-10 md:my-0 mx-auto md:grid md:grid-cols-2 md:gap-x-2 items-center justify-center md:h-screen">
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