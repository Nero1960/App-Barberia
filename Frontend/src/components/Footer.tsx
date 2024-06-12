import logo from '../public/logo2.png'
import ubicacionIcon from '../public/Icons/MapPin.svg';
import telefono from '../public/Icons/Phone.svg'
import clockIcon from '../public/Icons/Clock.svg'
import logo2 from '../public/logo1.png'
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai'

function Footer() {
    return (
        <footer className="bg-black-500 pt-10 pb-4">
            <div className="flex flex-col md:flex-row justify-around text-secondary-500 place-items-center space-y-5 md:space-y-0 md:max-w-5xl max-w-[90%] mx-auto ">
                <div className='md:w-1/3 flex flex-col  justify-center items-center'>
                    <img src={logo} alt="Logotipo" width={150} height={150} />
                    <p className='text-xs font-thin leading-relaxed mb-5 text-white text-center'>!Recuerda seguirnos en todas nuestras redes sociales y no perderte de nuestras Promociones!</p>
                    <div className="text-white flex justify-center space-x-2  md:mt-0">
                        <a href="https://www.facebook.com/mojicasbarbershop" target='_blink' className='text-lg'><FaFacebook /></a>
                        <a href="https://www.instagram.com/mojicasbarbershop/" className='text-lg' target='_blink'><RiInstagramFill /></a>
                        <a href="https://www.tiktok.com/@mojicasbarber" target='_blank' className='text-lg'><AiFillTikTok /></a>
                    </div>
                </div>

                <div className='md:w-1/3 flex items-center justify-center'>
                    <img src={logo2} alt="logo barberia" width={120} height={120} />
                </div>


                <div className='md:w-1/3 flex flex-col justify-center items-center space-y-5'>
                    <h3 className='font-Heading text-primary-500'>Información de Contacto</h3>
                    <div className='flex gap-5 items-center justify-start w-full'>
                        <img src={ubicacionIcon} alt="Ubicación" width={24} height={24} />
                        <p className='text-xs text-white font-thin leading-5'>7 esquinas 25 vrs oeste, Masaya, Nicaragua</p>
                    </div>

                    <div className='flex gap-5 items-center justify-start w-full'>
                        <img src={telefono} alt="Ubicación" width={24} height={24} />
                        <p className='text-xs text-white font-thin leading-5'>+505 8788 2866</p>
                    </div>

                    <div className='flex gap-5 items-center justify-start w-full'>
                        <img src={clockIcon} alt="Ubicación" width={24} height={24} />
                        <p className='text-xs text-white  font-thin leading-5'>Lunes - Sábado, 9:00 AM - 5:00 PM</p>
                    </div>
                </div>

            </div>

            <p className='text-center text-sm text-secondary-500 mt-8'>Todos los derechos Reservados {new Date().getFullYear()}</p>

        </footer>
    )
}

export default Footer