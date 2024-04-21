import { Barberos } from '../types/Barberos'
import clienteAxios from '../config/axios';
import { useState } from 'react';

type BarberoType = Pick<Barberos, 'nombre' | 'apellido' | 'especialidad' | 'imagen'>;


function ListaBarberos({ barberoProp }: { barberoProp: Barberos }) {

    const [barbero, setBarbero] = useState<BarberoType>();
    const [modal, setModal] = useState(false);

    const obtenerBarbero = async (idBarberos: number) => {

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

        try {

            const { data } = await clienteAxios.get(`/app/obtener-barbero/${idBarberos}`, config);
            setBarbero(data)
        } catch (error) {
            console.log(error)
        }

        setModal(true);

    }


    return (
        <>
            <div className='bg-dark-500 p-2 mx-2 hover:bg-primary-500 duration-300'>
                <div className='flex flex-col items-center space-y-3 '>
                    <div className=''>
                        <img
                            loading='lazy'
                            src={`${import.meta.env.VITE_BASE_IMAGE}/${barberoProp.imagen}`}
                            alt="imagen personal"
                            className='object-cover h-96' // Ajusta el tamaño deseado aquí
                        />
                    </div>

                    <p className='text-sm font-Heading text-secondary-400 even:text-white'>{barberoProp.nombre} {barberoProp.apellido}</p>
                    <div className='w-full'>
                        <button type='button' onClick={() => obtenerBarbero(barberoProp.idBarberos as number)} className='w-full block even:bg-dark-500 hover:bg-primary-600 duration-300 bg-primary-500 rounded-md text-white cursor-pointer text-center py-1 text-sm'>Ver Info</button>
                    </div>
                </div>
            </div>

            {modal ? (
                <>

                    <div
                        className="modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black-500 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-5">
                                    <h3 className="text-3xl text-secondary-400 font-Heading font-bold">
                                        {barbero?.nombre} {" "} {barbero?.apellido}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setModal(false)}
                                    >
                                        <span className="bg-transparent  h-6 w-6 text-2xl block outline-none focus:outline-none text-primary-500">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-5 flex flex-col md:flex-row items-center justify-center gap-x-5 gap-y-5 md:gap-y-0">
                                    <div className='md:w-1/2'>
                                        <img src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero?.imagen}`} alt="Imagen Barbero"
                                            className='object-cover h-full w-full' />
                                    </div>

                                    <div className='md:w-1/2 text-center'>
                                        <p className='text-secondary-400 text-xl font-Heading'>{barbero?.especialidad}</p>

                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6">
                                    <button
                                        className="text-white bg-primary-500 rounded-lg background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setModal(false)}
                                    >
                                        Cerrar
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>

            ) : null}
        </>

    )
}

export default ListaBarberos