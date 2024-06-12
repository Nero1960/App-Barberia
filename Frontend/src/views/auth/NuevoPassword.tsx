import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import logo from '../../public/logo1.png';
import logo2 from '../../public/logo2.png'
import { useForm } from "react-hook-form";
import Errors from "../../components/Errors";
import { cliente } from "../../types/cliente";

function NuevoPassword() {

    const params = useParams();
    const { register, formState: { errors }, handleSubmit } = useForm<cliente>();
    const navigate = useNavigate();

    const { token } = params;

    useEffect(() => {

        const comprobarToken = async () => {
            try {
                const { data } = await clienteAxios.get(`/olvide-password/${token}`)

                toast.success(data.msg, {
                    theme: 'dark'
                })
            } catch (error: AxiosError | unknown) {

                if (error instanceof AxiosError) {
                    if (error.response) {
                        toast.error(error.response.data.msg, {
                            theme: 'dark'
                        })
                    }
                }

                console.log(error);

            }

        }

        comprobarToken();
    }, [])

    const nuevaPassword = async (datos: cliente) => {
        try {
            const { data } = await clienteAxios.post(`/olvide-password/${token}`, {
                password: datos.password
            })

            toast.success(data.msg, {
                theme: 'dark'
            })

            setTimeout(() => {

                navigate('/')

            }, 2000)
        } catch (error: AxiosError | unknown) {

            if (error instanceof AxiosError) {
                if (error.response) {
                    toast.error(error.response.data.msg, {
                        theme: 'dark'
                    })
                }
            }

            console.log(error);

        }
    }


    return (
        <>

            <div className='flex flex-col items-center'>
                <h1 className="text-center text-secondary-400 text-3xl mt-10 mb-10 md:mt-0 md:mb-0 md:text-5xl font-Heading font-bold md:leading-tight">
                    Proporciona Una Nueva Contraseña
                </h1>

                <img src={logo2} alt="LogoTipo" className='rounded-full mx-auto -mt-6 md:mt-0 w-[40%] h-[40%]'/>
            </div>
            <form action="/olvide-password" method="post" className="md:w-3/4 mx-auto bg-black-500 p-8 rounded-lg shadow-dark-500 shadow-2xl" noValidate onSubmit={handleSubmit(nuevaPassword)}>

                <div className='mb-5'>
                    <img src={logo} alt="LogoTipo" className='rounded-full mx-auto' width={150} height={150} />
                    <span className='block text-sm text-secondary-400 text-center -mt-3'>Mojica's BarberShop</span>
                </div>

                <div className='flex items-center border-b-[1px] border-b-secondary-400'>
                    <svg data-slot="icon" fill="none" className='text-secondary-400' width={30} height={30} strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path>
                    </svg>
                    <input type="password" id="password" placeholder="Contraseña" className="px-4 py-2 bg-transparent outline-none text-secondary-400 w-full placeholder:text-secondary-400"
                        {...register('password', {
                            required: 'Tu Contraseña es requerida',
                            minLength: {
                                value: 6,
                                message: 'Tu Contraseña debe contener mínimo 6 caracteres'
                            }
                        })} />


                </div>

                {errors.password && (
                    <Errors>{errors.password.message as string}</Errors>
                )}



                <Link to={'/'} className='underline mt-10 block text-center text-secondary-400 text-sm  hover:text-secondary-600 duration-700'>¿Ya Tienes una Cuenta? Inicia Sesión</Link>

                <div className='mt-8 mb-16'>
                    <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 duration-300 px-5 py-2 text-white rounded-2xl">Cambiar Contraseña</button>
                </div>

                <Link to={'/registrar-cliente'} className='underline block text-center text-secondary-400 text-sm  hover:text-secondary-600 duration-700'>¿No tienes una Cuenta? Crea Una</Link>

            </form>


        </>
    )
}

export default NuevoPassword