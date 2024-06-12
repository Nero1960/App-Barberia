import Errors from "../../components/Errors";
import useAuth from "../../hooks/useAuth"
import useBarberos from "../../hooks/useBarberos"
import useServicios from "../../hooks/useServicios"
import { useForm } from 'react-hook-form'
import getFormattedDate from "../../helpers/FormatDate";
import clienteAxios from "../../config/axios";
import Spinner from "../../components/Spinner";
import { toast } from 'react-toastify'; // Importa toast para mostrar notificaciones
import { useState } from "react";

function FormularioCita() {

    const { servicios } = useServicios();
    const { barberos } = useBarberos();
    const { auth } = useAuth();

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [cargando, setCargando] = useState(false);

    const reservarCita = async (datos: any) => {

        const token = localStorage.getItem('token')

        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/app/reservar-cita', datos, config);
            setCargando(true);


            setTimeout(() => {
                toast.success(data.msg, {
                    theme: 'colored',
                    position: 'top-left',
                    autoClose: false,

                });
                setCargando(false)
            }, 3000)

        } catch (error: any) {
            setCargando(true);

            setTimeout(() => {
                toast.error(error.response.data.error, {
                    theme: 'colored',
                    position: 'top-left',
                    autoClose: false,

                });
                setCargando(false)
            }, 3000)

        }

        reset();
    }

    return (
        <>
            <form className="md:order-2 w-full max-w-lg" method="POST" noValidate onSubmit={handleSubmit(reservarCita)}>
                <h2 className='text-secondary-400 text-4xl font-bold mb-4 font-Heading'>Tu nuevo look te espera</h2>
                <p className='text-sm text-white font-thin mb-8'>Reserva ahora tu cita con nuestro equipo de expertos <br /> y prepárate para lucir y sentirte increíble</p>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            {...register('idClientes', { valueAsNumber: true })} // Registrar el campo idClientes en el formulario
                            type="hidden" // Campo oculto para el idClientes
                            value={auth?.idClientes} // Valor del idClientes
                        />
                        <input
                            className="appearance-none block w-full bg-gray-200 text-dark-500 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="nombre"
                            type="text"
                            value={auth?.nombre} // Mostrar el nombre del usuario en el campo de entrada
                            disabled
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="barbero">
                            Barbero
                        </label>
                        <select id="barbero" className="block w-full border border-gray-200 text-dark-500 py-3 px-4  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" {...register('idBarberos', {
                            required: 'Selecciona un barbero',
                            valueAsNumber: true
                        })}>
                            {barberos.map(barbero => (
                                <option key={barbero.idBarberos} value={barbero.idBarberos}>{barbero.nombre}</option>
                            ))}

                        </select>
                        {errors.barbero && (
                            <Errors>{errors.barbero.message as string}</Errors>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="fecha">
                            Fecha
                        </label>
                        <div className="flex flex-col">
                            <input className="appearance-none block w-full bg-white text-dark-500 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" id="fecha" min={getFormattedDate()} type="date"
                                {...register('fecha', {
                                    required: 'Proporciona una Fecha'
                                })} />

                            {errors.fecha && (
                                <Errors>{errors.fecha.message as string}</Errors>
                            )}

                        </div>


                    </div>

                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="hora">
                            Hora
                        </label>
                        <div className="flex flex-col">
                            <input className="appearance-none block w-full bg-white text-dark-500 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" id="hora" type="time" min='09:00' max='18:00'
                                {...register('hora', {
                                    required: 'Proporciona una Hora'
                                })}
                            />

                            {errors.hora && (
                                <Errors>{errors.hora.message as string}</Errors>
                            )}

                        </div>

                    </div>


                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="servicios">
                            Servicios
                        </label>
                        <select id="servicios" multiple className="block w-full border border-gray-200 text-dark-500 py-3 px-4  rounded leading-tight focus:outline-none h-60 focus:bg-white focus:border-gray-500"
                            {...register('servicios[]', {
                                required: 'Proporciona uno o mas servicios',
                                valueAsNumber: true
                            })}
                        >

                            {servicios.map(servicio => (
                                <option key={servicio.idServicios} value={servicio.idServicios}>{servicio.nombre}</option>
                            ))}

                        </select>

                    </div>

                    {errors.servicios && (
                        <Errors>{errors.servicios.message as string}</Errors>
                    )}
                </div>


                <input type="submit" className='w-full bg-primary-500 mt-5 duration-300 hover:bg-primary-600 cursor-pointer px-5 py-2 rounded text-white text-center' value={'Reservar Cita'} />

                {cargando && (
                    <Spinner />
                )}

            </form>


        </>
    )
}

export default FormularioCita