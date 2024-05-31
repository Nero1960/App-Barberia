import { useEffect, useState } from "react"
import HeaderAdmin from "../../components/HeaderAdmin"
import clienteAxios from "../../config/axios";
import ListaCitasAdmin from "../../components/ListaCitasAdmin";
import { CitaConDetalle } from "../../types/Citas";
import getFormattedDate from "../../helpers/FormatDate";


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
    const [citaFillter, setCitaFillter] = useState<CitasDetails[]>([])
    const [cargando, setCargando] = useState(false)
    const [query, setQuery] = useState('');

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

                const { data }: { data: CitasDetails[] } = await clienteAxios.get('/admin/obtener-citas', config);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const buscarCita = async () => {
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

            const { data }: { data: CitasDetails[] } = await clienteAxios.get(`/admin/buscar-cita?fecha=${query}`, config);
            setCitaFillter(data)
            console.log(data);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (query.trim() !== '') {
            buscarCita();
        } else {
            setCitaFillter([]);
        }
    }, [query]); // Se ejecutará buscarClientes cada vez que query cambie




    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />
            CitasAdmin

            <div className="relative overflow-x-auto overflow-y-auto h-[75vh] shadow-md sm:rounded-lg mx-5 mt-10">

                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 p-5 bg-black-500 w-full">

                    <label htmlFor="date" className="sr-only">Filtrar Por Fecha</label>
                    <div className="relative">
                        <input type="date" id="date" onChange={handleInputChange} className="block p-2 ps-10 text-sm text-white placeholder:text-white rounded-lg w-80 bg-dark-500 focus:ring-blue-500 focus:border-blue-500" min={getFormattedDate()} placeholder="Buscar Citas" />
                    </div>

                    {query && citaFillter.length === 0 && (
                        <span className="text-red-600 border border-red-500 bg-red-100 px-5 py-2 text-center">No hay citas en esta fecha</span>
                        
                    )}

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

                        {citaFillter && citaFillter.length > 0 ? (

                            citaFillter.map(cita => (
                                <ListaCitasAdmin
                                    key={cita.idCitas}
                                    cita={cita}
                                    actualizarCitaAdmin={actualizarCitaAdmin}
                                />

                            ))
                        ) : (
                            citas.map((cita => (
                                <ListaCitasAdmin
                                    key={cita.idCitas}
                                    cita={cita}
                                    actualizarCitaAdmin={actualizarCitaAdmin}
                                />
                            )))
                        )}


                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default CitasAdmin