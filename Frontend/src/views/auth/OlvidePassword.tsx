import logo from '../../public/logo1.png'
import logo2 from '../../public/logo2.png'

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Errors from '../../components/Errors';
import clienteAxios from '../../config/axios';
import { DataEmail, DataType } from '../../types/Data';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';


function OlvidePassword() {

    const { register, formState: { errors }, handleSubmit } = useForm<DataEmail>();

    const validarForm = async (datos: DataEmail) => {

        try {

            const { data }: { data: DataType } = await clienteAxios.post('/olvide-password', {
                email: datos.email
            });

            toast.success(data.msg, {
                theme: 'dark'
            });

        } catch (error :  AxiosError | unknown) {

            if(error instanceof AxiosError){
                if(error.response){
                    toast.error(error.response.data.msg, {
                        theme: 'dark'
                    })
                }
            } else{
                console.log(error)
            }

        }
    }
    return (
        <>
            <div className='flex flex-col items-center mx-5'>
                <h1 className="text-center text-secondary-400 text-4xl mt-10 mb-10 md:mt-0 md:mb-0 md:text-5xl font-Heading font-bold md:leading-tight">
                    ! Recupera Tu Cuenta y No Pierdas Tu Acceso!
                </h1>

                <img src={logo2} alt="LogoTipo" className='rounded-full mx-auto -mt-6 md:mt-0' width={250} height={250} />
            </div>

            <form action="/olvide-password" method="post" className="md:w-3/4 mx-auto bg-dark-500 p-8 rounded-lg shadow-dark-500 shadow-2xl" noValidate onSubmit={handleSubmit(validarForm)}>

                <div className=' mb-5'>
                    <img src={logo} alt="LogoTipo" className='rounded-full mx-auto' width={150} height={150} />
                    <span className='block text-sm text-secondary-400 text-center -mt-3'>Mojica's BarberShop</span>
                </div>

                <div className="mb-8">
                    <label htmlFor="email"></label>
                    <div className='flex items-center border-b-[1px] border-b-secondary-400'>
                        <svg data-slot="icon" className='text-secondary-400' fill="none" strokeWidth="1.5" stroke="currentColor" width={30} height={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path>
                        </svg>
                        <input type="tel" id="email" placeholder="E-Mail" className="px-4 py-2 bg-transparent outline-none text-secondary-400 w-full placeholder:text-secondary-400"
                            {...register('email', {
                                required: 'Tu Correo electrónico es requerido'
                            })} />

                    </div>

                    {errors.email && (
                        <Errors>{errors.email.message as string}</Errors>
                    )}
                </div>


                <Link to={'/'} className='underline  block text-center text-secondary-400 text-sm  hover:text-secondary-600 duration-700'>¿Ya Tienes una Cuenta? Inicia Sesión</Link>

                <div className='mt-8 mb-16'>
                    <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 duration-300 px-5 py-2 text-white rounded-2xl">Enviar Instrucciones</button>
                </div>

                <Link to={'/registrar-cliente'} className='underline block text-center text-secondary-400 text-sm  hover:text-secondary-600 duration-700'>¿No tienes una Cuenta? Crea Una</Link>

            </form>

        </>
    )
}

export default OlvidePassword