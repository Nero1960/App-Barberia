import { Barberos } from '../types/Barberos'
import clienteAxios from '../config/axios';
import { useState } from 'react';

type BarberoType = Pick<Barberos, 'nombre' | 'apellido' | 'especialidad' | 'imagen'> | {};


function ListaBarberos({ barberoProp }: { barberoProp: Barberos }) {

    const [barbero, setBarbero] = useState<BarberoType>({});

    const obtenerBarbero = async (idBarberos : number) =>   {

        const token = localStorage.getItem('token');
        if(!token){
            return;
        }

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        }

        try {
            
            const {data} = await clienteAxios.get(`/app/obtener-barbero/${idBarberos}`, config);
            setBarbero(data)
            console.log(data)
        } catch (error) {
            console.log(error)
            setBarbero({})
        }

    }




    return (
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
                    <button type='button' onClick={() => obtenerBarbero(barberoProp.idBarberos as number)}  className='w-full block even:bg-dark-500 hover:bg-primary-600 duration-300 bg-primary-500 rounded-md text-white cursor-pointer text-center py-1 text-sm'>Ver Info</button>
                </div>
            </div>
        </div>

    )
}

export default ListaBarberos