import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin"
import { TestimonialType } from "../../types/Testimoniales";
import clienteAxios from "../../config/axios";
import formatFecha from "../../helpers/FormatFecha";
import { FiCheckCircle } from "react-icons/fi";
import useTestimonial from "../../hooks/useTestimoniales";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

type TestimonialListType = TestimonialType & {
    cliente: {
        nombre: string,
        imagen: string,
        apellido: string
    }
}


const InformacionTestimonial = () => {

    const [testimonialState, setTestimonialState] = useState<TestimonialListType>(null!);
    const { actualizarTestimoniales } = useTestimonial();
    const [cargando, setCargando] = useState(false)
    const params = useParams();
    const idTestimoniales = Number(params.idTestimoniales);



    useEffect(() => {

        const obtenerTestimonial = async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                return
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                const { data }: { data: TestimonialListType } = await clienteAxios.get(`/admin/obtener-testimonial/${idTestimoniales}`, config)
                console.log(data)
                setTestimonialState(data)



            } catch (error) {
                console.log(error)
            }



        }

        obtenerTestimonial();

    }, [cargando])

    const publicarTestimonial = async () => {

        try {
            const token = localStorage.getItem('token');
            console.log(token)

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            console.log(config)

            const { data }: { data: { msg: string } } = await clienteAxios.put(`/admin/permitir-testimonial/${idTestimoniales}`, {}, config)

            setCargando(true)


            setTimeout(() => {
                setCargando(false)
                toast.success(data.msg, {autoClose: false})

            }, 2000)

        } catch (error) {

            console.log(error)
        }

        actualizarTestimoniales();

    }

    const desaprobarTestimonial = async () => {

        try {
            const token = localStorage.getItem('token');
            console.log(token)

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            console.log(config)

            const { data }: { data: { msg: string } } = await clienteAxios.put(`/admin/desaprobar-Testimonial/${idTestimoniales}`, {}, config)

            console.log(data)
            setCargando(true)

            setTimeout(() => {
                setCargando(false)
                toast.warning(data.msg, {autoClose: false})

            }, 2000)

        } catch (error) {

            console.log(error)
        }

        actualizarTestimoniales();

    }



    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            {testimonialState && (


                <div className="w-full max-w-xl mx-auto rounded-lg shadow bg-black-500 mt-20">

                    <div className="flex flex-col items-center p-10 space-y-5">
                        <div className="flex flex-col items-center space-y-2">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${import.meta.env.VITE_BASE_IMAGE}/${testimonialState.cliente.imagen}`} alt="cliente image" />
                            <h5 className="mb-1 text-xl font-medium text-white">{testimonialState.cliente.nombre} {""} {testimonialState.cliente.apellido}</h5>
                            <span className="text-sm text-dark-100">"{testimonialState.titulo}"</span>
                            <p className="text-sm text-dark-200 max-w-xl leading-6">{testimonialState.mensaje}</p>
                            <span className="text-primary-500 text-sm text-end">{formatFecha(testimonialState.fecha)}</span>
                        </div>

                        <div className="flex mt-4 md:mt-6">
                            <button type="button" onClick={() => testimonialState.estado === 'Pendiente' ? publicarTestimonial() : desaprobarTestimonial()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 gap-x-2"><FiCheckCircle />{testimonialState.estado === 'Pendiente' ? 'Aprobar' : 'Desaprobar'}</button>

                        </div>

                        {cargando && <Spinner />}
                    </div>
                </div>

            )}






        </div>
    )
}

export default InformacionTestimonial