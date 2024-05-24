import { useForm } from 'react-hook-form' 
import { IoMdAdd } from "react-icons/io";
import useTestimonial from '../../hooks/useTestimoniales';
import Errors from '../../components/Errors';
import { TestimonialType } from '../../types/Testimoniales';
import useAuth from '../../hooks/useAuth';
import clienteAxios from '../../config/axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';


const AgregarTestimonial = () => {
    const { register, formState: {errors}, handleSubmit, reset } = useForm<TestimonialType>();
    const [cargando, setCaragando] = useState(false)
    const {auth} = useAuth();
    const { actualizarTestimoniales } = useTestimonial();
    console.log(auth?.idClientes)
    let fecha = JSON.stringify(new Date());

    const addTestimonial = async (datos: TestimonialType) => {
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


            const { data } : { data : {msg: string, testimonial: TestimonialType}}= await clienteAxios.post('app/agregar-testimonial', datos, config);

            setCaragando(true);
            setTimeout(() => {
                setCaragando(false)
                toast.success(data.msg);
                reset({
                    titulo: '',
                    mensaje: ''
                });
            }, 3000)

            
        } catch (error) {
            console.log(error)
        }

        actualizarTestimoniales();

    }

    return (
        <main className="md:max-w-5xl max-w-[90%] mb-10 py-5 md:px-6 mx-auto">

            <h1 className='text-secondary-300 md:w-[80%] mx-auto font-Heading md:leading-snug text-2xl md:text-4xl text-center pb-2  border-b-white mb-10'>¿Cómo fue tu experiencia con nuestro servicio? ¡Déjanos tu testimonio y comparte tu opinión!</h1>

            <div className='p-5 flex flex-col md:flex-row gap-x-10 bg-dark-600'>

                <div className='w-full'>

                    <h2 className='text-secondary-100 border-b pb-2 border-b-white'>Testimonial</h2>

                    <form action="/app/agregar-testimonial" onSubmit={handleSubmit(addTestimonial)} noValidate className='space-y-5'>
                        <div className='text-sm gap-x-5'>
                            <div className='flex flex-col mb-3 mt-5 space-y-3'>
                                <label htmlFor="titulo" className='text-secondary-100'>Titulo</label>
                                <input type="text" id='titulo'
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200 placeholder:text-white'
                                    {...register('titulo', {
                                        required: 'Este campo es requerido'
                                    })}
                                />
                            </div>
                            {errors.titulo && <Errors>{errors.titulo.message as string}</Errors>}
                        </div>

                        <input type="hidden" id='idClientes' value={auth?.idClientes} {...register('idClientes', {
                            valueAsNumber: true
                        })} />

                        <input type="hidden" id='fecha' value={fecha.substring(1,11)} {...register('fecha')} />


                        <div className='mb-3 text-sm flex flex-col space-y-3'>
                            <label htmlFor="mensaje" className='text-secondary-100'>Testimonial</label>
                            <textarea id="mensaje" className='w-full rounded px-2 py-1 bg-transparent border border-white text-secondary-200 h-56 resize-none' 
                            {...register('mensaje', {
                                required: 'Este campo es obligatorio',
                                minLength: {
                                    value: 10,
                                    message: 'Debe contener mínimo 10 caracteres'
                                }

                            })}
                            ></textarea>

                            {errors.mensaje && <Errors>{errors.mensaje.message as string}</Errors>}
                        </div>

                        <button type="submit" className="bg-primary-500 hover:bg-primary-600 duration-300 text-white flex gap-x-1 p-2 items-center"><IoMdAdd />Testimonial</button>

                        {cargando && <Spinner/>}


                    </form>

                </div>

            </div>

        </main>
    )
}

export default AgregarTestimonial