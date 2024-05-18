import { useEffect, useState } from "react"
import HeaderAdmin from "../../components/HeaderAdmin"
import clienteAxios from "../../config/axios";

import ListaCitasAdmin from "../../components/ListaCitasAdmin";
import { CitaConDetalle } from "../../types/Citas";

type CitasDetails = CitaConDetalle & {
    cliente: {
        nombre: string,
        imagen: string,
        apellido: string
        telefono: string
    }
}
function CitasAdmin() {

    const [citas, setCitas] = useState<CitasDetails[]>([]);
    const [cargando, setCargando] = useState(false)

    useEffect(() => {

        const obtenerCitas = async () => {
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

                const { data } : {data : CitasDetails[]} = await clienteAxios.get('/admin/obtener-citas', config);
                setCitas(data);
                console.log(data)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerCitas();

    }, [cargando])

    const actualizarCitaAdmin = () => {
        setCargando(prevState => !prevState);
    };



    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />
            CitasAdmin

            <div className="relative overflow-x-auto overflow-y-auto h-[75vh] shadow-md sm:rounded-lg mx-5 mt-10">

                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 p-5 bg-black-500 w-full">

                <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input  type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-white placeholder:text-white rounded-lg w-80 bg-dark-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar Citas" />
                    </div>

                </div>

                <table className="w-full text-sm text-left rtl:text-right bg-black-500 text-dark-200">
                    <thead className="text-xs uppercase w-full">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cliente
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cita
                            </th>


                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>

                           
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {citas && citas.length > 0 && (

                            citas.map(cita => (

                                <ListaCitasAdmin
                                    key={cita.idCitas}
                                    cita={cita}
                                    actualizarCitaAdmin={actualizarCitaAdmin}
                                
                                />

                            ))
                        )}

                       
                    
                        




                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default CitasAdmin