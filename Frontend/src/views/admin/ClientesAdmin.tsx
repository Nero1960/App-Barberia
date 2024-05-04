import { useEffect, useState } from 'react'
import ListaClientesAdmin from '../../components/ListaClientesAdmin';
import HeaderAdmin from "../../components/HeaderAdmin"
import clienteAxios from '../../config/axios';
import { cliente } from '../../types/cliente';

function ClientesAdmin() {

    const [clientes, setClientes] = useState<cliente[] | []>();
    const [clientesFillter, setClientesFillter] = useState<cliente[] | []>([]);
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }


    const buscarClientes = async () => {

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

            const { data } = await clienteAxios.get(`/admin/buscar-clientes?nombre=${query}`, config);
            setClientesFillter(data);


        } catch (error) {
            console.log(error);
            setClientesFillter([]);
        }

    }

    useEffect(() => {
        if (query.trim() !== '') {
            buscarClientes();
        } else {
            setClientesFillter([]);
        }
    }, [query]); // Se ejecutará buscarClientes cada vez que query cambie



    useEffect(() => {

        const obtenerClientes = async () => {

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

                const { data }: { data: cliente[] | [] } = await clienteAxios.get('/admin/obtener-clientes', config);
                setClientes(data);
            } catch (error) {
                console.log(error);
                setClientes([])
            }

        }

        obtenerClientes();

    }, [])

    console.log(clientesFillter)



    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            <div className="relative overflow-x-auto overflow-y-auto h-[75vh] shadow-md sm:rounded-lg mx-5 mt-10">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 p-5 bg-black-500 w-full">

                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={handleInputChange} type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-white placeholder:text-white rounded-lg w-80 bg-dark-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar Cliente por Nombre" />
                    </div>

                    {query && clientesFillter.length === 0 && (<span className='bg-red-500 text-center text-white uppercase px-5 py-2 rounded-lg' >No Hay resultados</span>)}
                </div>

                <table className="w-full text-sm text-left rtl:text-right bg-black-500 text-dark-200">
                    <thead className="text-xs uppercase w-full">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Teléfono
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dirección
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {clientesFillter && clientesFillter.length > 0 ? (
                            clientesFillter.map(cliente => (
                                <ListaClientesAdmin
                                    key={cliente.email}
                                    cliente={cliente}
                                />

                            ))
                        ) : (

                            clientes?.map(cliente => (

                                <ListaClientesAdmin
                                    key={cliente.email}
                                    cliente={cliente}
                                />


                            ))
                        )}


                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ClientesAdmin