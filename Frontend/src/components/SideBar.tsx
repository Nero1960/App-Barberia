import logo from '../public/logo2.png'
import { FiHome, FiCalendar, FiGrid, FiUsers, FiLogOut, FiLayers, FiBook } from "react-icons/fi"
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

function SideBar() {

    const { cerrarSession } = useAuth();

    const location = useLocation();
    const pathname = location.pathname;
    return (
        <aside className="h-full md:w-[20%] px-5 bg-black-500">

            <div className="logo flex justify-center mt-4">
                <img src={logo} alt="logo" width={150} height={150} />
            </div>

            <nav className='md:h-[77vh] mt-6 mb-8  flex flex-col md:justify-between'>
                <div className='space-y-5'>
                    <Link to="/admin" className={`${pathname === '/admin' ? 'bg-primary-500 text-white' : 'bg-transparent'} text-dark-200 text-base duration-300 hover:bg-primary-500 hover:text-white rounded-lg px-4 py-2 flex items-center gap-x-2`}>
                        <FiHome />
                        Dashboard</Link>

                    <Link to="/admin/citas" className={`${pathname === '/admin/citas' ? 'bg-primary-500 text-white' : 'bg-transparent'} text-dark-200 text-base duration-300 hover:bg-primary-500 hover:text-white rounded-lg px-4 py-2 flex items-center gap-x-2`}>
                        <FiCalendar />
                        Citas</Link>

                    <Link to="/admin/servicios" className={`${pathname === '/admin/servicios' ? 'bg-primary-500 text-white' : 'bg-transparent'} text-dark-200 text-base duration-300 hover:bg-primary-500 hover:text-white rounded-lg px-4 py-2 flex items-center gap-x-2`}>
                        <FiLayers />
                        Servicios</Link>

                    <Link to="/admin/barberos" className={`${pathname === '/admin/barberos' ? 'bg-primary-500 text-white' : 'bg-transparent'} text-dark-200 text-base duration-300 hover:bg-primary-500 hover:text-white rounded-lg px-4 py-2 flex items-center gap-x-2`}>
                        <FiGrid />
                        Barberos</Link>

                    <Link to="/admin/clientes" className={`${pathname === '/admin/clientes' ? 'bg-primary-500 text-white' : 'bg-transparent'} text-dark-200 text-base duration-300 hover:bg-primary-500 hover:text-white rounded-lg px-4 py-2 flex items-center gap-x-2`}>
                        <FiUsers />
                        Clientes</Link>

                    <Link to="/admin/testimoniales" className={`${pathname === '/admin/testimoniales' ? 'bg-primary-500 text-white' : 'bg-transparent'} text-dark-200 text-base duration-300 hover:bg-primary-500 hover:text-white rounded-lg px-4 py-2 flex items-center gap-x-2`}>
                        <FiBook/>
                        Testimoniales</Link>
                </div>

                <button type='button' className='text-red-500 mt-5 text-base text-left px-4 flex gap-x-3 items-center' onClick={() => cerrarSession()}><FiLogOut />Log Out</button>

            </nav>

        </aside>
    )
}

export default SideBar