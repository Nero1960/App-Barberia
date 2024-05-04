import { useForm } from 'react-hook-form'; // Importa el hook useForm de react-hook-form
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import logo from '../../public/logo1.png'; // Importa la imagen del logo
import logo2 from '../../public/logo2.png';
import Errors from '../../components/Errors'; // Importa el componente Errors
import { cliente } from '../../types/cliente'; // Importa el tipo cliente
import clienteAxios from '../../config/axios';
import { toast } from 'react-toastify'; // Importa toast para mostrar notificaciones
import { useState } from 'react'; // Importa useState para manejar estado en el componente
import Spinner from '../../components/Spinner'; // Importa el componente Spinner

function RegistrarCliente() {
    // Usa el hook useForm para manejar el formulario y los errores
    const { register, handleSubmit, formState: { errors } } = useForm<cliente>();
    const [cargando, setCargando] = useState(false); // Estado para controlar la visualización del Spinner

    // Función para registrar un cliente
    const registrarCliente = async (data: cliente) => {
        const { nombre, apellido, email, telefono, password } = data;
        email.toLocaleLowerCase().trim();
        nombre.trim();
        apellido.trim();
        telefono.trim();

        

        try {
            // Envía una solicitud POST para registrar el cliente
            const response = await clienteAxios.post('/registrar', {
                nombre,
                apellido,
                email,
                telefono,
                password
            });


            // Muestra una notificación de éxito y activa el Spinner durante 3 segundos
            setCargando(true);
            setTimeout(() => {
                setCargando(false);
                toast.success(response.data.msg, {
                    theme: 'dark',
                    position: 'top-left'
                });
            }, 3000);
        } catch (error : any) {
            // Muestra una notificación de error y activa el Spinner durante 3 segundos
            setCargando(true);
            setTimeout(() => {
                setCargando(false);
                toast.error(error.response.data.msg, {
                    theme: 'dark',
                    position: 'top-left'
                });
            }, 3000);
        }
    }
    return (
        <>
            <div className='flex flex-col items-center'>
                <h1 className="text-center text-secondary-400 text-3xl mt-10 mb-10 md:mt-0 md:mb-0 md:text-5xl font-Heading font-bold md:leading-tight">
                    Crea Tu Cuenta y Reserva Tus Citas
                </h1>

                <img src={logo2} alt="LogoTipo" className='rounded-full mx-auto -mt-6 md:mt-0 w-[40%] h-[40%]'/>
            </div>

            <form action="/registrar" method="post" className="md:w-3/4 mx-auto bg-dark-500 p-8 rounded-xl shadow-dark-500 shadow-2xl" noValidate onSubmit={handleSubmit(registrarCliente)}>

                <div className='mb-5'>
                    <img src={logo} alt="LogoTipo" className='rounded-full mx-auto' width={150} height={150} />
                    <span className='block text-sm text-secondary-400 text-center -mt-3'>Mojica's BarberShop</span>

                </div>

                <div className="mb-8">
                    <label htmlFor="nombre"></label>
                    <div className='flex  items-center border-b-[1px] border-b-secondary-400'>
                        <svg data-slot="icon" fill="none" className='text-secondary-400' width={30} height={30} strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        </svg>
                        <input type="text" id="nombre" placeholder="Nombre" className="px-4 py-2  bg-transparent outline-none  text-secondary-400 w-full placeholder:text-secondary-400" {...register('nombre', {
                            required: 'Tu Nombre es obligatorio'
                        })} />
                    </div>

                    {errors.nombre && (
                        <Errors>{errors.nombre.message as string}</Errors>
                    )}


                </div>

                <div className="mb-8">
                    <label htmlFor="apellido"></label>
                    <div className='flex items-center border-b-[1px] border-b-secondary-400'>
                        <svg data-slot="icon" fill="none" className='text-secondary-400' width={30} height={30} strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        </svg>
                        <input type="text" id="apellido" placeholder="Apellido" className="px-4 py-2  bg-transparent outline-none text-secondary-400 w-full placeholder:text-secondary-400"
                            {...register('apellido', {
                                required: 'Tu apellido es requerido'
                            })} />

                    </div>

                    {errors.apellido && (
                        <Errors>{errors.apellido.message as string}</Errors>
                    )}
                </div>

                <div className="mb-8">
                    <label htmlFor="telefono"></label>
                    <div className='flex items-center border-b-[1px] border-b-secondary-400'>
                        <svg data-slot="icon" fill="none" className='text-secondary-400' width={30} height={30} strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"></path>
                        </svg>
                        <input type="tel"  pattern="[0-9]+" id="telefono" placeholder="Número Telefónico" className="px-4 py-2  bg-transparent outline-none text-secondary-400 w-full placeholder:text-secondary-400"
                            {...register('telefono', {
                                required: 'Ingresa un numero telefónico',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Por favor ingresa solo números'
                                  }
                            })} />

                    </div>

                    {errors.telefono && (
                        <Errors>{errors.telefono.message as string}</Errors>
                    )}

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

                <div className="mb-8">
                    <label htmlFor="password"></label>
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
                </div>


                <div className='my-10'>
                    <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 duration-300 px-5 py-2 text-white rounded-2xl">Crear Cuenta</button>
                </div>

                {cargando && <Spinner />}

                <Link to={'/'} className='underline block text-center text-secondary-400 text-sm hover:text-secondary-600 duration-700'>¿Ya tienes una cuenta? Inicia Sesión</Link>
            </form>


        </>

    )
}

export default RegistrarCliente