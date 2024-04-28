import FormularioCita from "./FormularioCita"
import logo from '../../public/logo1.png'
import { Link } from "react-router-dom";

function ReservarCita() {
    return (
        <main className='citas space-y-9' id='citas'>

            <div className='flex flex-col justify-between gap-y-28 md:flex-row md:h-full md:justify-center md:items-center md:max-w-5xl max-w-[90%] mx-auto gap-x-10 py-20'>
                <div className='order-2 md:order-1 text-secondary-100 flex flex-col gap-y-15 font-Heading md:w-2/3 -mt-14'>
                    <img src={logo} alt="logo" loading='lazy' width={150} height={150} className='mx-auto' />

                    <h2 className='text-3xl md:text-4xl text-secondary-400 text-center leading-10 font-bold'>Consigue El Mejor Corte Reservando tu Cita Hoy Mismo</h2>
                    <Link to={"/app/policy"} className=" mt-5 rounded text-center bg-primary-500 w-full py-2 text-white hover:bg-primary-600 duration-300"> Ver Políticas de Citas</Link>
                </div>

                <FormularioCita />
            </div>

        </main>
    )
}

export default ReservarCita;