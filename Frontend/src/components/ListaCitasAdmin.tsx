import { FiCalendar, FiClock, FiEye, FiTrash } from "react-icons/fi"
import { CitaConDetalle } from "../types/Citas"
import formatFecha from "../helpers/FormatFecha"
import formatHora from "../helpers/FormatHora"
import formatToCordobas from "../helpers/formatDinero"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"

type CitasDetails = CitaConDetalle & {
    cliente: {
        nombre: string,
        imagen: string,
        apellido: string,
        telefono: string
    }
}

function ListaCitasAdmin({ cita, actualizarCitaAdmin }: { cita: CitasDetails , actualizarCitaAdmin : () => void}) {


    const eliminarCita = async (idCitas: number) => {

        const confirmar = confirm('Deseas Eliminar esta Cita?');

        if(!confirmar){
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


        actualizarCitaAdmin();

    }


    return (
        <tr className="bg-black-500 border-b border-b-dark-500 hover:bg-dark-500">
            <td className="px-6 py-4">{cita.idCitas}</td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_BASE_IMAGE}/${cita.cliente.imagen}`} />
                    <div className="ps-3">
                        <div className="text-base font-semibold text-white">{cita.cliente.nombre}{" "}{cita.cliente.apellido}</div>
                        <div className="font-normal text-dark-200">{cita.cliente.telefono}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col justify-between space-y-2">
                    <div className="flex gap-x-3 items-center text-white font-bold"><FiCalendar /> <span className="font-normal text-dark-200"> {formatFecha(cita.fecha)}</span></div>
                    <div className="flex gap-x-3 items-center text-white font-bold"><FiClock /> <span className="font-normal text-dark-200">{formatHora(cita.hora)}</span> </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center">
                    {formatToCordobas(cita.servicios.reduce((total, servicio) => total + servicio.precio, 0))}
                </div>
            </td>

            <td className="px-6 py-4 flex justify-between gap-x-2">
                <a href={`/admin/ver-cita/${cita.idCitas}`} className="py-1 px-8 bg-blue-500 text-white rounded flex items-center justify-center gap-x-2 hover:bg-blue-600 duration-300">
                    <FiEye />
                    Ver

                </a>
                <button type="button" onClick={() => eliminarCita(cita.idCitas as number)} className=" flex gap-x-2 items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 duration-300">
                    <FiTrash />
                    Eliminar
                </button>
            </td>


        </tr>

    )
}

export default ListaCitasAdmin