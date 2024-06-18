import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import HeaderAdmin from "../../components/HeaderAdmin"
import clienteAxios from "../../config/axios";
import { CitaConDetalle } from "../../types/Citas";
import formatFecha from "../../helpers/FormatFecha";
import { FiCalendar, FiClock } from "react-icons/fi";
import formatToCordobas from "../../helpers/formatDinero";
import formatHora from "../../helpers/FormatHora";
import { toast } from "react-toastify";



function InfoCita() {

    const params = useParams();
    const idCitas = Number(params.idCitas);
    const [cita, setCita] = useState<CitaConDetalle>({} as CitaConDetalle)
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerCita = async () => {

            try {

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

                const { data }: { data: CitaConDetalle } = await clienteAxios.get(`/admin/obtener-cita/${idCitas}`, config);
                setCita(data)

            } catch (error) {
                console.log(error)
                setCita({} as CitaConDetalle)
            }

        }

        obtenerCita();

        console.log(cita)


    }, [])

    const citaFinalizada = async () => {

        try {

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

            const { data }: { data: {msg : string} } = await clienteAxios.put(`/admin/finalizar-cita/${idCitas}`, {}, config);
            toast.success(data.msg, {autoClose: false})
            navigate('/admin/citas')

        } catch (error) {
            console.log(error)
        }
    }

        

    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            {Object.values(cita).length > 0 && (

                <div className="w-full max-w-xl mx-auto rounded-lg shadow bg-black-500 mt-20">


                    <div className=" p-10 space-y-5">
                        <div className="flex flex-col items-center space-y-2">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${import.meta.env.VITE_BASE_IMAGE}/${cita.cliente.imagen}`} alt="cliente image" />
                            <h5 className="mb-1 text-xl font-medium text-white">{cita.cliente.nombre} {""} {cita.cliente.apellido}</h5>
                            <span className="text-sm text-dark-100 flex gap-x-2 items-center"><span><FiCalendar /></span>  {formatFecha(cita.fecha)}</span>
                            <span className="text-sm text-dark-100 flex gap-x-2 items-center"><span><FiClock /></span>{formatHora(cita.hora)}</span>
                            <p className="text-sm text-dark-200 max-w-xl leading-6 flex items-center gap-x-2">Barbero<span className="font-medium text-white">{cita.barbero.nombre}{" "}{cita.barbero.apellido}</span> </p>
                            
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

                        <div className="flex flex-col">
                            <button type="button" className={`${cita.estado === 'Finalizado' ? 'bg-red-500 cursor-not-allowed hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} py-1  duration-300 rounded-lg text-white`} disabled={cita.estado === 'Finalizado'} onClick={citaFinalizada}>{
                                cita.estado === 'Finalizado' ? 'Cita Finalizada' : 'Marcar como Finalizado'
                            }</button>

                        </div>
                    </div>
                </div>

            )}


        </div>
    )
}

export default InfoCita