// Importa los componentes y hooks necesarios
import Errors from "../../components/Errors";
import useAuth from "../../hooks/useAuth";
import useBarberos from "../../hooks/useBarberos";
import useServicios from "../../hooks/useServicios";
import useCitas from "../../hooks/useCitas";
import { useForm } from 'react-hook-form';
import getFormattedDate from "../../helpers/FormatDate";
import clienteAxios from "../../config/axios";
import Spinner from "../../components/Spinner";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";

// Define el tipo de datos para una cita
type Appointment = {
    idClientes: number,
    idCitas: number,
    fecha: string,
    hora: string,
    barbero: {
        nombre: string,
        apellido: string,
        idBarberos: number
    },
    servicios: [
        idServicios: number
    ],
    msg: string
}

// Función principal para actualizar citas
function ActualizarCita() {
    // Utiliza useForm para manejar el estado del formulario
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<Appointment>();
    // Define estados y funciones necesarias
    const [cargando, setCargando] = useState(false);
    const [cita, setCita] = useState<Appointment | {}>({});
    const { servicios } = useServicios();
    const { barberos } = useBarberos();
    const { actualizarCitas } = useCitas();
    const { auth } = useAuth();
    const params = useParams();
    const idCitas = params.idCitas;
    const navigate = useNavigate();

    // Hook useEffect para obtener la cita actual
    useEffect(() => {
        const obtenerCita = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data }: { data: Appointment } = await clienteAxios(`app/obtener-cita/${idCitas}`, config);
                setCita(data);
                // Establece los valores de la cita en el formulario
                setValue('fecha', data.fecha);
                setValue('hora', data.hora);
                setValue('idCitas', data.idCitas);
                setValue('barbero.idBarberos', data.barbero.idBarberos);
                
            } catch (error) {
                console.log(error);
            }
        }
        obtenerCita();
    }, [setValue])

    // Función para actualizar la cita
    const updateCita = async (datos: Appointment) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            // Envía la solicitud PUT para actualizar la cita
            setCargando(true);
            const { data }: { data: Appointment } = await clienteAxios.put(`app/actualizar-cita/${idCitas}`, {
                'fecha': datos.fecha,
                'hora': datos.hora,
                'idCitas': datos.idCitas,
                'idClientes': datos.idClientes,
                'idBarberos': datos.barbero.idBarberos,
                'servicios': datos.servicios
            }, config);


            setTimeout(() => {
                toast.success(data.msg, {
                    theme: 'colored',
                    position: 'top-left',
                    autoClose: false,

                });
                setCargando(false)
                navigate('/app/mis-citas')
            }, 3000)
            
        } catch (error : any) {
            console.log(error)
            setTimeout(() => {
                toast.error(error.response.data.msg, {
                    theme: 'colored',
                    position: 'top-left',
                    autoClose: false,

                });
                setCargando(false)
            }, 3000)
        }
        // Actualiza la lista de citas
        actualizarCitas();
    }

    return (
        <>
            {/* Formulario para actualizar la cita */}
            <form className="actualizar md:max-w-4xl max-w-[90%] py-10 mx-auto" method="PUT" noValidate onSubmit={handleSubmit(updateCita)}>
                <h2 className='text-secondary-400 text-4xl font-bold mb-4 font-Heading'>Actualiza tu Cita</h2>
                <p className='text-sm text-white font-thin mb-8'>Actualiza tu cita y no pierdas la oportunidad de conocer a nuestro equipo de expertos <br /> y prepárate para lucir y sentirte increíble</p>

                {/* Sección para el nombre del cliente y el barbero */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        {/* Campo oculto para el idClientes */}
                        <input {...register('idClientes', { valueAsNumber: true })} type="hidden" value={auth?.idClientes} />
                        {/* Input para mostrar el nombre del cliente */}
                        <input className="appearance-none block w-full bg-gray-200 text-dark-500 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nombre" type="text" value={auth?.nombre} disabled />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="barbero">
                            Barbero
                        </label>
                        {/* Select para seleccionar el barbero */}
                        <select id="barberos.idBarberos" className="block w-full border border-gray-200 text-dark-500 py-3 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register('barbero.idBarberos', { required: 'Selecciona un barbero', valueAsNumber: true })}>
                            {/* Mapea la lista de barberos para mostrar en el select */}
                            {barberos.map(barbero => (
                                <option key={barbero.idBarberos} value={barbero.idBarberos}>{barbero.nombre}</option>
                            ))}
                        </select>
                        {/* Muestra el error si no se selecciona un barbero */}
                        {errors.barbero?.idBarberos && (
                            <Errors>{errors.barbero?.idBarberos.message as string}</Errors>
                        )}
                    </div>
                </div>

                {/* Sección para la fecha y hora de la cita */}
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="fecha">
                            Fecha
                        </label>
                        {/* Input para seleccionar la fecha */}
                        <div className="flex flex-col">
                            <input className="appearance-none block w-full bg-gray-200 text-dark-500 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" id="fecha" min={getFormattedDate()} type="date" {...register('fecha', { required: 'Proporciona una Fecha' })} />
                            {/* Muestra el error si no se proporciona la fecha */}
                            {errors.fecha && (
                                <Errors>{errors.fecha.message as string}</Errors>
                            )}
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="hora">
                            Hora
                        </label>
                        {/* Input para seleccionar la hora */}
                        <div className="flex flex-col">
                            <input className="appearance-none block w-full bg-gray-200 text-dark-500 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" id="hora" type="time" min='09:00' max='18:00' {...register('hora', { required: 'Proporciona una Hora' })} />
                            {/* Muestra el error si no se proporciona la hora */}
                            {errors.hora && (
                                <Errors>{errors.hora.message as string}</Errors>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sección para seleccionar los servicios */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="servicios">
                            Servicios
                        </label>
                        {/* Select para seleccionar los servicios */}
                        <select id="servicios" multiple className="block w-full border border-gray-200 text-dark-500 py-3 px-4  rounded leading-tight focus:outline-none h-60 focus:bg-white focus:border-gray-500" {...register('servicios', { required: 'Proporciona uno o mas servicios', valueAsNumber: true })}>
                            {/* Mapea la lista de servicios para mostrar en el select */}
                            {servicios.map(servicio => (
                                <option key={servicio.idServicios} value={servicio.idServicios}>{servicio.nombre}</option>
                            ))}
                        </select>
                        {/* Muestra el error si no se selecciona ningún servicio */}
                        {errors.servicios && (
                            <Errors>{errors.servicios.message as string}</Errors>
                        )}
                    </div>
                </div>

                {/* Botón para enviar el formulario */}
                <input type="submit" className='w-full bg-primary-500 mt-5 duration-300 hover:bg-primary-600 cursor-pointer px-5 py-2 rounded text-white text-center' value={'Actualizar Cita'} />

                {/* Muestra un spinner de carga si está cargando */}
                {cargando && (
                    <Spinner />
                )}
            </form>
        </>
    )
}

export default ActualizarCita;
