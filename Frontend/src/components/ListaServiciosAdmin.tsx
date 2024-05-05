import { FiEdit, FiTrash } from "react-icons/fi"
import formatToCordobas from "../helpers/formatDinero"
import { Servicios } from "../types/Servicios"
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";
import useServicios from "../hooks/useServicios";

function ListaServiciosAdmin({ servicio }: { servicio: Servicios }) {

    const { actualizarServicios } = useServicios();

    const eliminarServicio = async (idServicios : number) => {

        const confirmar = confirm("Seguro que Deseas eliminar este servicio?");

        if(!confirmar){
            return;
        }

        try {
            const token = localStorage.getItem('token');

            if(!token){
                return;
            }

            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } : {data: {msg: string}} = await clienteAxios.delete(`/admin/eliminar-servicio/${idServicios}`, config)

            toast.success(data.msg);
        } catch (error) {
            console.log(error);
        }

        actualizarServicios();

    }
    return (
        <tr className="bg-black-500 border-b border-b-dark-500 hover:bg-dark-500">
            <td className="px-6 py-4">
                {servicio.idServicios}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="font-normal text-dark-200">{servicio.nombre}</div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="font-normal text-dark-200">{formatToCordobas(servicio.precio)}</div>
                </div>
            </td>

            <td className="px-6 py-4 flex  gap-x-2">
                <a href={`/admin/actualizar-servicio/${servicio.idServicios}`} className="py-1 px-5 bg-primary-500 text-white rounded flex items-center justify-center gap-x-2 hover:bg-primary-600 duration-300">
                    <FiEdit />
                    Actualizar</a>
                <button type="button" onClick={ () => eliminarServicio(servicio.idServicios as number)} className="py-1 px-5 bg-red-500 text-white rounded flex items-center justify-center gap-x-2 hover:bg-red-600 duration-300">
                    <FiTrash />
                    Eliminar</button>
            </td>
        </tr>
    )
}

export default ListaServiciosAdmin