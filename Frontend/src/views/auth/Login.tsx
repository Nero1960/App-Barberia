import logo1 from '../../public/logo1.png'
import logo2 from '../../public/logo2.png'
import { cliente } from '../../types/cliente';
import Errors from '../../components/Errors';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import {  useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import useAuth from '../../hooks/useAuth';
import { FiKey, FiMail } from 'react-icons/fi';

type Data = {
    idClientes: number
    nombre: string,
    email: string,
    token: string,
    apellido: string,
    direccion: string,
    admin: number,
    telefono: string
    msg: string,
    imagen: string
}


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<cliente>();
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const { auth, setAuth }  = useAuth();

    console.log(auth);

    useEffect(() => {
        if(auth && !auth?.admin){
            navigate('/app');
            return
        } else if(auth && auth?.admin) {
            navigate('/admin')
            return
        }
    }, [])



    const autenticarCliente = async (datos: cliente) => {
        try {

            const { data }: { data: Data } = await clienteAxios.post('/login', {
                email: datos.email,
                password: datos.password
            })

            localStorage.setItem('token', data.token);

            setCargando(true);

            // Muestra una notificación de éxito y activa el Spinner durante 3 segundos
            setTimeout(() => {
                setCargando(false);
                toast.success(data.msg, {
                    theme: 'dark',
                    position: 'top-left'
                });

                setAuth(data);
                

                if (data.admin) {
                    navigate('/admin')
                } else if (!data.admin && data.email) {
                    navigate('/app')
                }


            }, 3000);




        } catch (error: any) {
            toast.error(error.response.data.msg, {
                theme: 'dark'
            })

            console.log(error)

        }

    }

    return (
        <>

            <div className='flex flex-col items-center mt-10 md:mt-0'>
                <h1 className="text-center text-secondary-400 text-3xl mt-10 mb-10 md:mt-0 md:mb-0 md:text-5xl font-Heading font-bold md:leading-tight">
                    ! Bienvenido a Mojica's BarberShop!
                </h1>

                <img src={logo2} alt="LogoTipo" className='rounded-full mx-auto -mt-6 md:mt-0 w-[40%] h-[40%]'/>
            </div>


            <form action="/login" method="POST" className="md:w-3/4 mx-auto bg-dark-600 p-8 rounded-xl shadow-dark-500 shadow-2xl" noValidate onSubmit={handleSubmit(autenticarCliente)}>
                <div className='mb-5'>
                    <img src={logo1} alt="LogoTipo" className='rounded-full mx-auto' width={150} height={150} />
                    <span className='block text-sm text-secondary-400 text-center -mt-3'>Mojica's BarberShop</span>
                </div>

                <div className="mb-8">
                    <label htmlFor="email"></label>
                    <div className='flex items-center border-b-[1px] border-b-secondary-400'>

                        <div className='text-secondary-400 text-2xl'><FiMail/></div>
                        <input type="tel" required id="email" placeholder="E-Mail" className="px-4 py-2 bg-transparent outline-none text-secondary-400 w-full placeholder:text-secondary-400"
                            {...register('email', {
                                required: 'Tu Correo electrónico es requerido'
                            })} />

                    </div>

                    {errors.email && (
                        <Errors>{errors.email.message as string}</Errors>
                    )}
                </div>


                <div className="mb-8">
                    <label htmlFor="password"></label>
                    <div className='flex items-center border-b-[1px] border-b-secondary-400'>
                        <div className='text-secondary-400 text-2xl'><FiKey/></div>
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
                </div>

                <Link to={'/olvide-password'} className='underline  block text-center text-secondary-400 text-sm  hover:text-secondary-600 duration-700'>¿Has Olvidado Tu Contraseña?</Link>

                <div className='mt-8 mb-16'>
                    <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 duration-300 px-5 py-2 text-white rounded-2xl">Iniciar Sesión</button>
                </div>

                {cargando && <Spinner />}

                <Link to={'/registrar-cliente'} className='underline block text-center text-secondary-400 text-sm  hover:text-secondary-600 duration-700'>¿No tienes una Cuenta? Crea Una</Link>

            </form>

        </>
    )
}

export default Login