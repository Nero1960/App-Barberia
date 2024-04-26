import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import pencilSquare from '../../public/Icons/PencilSquare.svg'


function MiPerfil() {

    const { auth } = useAuth();
    console.log(auth);
    console.log(auth?.telefono)
    console.log(auth?.imagen)

    return (
        <main className='max-w-[90%] md:max-w-[80%] bg-dark-500 mb-10 py-5 mx-auto'>

            <div className='p-5 flex flex-col md:flex-row gap-x-10'>
                <aside className='imagen-perfil md:w-[20%]'>

                    <div className='flex flex-col items-center mb-10 md:mb-0'>
                        <img src={`${import.meta.env.VITE_BASE_IMAGE}/${auth?.imagen}`} alt="imagen"
                            className='rounded-full mx-auto h-[80%] w-[80%]'
                        />
                    </div>

                </aside>

                <div className='informacion-personal md:w-[80%]'>
                    <h1 className='text-secondary-100 border-b pb-2 border-b-white'>Información Personal</h1>

                    <form action="" className='space-y-3'>
                        <div className='grid grid-cols-2 text-sm gap-x-5'>
                            <div className='flex flex-col mb-3 mt-5 space-y-3'>
                                <label htmlFor="nombre" className='text-secondary-100'>Nombre</label>
                                <input type="text" id='nombre' defaultValue={auth?.nombre}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200' disabled
                                />
                            </div>

                            <div className='flex flex-col mb-3 mt-5 space-y-3'>
                                <label htmlFor="apellido" className='text-secondary-100'>Apellido</label>
                                <input type="text" id='apellido' defaultValue={auth?.apellido}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200' disabled
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 text-sm gap-x-5'>
                            <div className='flex flex-col mb-3 space-y-3'>
                                <label htmlFor="email" className='text-secondary-100'>Email</label>
                                <input type="email" id='email' defaultValue={auth?.email}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200' disabled
                                />
                            </div>

                            <div className='flex flex-col mb-3 space-y-3'>
                                <label htmlFor="telefono" className='text-secondary-100'>Teléfono</label>
                                <input type="tel" id='telefono' defaultValue={auth?.telefono}
                                    className='w-full rounded px-2 py-2 bg-transparent border border-white text-secondary-200' disabled
                                />
                            </div>
                        </div>


                        <div className='mb-3 text-sm flex flex-col'>
                            <label htmlFor="direccion" className='text-secondary-100'>Dirección</label>
                            <textarea id="direccion" className='w-full rounded px-2 py-1 bg-transparent border border-white text-secondary-200 h-56' defaultValue={auth?.direccion} disabled></textarea>

                        </div>


                        <div className='inline-block'>
                            <Link to={'/app/actualizar-perfil'} className='bg-primary-500 py-2 px-5 gap-x-2 rounded flex justify-start mt-5 bg-primary-500 hover:bg-primary-600 duration-300'>
                                <img src={pencilSquare} alt="icono actualizar" width={18} height={18} />
                                <span className='text-sm text-white'>Edit</span>

                            </Link>
                        </div>


                    </form>

                </div>

            </div>

            

        </main>
    )
}

export default MiPerfil