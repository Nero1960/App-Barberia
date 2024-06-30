import { useEffect } from "react"
import clienteAxios from "../../config/axios";
import formatToCordobas from "../../helpers/formatDinero";
import formatFecha from "../../helpers/FormatFecha";
import formatHora from "../../helpers/FormatHora";
import logo from '../../public/logo2.png'
import useCitas from "../../hooks/useCitas";
import { toast } from "react-toastify";
import { FiCalendar, FiClock, FiDelete, FiEdit } from "react-icons/fi";




function MisCitas() {

    const { citas, actualizarCitas } = useCitas();
    let finalizado: boolean | undefined;


    useEffect(() => {
        actualizarCitas();
    }, [])

    const eliminarCita = async (idCitas: number) => {

        const confirmar = confirm('Deseas eliminar la cita?');

        if (!confirmar) {
            return;
        }

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

            const { data }: any = await clienteAxios.delete(`app/eliminar-cita/${idCitas}`, config);
            toast.success(data.msg, {
                theme: 'colored',
                position: 'top-left',
                autoClose: false
            })
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.msg, {
                theme: 'colored',
                position: 'top-left',
                autoClose: false
            })
        }


        actualizarCitas();

    }


    return (
        <>

            <main className={`${citas?.length === 0 ? 'h-screen' : 'h-full'} max-w-[90%] my-10 md:max-w-5xl mx-auto`}>

                {citas?.length > 0 ?

                    <>

                        <h1 className="text-secondary-400 text-4xl font-Heading text-center flex items-center gap-x-2 justify-center"><FiCalendar />Mis Citas</h1>


                        <div className="overflow-y-scroll relative h-screen">



                            {citas.map(cita => (


                                <div className="w-full md:max-w-3xl mx-auto rounded-lg shadow bg-black-500 my-10" key={cita.idCitas}>
                                    <div className=" md:p-10 space-y-5">
                                        <div className="flex flex-col items-center space-y-2">
                                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${import.meta.env.VITE_BASE_IMAGE}/${cita.cliente.imagen}`} alt="cliente image" />
                                            <h5 className="mb-1 text-xl font-medium text-white">{cita.cliente.nombre} {""} {cita.cliente.apellido}</h5>
                                            <span className="text-sm text-dark-100 flex gap-x-2 items-center"><span><FiCalendar /></span>  {formatFecha(cita.fecha)}</span>
                                            <span className="text-sm text-dark-100 flex gap-x-2 items-center"><span><FiClock /></span>{formatHora(cita.hora)}</span>
                                            <p className="text-sm text-dark-200 max-w-xl leading-6 flex items-center gap-x-2">Barbero<span className="font-medium text-white">{cita.barbero.nombre}{" "}{cita.barbero.apellido}</span> </p>
                                            <p className="text-sm text-dark-200 max-w-xl leading-6 flex items-center gap-x-2">Estado<span className={`font-medium ${cita.estado === 'Finalizado' ? 'text-green-500' : 'text-primary-500'}`}>{cita.estado}</span> </p>

                                        </div>

                                        <div className="space-y-4 px-10">
                                            {cita.servicios.map((servicio, index) => (
                                                <div key={index} className="servicio-item flex justify-between items-center text-sm text-white">
                                                    <p className="servicio-nombre">{servicio.nombre}</p>
                                                    <p className="servicio-precio text-lg text-primary-500">{formatToCordobas(servicio.CitasServicios.precioActual)}</p>
                                                </div>

                                            ))}

                                            <p className="servicio-total flex justify-between text-white text-sm">Total <span className="text-2xl text-white">{formatToCordobas(cita.servicios.reduce((total, precio) => total + precio.CitasServicios.precioActual, 0))}</span></p>

                                        </div>

                                        <div className={`flex justify-center items-center gap-x-3`}>
                                            <a href={`/app/actualizar-cita/${cita.idCitas}`}
                                                className={`bg-blue-500 text-white uppercase px-4 py-1 flex gap-x-2 items-center rounded-sm hover:bg-blue-600 duration-300 ${cita.estado === 'Finalizado' ? 'pointer-events-none opacity-50' : ''}`}>
                                                <FiEdit /> Actualizar
                                            </a>
                                            <button
                                                onClick={() => eliminarCita(cita.idCitas)}
                                                type="button"
                                                disabled={finalizado}
                                                className={`bg-red-500 text-white uppercase px-4 py-1 flex gap-x-2 items-center rounded-sm hover:bg-red-600 duration-300 ${cita.estado === 'Finalizado' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                                                <FiDelete /> Cancelar
                                            </button>
                                        </div>


                                    </div>


                                </div>

                            ))}

                        </div>

                    </>

                    : <>

                        <h1 className="text-secondary-400 text-5xl font-Heading text-center">No tienes Citas, Comienza Reservando</h1>
                        <img className="mx-auto" src={logo} alt="Logotipo" width={200} height={200} />

                    </>

                }



            </main>


        </>
    )
}

export default MisCitas