import phoneIcons from '../public/Icons/telephone-fill.svg'
import clockIcons from '../public/Icons/clock-fill.svg'
import calendar from '../public/Icons/CalendarDays.svg'
import facebook from '../public/Icons/facebook.svg'
import instagram from '../public/Icons/instagram.svg'
import tiktok from '../public/Icons/tiktok-logo-fill.svg'
import cerrarSesion from '../public/Icons/box-arrow-left.svg'
import menu from '../public/Icons/menu.svg'
import close from '../public/Icons/x-lg.svg'
import logo from '../public/logo2.png'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'

function Header() {

    const [showMenu, setShowMenu] = useState(false);
    const { cerrarSession }: any = useAuth();

    const handleClick = () => {
        setShowMenu(!showMenu)
    }

   

    return (
        <header className={`px-5  py-3 md:p-0`}>

            <div className={'py-5 px-5 md:px-0 bg-primary-500 hidden md:flex flex-col md:flex-row items-center md:justify-around text-white'}>
                <div className="flex items-center space-x-5 md:space-x-0 md:justify-around w-full md:w-1/2">
                    <div className="flex items-center space-x-2">
                        <img src={phoneIcons} alt="icono teléfono" />
                        <p className='text-xs font-light'>Contactarnos: <span className='ms-2'>+505 8788 2866</span></p>
                    </div>

                    <div className="text-white flex items-center space-x-2">
                        <img src={clockIcons} alt="icono hora" />
                        <p className='text-xs font-light'>Horario: <span className='ms-2'>Lunes - Sábado, 9:00 AM - 5:00 PM</span></p>
                    </div>
                </div>


                <div className="text-white flex space-x-2 mt-5 md:mt-0">
                    <a href="#"><img src={facebook} alt="facebook red social" /></a>
                    <a href="#"><img src={instagram} alt="instagram red social" /></a>
                    <a href="#"><img src={tiktok} alt="tiktok red social" /></a>
                </div>

            </div>

            <div className='md:px-36 barra flex justify-between py-0 md:py-3 w-full items-center'>
                <div className='logo'>
                    <a href="/app"> <img src={logo} alt="Logo BarberShop" width={150} height={150} /></a>
                </div>

                <div className='menu -mt-3 md:hidden' onClick={handleClick} >
                    <img src={`${showMenu ? close : menu}`} alt="Imagen Menu" width={40} height={40} className='cursor-pointer' />
                </div>

                <nav className={` ${showMenu ? 'flex flex-col justify-start items-start px-10 py-10 absolute left-0 top-20 space-y-5 bg-dark-500 w-full ' : 'hidden'} md:flex md:space-x-5 md:items-center`}>
                    <a href="/app" className='text-white text-sm hover:text-secondary-400 duration-300'>Inicio</a>
                    <a href="#servicios" className='text-white text-sm hover:text-secondary-400 duration-300'>Servicios</a>
                    <a href="#barberos" className='text-white text-sm hover:text-secondary-400 duration-300'>Barberos</a>
                    <a href="/app" className='text-white text-sm hover:text-secondary-400 duration-300'>Citas</a>
                    <a href="/app" className='text-white text-sm hover:text-secondary-400 duration-300'>Mi Perfil</a>
                    <a href="/" className='flex items-center gap-x-2 text-white text-sm hover:text-secondary-400 duration-300' onClick={cerrarSession} >
                        <img src={cerrarSesion} alt="cerrar sesion icono" /> Cerrar Sesión</a>
                    <div className='block w-full md:flex md:w-auto'>
                        <a href='#citas' className={`cursor-pointer flex gap-x-2 items-center w-full md:w-auto  bg-primary-500 text-white px-6 py-2 text-sm rounded-md hover:bg-primary-600 duration-300`}>
                            <img src={calendar} alt="cita icon" width={16} height={16} />
                            Haz Tu Cita</a>
                    </div>
                </nav>

            </div>
        </header>
    )
}

export default Header