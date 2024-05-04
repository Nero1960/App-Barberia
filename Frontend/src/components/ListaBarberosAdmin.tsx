import { FiEdit, FiTrash } from "react-icons/fi"
import { Barberos } from "../types/Barberos"
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";
import useBarberos from "../hooks/useBarberos";

function ListaBarberosAdmin({ barbero }: { barbero: Barberos }) {

    const { actualizarBarberos } = useBarberos();

    const eliminarBarbero = async (idBarberos: number) => {
        const confirmar = confirm('Seguro que deseas eliminar este usuario?');

        if (!confirmar) {
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
                    Authorization : `Bearer ${token}`
                }
            }

            

            const { data } : {data : {msg: string}}= await clienteAxios.delete(`/admin/eliminar-barbero/${idBarberos}`, config);

            toast.success(data.msg)



        } catch (error) {
            console.log(error);
        }

        actualizarBarberos();
    }

    return (
        <>

            <>
                <tr className="bg-black-500 border-b border-b-dark-500 hover:bg-dark-500">

                    <th scope="row" className="flex items-center px-6 py-4 text-dark-200 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.imagen}`} />
                        <div className="ps-3">
                            <div className="text-base font-semibold">{barbero.nombre}{" "}{barbero.apellido}</div>
                            <div className="font-normal text-dark-200">{barbero.email}</div>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        {barbero.telefono}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            <div className="font-normal text-dark-200">{
                                barbero.especialidad ? barbero.especialidad : ''
                            }</div>
                        </div>
                    </td>
                    <td className="px-6 py-4 flex justify-between gap-x-2">
                        <a href={`/admin/actualizar-barbero/${barbero.idBarberos}`} className="py-1 px-5 bg-primary-500 text-white rounded flex items-center justify-center gap-x-2 hover:bg-primary-600 duration-300">
                            <FiEdit />
                            Actualizar</a>
                        <button type="button" onClick={() => eliminarBarbero(barbero.idBarberos as number)} className="py-1 px-5 bg-red-500 text-white rounded flex items-center justify-center gap-x-2 hover:bg-red-600 duration-300">
                            <FiTrash />
                            Eliminar</button>
                    </td>
                </tr>

            </>
        </>
    )
}

export default ListaBarberosAdmin