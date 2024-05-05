import { useForm } from "react-hook-form"
import HeaderAdmin from "../../components/HeaderAdmin"
import Errors from "../../components/Errors";
import { Servicios } from "../../types/Servicios";
import clienteAxios from "../../config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import useServicios from "../../hooks/useServicios";
import { useNavigate } from "react-router-dom";

function AgregarServicioAdmin() {
    const { register, formState: { errors }, handleSubmit } = useForm<Servicios>();
    const [cargando, setCargando] = useState(false);
    const { actualizarServicios } = useServicios();
    const navigate = useNavigate();

    const agregarServicio = async (datos: Servicios) => {
       try {
         console.log('Agregando Servicio..', datos)
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

         const { data } : {data : {msg: string}} = await clienteAxios.post('/admin/registrar-servicio', datos, config);

         setCargando(true);
         setTimeout(() => {
            toast.success(data.msg, {autoClose: false});
            setCargando(false);
            navigate('/admin/servicios')

         }, 3000)

         
       } catch (error) {
        console.log(error)
        
       }

       actualizarServicios();
    }
    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            <div className="mx-5 my-10">
                <h1 className=" text-white text-xl text-center mb-5 font-Heading font-bold bg-primary-500 px-5 py-2">Nuevo Servicio</h1>
                <form action="/admin/agregar-servicio" method="post" noValidate className='space-y-5 bg-black-500 px-10 py-3' onSubmit={handleSubmit(agregarServicio)}>
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


                    <input type="submit" className='bg-primary-500 px-4 py-2 rounded text-white hover:bg-primary-600 duration-300 cursor-pointer' value={"Agregar  Servicio"} />

                    {cargando && <Spinner/>}

                </form>

            </div>
        </div>
    )
}

export default AgregarServicioAdmin