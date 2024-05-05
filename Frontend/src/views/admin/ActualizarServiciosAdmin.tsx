import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import HeaderAdmin from "../../components/HeaderAdmin"
import { useParams } from 'react-router-dom'
import { Servicios } from "../../types/Servicios";
import clienteAxios from "../../config/axios";
import Errors from "../../components/Errors";
import Spinner from "../../components/Spinner";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import useServicios from "../../hooks/useServicios";

function ActualizarServiciosAdmin() {
    const params = useParams();
    const { idServicios } = params;

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<Servicios>();
    const { actualizarServicios } = useServicios();
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const obtenerServicio = async () => {

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

                const { data }: { data: Servicios } = await clienteAxios.get(`/admin/obtener-servicio/${idServicios}`, config)
                setValue('nombre', data.nombre);
                setValue('precio', data.precio)

                console.log(data)
            } catch (error) {
                console.log(error)
            }

        }

        obtenerServicio();

    }, [])

    const actualizarServicio = async (datos: Servicios) => {

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

            const { data }: { data: { msg: string } } = await clienteAxios.put(`/admin/actualizar-servicio/${idServicios}`, datos, config);

            setCargando(true);

            setTimeout(() => {
                toast.success(data.msg, { autoClose: false })
                setCargando(false);
                navigate('/admin/servicios');
            }, 3000);


        } catch (error) {
            console.log(error);
        }

        actualizarServicios();

    }


    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            <div className="mx-5 my-10">
                <h1 className=" text-white text-xl text-center flex items-center justify-center gap-x-2 mb-5 font-Heading font-bold bg-primary-500 px-5 py-2"><FiEdit /> Actualizar Servicio</h1>
                <form action="/admin/agregar-servicio" method="post" noValidate className='space-y-5 bg-black-500 px-10 py-3' onSubmit={handleSubmit(actualizarServicio)}>
                    <div className='grid grid-cols-1 text-sm gap-x-5'>
                        <div className='flex flex-col mb-3 mt-5 space-y-3'>
                            <label htmlFor="nombre" className='text-secondary-100'>Nombre</label>
                            <input type="text" id='nombre'
                                className='w-full placeholder:text-dark-200 rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                placeholder="Ej: Corte Fade"
                                {...register('nombre', {
                                    required: 'Este campo es obligatorio',

                                })}
                            />

                            {errors.nombre && <Errors>{errors.nombre.message as string}</Errors>}

                        </div>

                        <div className='flex flex-col mb-3 mt-5 space-y-3'>
                            <label htmlFor="precio" className='text-secondary-100'>Precio</label>
                            <input type="number" id='precio' min={30} step={10}
                                className='w-full placeholder:text-dark-200 rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                placeholder="Ej: 150"
                                {...register('precio', {
                                    required: 'Este campo es obligatorio',
                                    min: {
                                        value: 30,
                                        message: "Ingresa un precio mayor a 30"
                                    },
                                    valueAsNumber: true
                                })}

                            />

                            {errors.precio && <Errors>{errors.precio.message as string}</Errors>}


                        </div>
                    </div>


                    <input type="submit" className='bg-primary-500 px-4 py-2 rounded text-white hover:bg-primary-600 duration-300 cursor-pointer' value={"Actualizar Servicio"} />

                    {cargando && <Spinner />}

                </form>

            </div>
        </div>
    )
}

export default ActualizarServiciosAdmin