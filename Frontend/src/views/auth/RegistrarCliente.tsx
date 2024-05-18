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
import { FiKey, FiMail, FiPhone, FiUser } from 'react-icons/fi';

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
        } catch (error: any) {
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

                <img src={logo2} alt="LogoTipo" className='rounded-full mx-auto -mt-6 md:mt-0 w-[40%] h-[40%]' />
            </div>

            <form action="/registrar" method="post" className="md:w-3/4 mx-auto bg-dark-600 p-8 rounded-xl shadow-dark-500 shadow-2xl" noValidate onSubmit={handleSubmit(registrarCliente)}>

                <div className='mb-5'>
                    <img src={logo} alt="LogoTipo" className='rounded-full mx-auto' width={150} height={150} />
                    <span className='block text-sm text-secondary-400 text-center -mt-3'>Mojica's BarberShop</span>

                </div>

                <div className="mb-8">
                    <label htmlFor="nombre"></label>
                    <div className='flex  items-center border-b-[1px] border-b-secondary-400'>
                        <div className='text-secondary-400 text-2xl'><FiUser /></div>
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
                        <div className='text-secondary-400 text-2xl'><FiUser /></div>
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
                        <div className='text-secondary-400 text-2xl'><FiPhone /></div>
                        <input type="tel" pattern="[0-9]+" id="telefono" placeholder="Número Telefónico" className="px-4 py-2  bg-transparent outline-none text-secondary-400 w-full placeholder:text-secondary-400"
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
                        <div className='text-secondary-400 text-2xl'><FiMail /></div>
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
                        <div className='text-secondary-400 text-2xl'><FiKey /></div>
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