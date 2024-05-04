import { cliente } from "../types/cliente"
import { FiTrash } from "react-icons/fi"

function ListaClientesAdmin({ cliente }: { cliente: cliente }) {
    return (
        <>
            <tr className="bg-black-500 border-b border-b-dark-500 hover:bg-dark-500">

                <th scope="row" className="flex items-center px-6 py-4 text-dark-200 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_BASE_IMAGE}/${cliente.imagen}`} />
                    <div className="ps-3">
                        <div className="text-base font-semibold">{cliente.nombre}{" "}{cliente.apellido}</div>
                        <div className="font-normal text-dark-200">{cliente.email}</div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    {cliente.telefono}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="font-normal text-dark-200">{
                            cliente.direccion ? cliente.direccion : ''
                        }</div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="py-1 px-5 bg-red-500 text-white rounded flex items-center justify-center gap-x-2">
                        <FiTrash />
                        Eliminar</a>
                </td>
            </tr>

        </>
    )
}

export default ListaClientesAdmin