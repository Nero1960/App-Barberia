import Errors from "../../components/Errors";
import HeaderAdmin from "../../components/HeaderAdmin"
import { useForm } from 'react-hook-form'
import { Barberos } from "../../types/Barberos";
import clienteAxios from "../../config/axios";
import { useState } from "react";
import useBarberos from "../../hooks/useBarberos";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

function AgregarBarberoAdmin() {

    const { register, formState: { errors }, handleSubmit } = useForm<Barberos>();
    const [imagen, setImagen] = useState<File | string>();
    const { actualizarBarberos } = useBarberos();
    const [cargando, setCargando] = useState(false);

    const agregarBarbero = async (datos : Barberos) => {

        try {

            const token = localStorage.getItem('token')

            if(!token){
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }

            const formData = new FormData();
            formData.append('nombre', datos.nombre);
            formData.append('apellido', datos.apellido);
            formData.append('email', datos.email);
            formData.append('telefono', datos.telefono);
            formData.append('especialidad', datos.especialidad);
            if(imagen) formData.append('imagen', imagen);
            formData.forEach(form => console.log(form))



            const { data } : {data: {msg: string}}= await clienteAxios.post('/admin/registrar-barbero', formData, config);

            setCargando(true);
            setTimeout(() => {
                setCargando(false);
                toast.success(data.msg);
            }, 3000)

        } catch (error) {
            console.log(error)
        }

        actualizarBarberos();
    }


    const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImagen(files[0]);
        }
    };

    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            <div className="mx-5 my-10">
                <h1 className=" text-white text-xl text-center mb-5 font-Heading font-bold bg-primary-500 px-5 py-2">Nuevo Barbero</h1>
                <form action="/admin/registrar-barbero" onSubmit={handleSubmit(agregarBarbero)} noValidate encType='multipart/form-data' className='space-y-5 bg-black-500 px-10 py-3'>
                    <div className='grid grid-cols-2 text-sm gap-x-5'>
                        <div className='flex flex-col mb-3 mt-5 space-y-3'>
                            <label htmlFor="nombre" className='text-secondary-100'>Nombre</label>
                            <input type="text" id='nombre'
                                className='w-full placeholder:text-dark-200 rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                placeholder="Ej: Carlos"
                                {...register('nombre', {
                                    required: "El nombre es Obligatorio"
                                })}

                            />

                            {errors.nombre && <Errors>{errors.nombre.message as string}</Errors>}
                        </div>

                        <div className='flex flex-col mb-3 mt-5 space-y-3'>
                            <label htmlFor="apellido" className='text-secondary-100'>Apellido</label>
                            <input type="text" id='apellido'
                                className='w-full placeholder:text-dark-200 rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                placeholder="Ej, Lopez"
                                {...register('apellido', {
                                    required: "El apellido es obligatorio"
                                })}

                            />

                            {errors.apellido && <Errors>{errors.apellido.message as string}</Errors>}


                        </div>
                    </div>

                    <div className='grid grid-cols-2 text-sm gap-x-5'>
                        <div className='flex flex-col mb-3 space-y-3'>
                            <label htmlFor="email" className='text-secondary-100'>Email</label>
                            <input type="email" id='email'
                                className='w-full placeholder:text-dark-200 rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                placeholder="correo@correo.com"
                                {...register('email', {
                                    required: 'El email es obligatorio'
                                })}
                            />

                            {errors.email && <Errors>{errors.email.message as string}</Errors>}

                        </div>


                        <div className='flex flex-col mb-3 space-y-3'>
                            <label htmlFor="telefono" className='text-secondary-100'>Teléfono</label>
                            <input type="tel" id='telefono'
                                className='w-full placeholder:text-dark-200 rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                placeholder="78776654"
                                {...register('telefono', {
                                    required: "El telefono es obligatorio"
                                })}

                            />

                            {errors.telefono && <Errors>{errors.telefono.message as string}</Errors>}


                        </div>
                    </div>

                    <div className='mb-6'>

                        <label className="block mb-2 text-sm  text-secondary-100 dark:text-white" htmlFor="imagen">Imagen de Perfil (opcional)</label>
                        <input className="block w-full text-sm  rounded-lg cursor-pointer border border-secondary-100 text-secondary-100 dark:text-gray-400 focus:outline-none file:bg-primary-500 file:border-none file:py-2 file:text-white" id="imagen" name='imagen' type="file" onChange={handleImagenChange}/>


                    </div>


                    <div className='mb-3 text-sm flex flex-col space-y-3'>
                        <label htmlFor="especialidad" className='text-secondary-100'>Especialidad</label>
                        <textarea id="especialidad" className='w-full rounded px-2 py-1 bg-transparent border border-white text-secondary-200 h-56 resize-none' {...register('especialidad', {
                            required: "Este campo es obligatorio"
                        })}></textarea>
                        {errors.especialidad && <Errors>{errors.especialidad.message as string}</Errors>}

                    </div>

                    <input type="submit" className='bg-primary-500 px-4 py-2 rounded text-white hover:bg-primary-600 duration-300 cursor-pointer' value={"Agregar Barbero"} />

                    {cargando && <Spinner/>}


                </form>

            </div>
        </div>
    )
}

export default AgregarBarberoAdmin