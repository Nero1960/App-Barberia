import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth'
import Errors from '../../components/Errors';
import { cliente } from '../../types/cliente';
import { useState } from 'react';
import clienteAxios from '../../config/axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom'




function ActualizarPerfil() {

    const { auth, setAuth } = useAuth();
    console.log(auth)
    const { register, formState: { errors }, handleSubmit } = useForm<cliente>();
    const [imagen, setImagen] = useState<File | string>();
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate();

    const actualizarPerfil = async (datos : cliente)  => {
        console.log('actualizando perfil...');
        console.log(datos.email)

        try {
            const token = localStorage.getItem('token');
            if(!token){
                return null;
            }
            
            const formData = new FormData();
            formData.append('nombre', datos.nombre);
            formData.append('apellido', datos.apellido);
            formData.append('email', datos.email);
            formData.append('telefono', datos.telefono);
            formData.append('direccion', datos.direccion);
            if(imagen) formData.append('imagen', imagen);


            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };


            const { data } = await clienteAxios.put('/app/actualizar-perfil', formData, config);
            setCargando(true)
            setTimeout(() => {
                setCargando(false)
                toast.success(data.msg, {
                    theme: 'colored',
                    position: 'top-left'
                })
                if(!cargando){
                    navigate('/app/perfil')
                }
            }, 3000)

            
            
            setAuth(data.cliente);

        } catch (error : any) {
           
        }
        
    }

    const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImagen(files[0]);
        }
    };

    return (
        <main className='md:max-w-5xl max-w-[90%] bg-dark-600 mb-10 py-5 md:px-6 mx-auto'>

            <div className='p-5 flex flex-col md:flex-row gap-x-10 '>

                <div className='informacion-personal w-full'>
                    <h1 className='text-secondary-100 border-b pb-2 border-b-white'>Actualiza Tus Datos</h1>

                    <form action="/app/actualizar-perfil" onSubmit={handleSubmit(actualizarPerfil)} noValidate encType='multipart/form-data' className='space-y-5'>
                        <div className='grid md:grid-cols-2 text-sm gap-x-5'>
                            <div className='flex flex-col mb-3 mt-5 space-y-3'>
                                <label htmlFor="nombre" className='text-secondary-100'>Nombre</label>
                                <input type="text" id='nombre' defaultValue={auth?.nombre}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                    {...register('nombre', {
                                        required: 'El nombre es requerido'
                                    })}
                                />
                                {errors.nombre && <Errors>{errors.nombre.message as string}</Errors>}
                            </div>

                            <div className='flex flex-col mb-3 mt-5 space-y-3'>
                                <label htmlFor="apellido" className='text-secondary-100'>Apellido</label>
                                <input type="text" id='apellido' defaultValue={auth?.apellido}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                    {...register('apellido', {
                                        required: 'El apellido es requerido'
                                    })}
                                />

                                {errors.apellido && <Errors>{errors.apellido.message as string}</Errors>}

                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 mb-3 text-sm gap-x-3'>
                            <div className='flex flex-col mb-3 space-y-3'>
                                <label htmlFor="email" className='text-secondary-100'>Email</label>
                                <input type="email" id='email' defaultValue={auth?.email}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200' disabled
                                />

                            </div>

                            <input type="hidden" id='hiddenEmail' value={auth?.email} {...register('email')} />

                            <div className='flex flex-col mb-3 space-y-3'>
                                <label htmlFor="telefono" className='text-secondary-100'>Teléfono</label>
                                <input type="tel" id='telefono' defaultValue={auth?.telefono}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200'
                                    {...register('telefono', {
                                        required: 'El telefono es requerido'
                                    })}
                                />
                                {errors.telefono && <Errors>{errors.telefono.message as string}</Errors>}

                            </div>
                        </div>

                        <div className='mb-6'>

                            <label className="block mb-2 text-sm  text-secondary-100 dark:text-white" htmlFor="imagen">Imagen de Perfil (opcional)</label>
                            <input className="block w-full text-sm  rounded-lg cursor-pointer border border-secondary-100 text-secondary-100 dark:text-gray-400 focus:outline-none file:bg-primary-500 file:border-none file:py-2 file:text-white" id="imagen" name='imagen' type="file" onChange={handleImagenChange} />


                        </div>


                        <div className='mb-3 text-sm flex flex-col space-y-3'>
                            <label htmlFor="direccion" className='text-secondary-100'>Dirección (opcional)</label>
                            <textarea id="direccion" className='w-full rounded px-2 py-1 bg-transparent border border-white text-secondary-200 h-56 resize-none' defaultValue={auth?.direccion} {...register('direccion')}></textarea>

                        </div>

                        <input type="submit" className='bg-primary-500 px-4 py-2 rounded text-white hover:bg-primary-600 duration-300 cursor-pointer' value={"Actualizar Perfil"}/>

                        {cargando && <Spinner/>}

                    </form>

                </div>

            </div>

            

        </main>

        
    )
}

export default ActualizarPerfil