import { FiCalendar, FiEye, FiTrash } from 'react-icons/fi'
import { TestimonialType } from '../types/Testimoniales'
import formatFecha from '../helpers/FormatFecha'
import clienteAxios from '../config/axios'
import { toast } from 'react-toastify'
import useTestimonial from '../hooks/useTestimoniales'


type TestimonialListType = TestimonialType & {
    cliente: {
        nombre: string,
        imagen: string,
        apellido: string
    }
}


const ListaTestimonialAdmin = ({ testimonial }: { testimonial: TestimonialListType }) => {

    const {actualizarTestimoniales} = useTestimonial();

    const eliminarTestimonial = async (idTestimoniales : number) => {

        try {
            const token = localStorage.getItem('token');

            if(!token){
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } : { data : {msg: string}} = await clienteAxios.delete(`/admin/eliminar-testimonial/${idTestimoniales}`, config)

            toast.success(data.msg)
        } catch (error) {
            console.log(error)
        }

        actualizarTestimoniales();

    }

    return (
        <>
            <tr className="bg-black-500 border-b border-b-dark-500 hover:bg-dark-500">

                <th scope="row" className="flex items-center space-y-2  px-6 py-4 text-dark-200 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_BASE_IMAGE}/${testimonial.cliente.imagen}`} />
                    <div className="ps-3">
                        <p className='text-sm font-light text-dark-200'>Publish by</p>
                        <div className="text-base font-semibold">{testimonial.cliente.nombre}</div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    <div className='flex items-center gap-x-2'>
                        <FiCalendar />
                        {formatFecha(testimonial.fecha)}

                    </div>

                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="font-normal text-dark-200">{
                            testimonial.titulo
                        }</div>
                    </div>
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className={`font-normal ${testimonial.estado === 'Pendiente' ? 'text-primary-500  before:w-2 before:h-2 before:bg-primary-500 before:rounded-full before:block flex items-center gap-x-2' : 'text-green-500 before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:block flex items-center gap-x-2'}`}>{
                            testimonial.estado
                        }</div>
                    </div>
                </td>
                <td className="  flex items-center -mt-16 justify-center gap-x-2">
                    <a href={`/admin/ver-testimonial/${testimonial.idTestimoniales}`}  className="py-1 px-5 bg-blue-500 text-white rounded flex items-center justify-center gap-x-2 hover:bg-blue-600 duration-300">
                        <FiEye />
                        Ver</a>
                    <button type="button"  onClick={() => eliminarTestimonial(testimonial.idTestimoniales)} className="py-1 px-5 bg-red-500 text-white rounded flex items-center justify-center gap-x-2 hover:bg-red-600 duration-300">
                        <FiTrash />
                        Eliminar</button>
                </td>
            </tr>

            
        </>
    )
}

export default ListaTestimonialAdmin