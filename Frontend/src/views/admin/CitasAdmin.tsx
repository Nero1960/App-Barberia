import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import clienteAxios from "../../config/axios";
import ListaCitasAdmin from "../../components/ListaCitasAdmin";
import { CitaConDetalle } from "../../types/Citas";
import getFormattedDate from "../../helpers/FormatDate";
import { toast } from "react-toastify";
import { AiOutlineReload } from "react-icons/ai";
import useBarberos from "../../hooks/useBarberos";



function CitasAdmin() {
    const { barberos } = useBarberos();
    const [citas, setCitas] = useState<CitaConDetalle[]>([]);
    const [citaFillter, setCitaFillter] = useState<CitaConDetalle[]>([]);
    const [citasBarberos, setCitasBarberos] = useState<CitaConDetalle[]>([]);
    const [cargando, setCargando] = useState(false);
    const [query, setQuery] = useState('');
    const [citaEstado, setCitaEstado] = useState<CitaConDetalle[]>([]);
    const [queryCita, setQueryCita] = useState('');
    const [queryBarbero, setQueryBarbero] = useState('')
    const [busqueda, setBusqueda] = useState(false)

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
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data }: { data: CitaConDetalle[] } = await clienteAxios.get('/admin/obtener-citas', config);
                setCitas(data);
            } catch (error) {
                console.log(error);
            }
        };

        obtenerCitas();
    }, [cargando]);

    const actualizarCitaAdmin = () => {
        setCargando((prevState) => !prevState);
    };

    const handleInputChangeBarbero = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQueryBarbero(e.target.value);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleInputChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQueryCita(e.target.value);
    };

    const buscarCita = async () => {
        try {
            const token = localStorage.getItem('token');
            setBusqueda(false)

            if (!token) {
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data }: { data: CitaConDetalle[] } = await clienteAxios.get(`/admin/buscar-cita?fecha=${query}`, config);
            setCitaFillter(data);
            setBusqueda(true)
        } catch (error) {
            console.log(error);
        }
    };

    const buscarCitaEstado = async () => {
        try {
            const token = localStorage.getItem('token');
            setBusqueda(false)

            if (!token) {
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data }: { data: CitaConDetalle[] } = await clienteAxios.get(`/admin/buscar-cita-estado?estado=${queryCita}`, config);
            setCitaEstado(data);
            setBusqueda(true)
        } catch (error) {
            console.log(error);
            setCitaEstado([]);
        }
    };

    const buscarCItaBarbero = async () => {
        try {
            const token = localStorage.getItem('token');
            setBusqueda(false)

            if (!token) {
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data }: { data: CitaConDetalle[] } = await clienteAxios.get(`/admin/buscar-cita-barbero/${queryBarbero}}`, config);
            setCitasBarberos(data);
            setBusqueda(true)
        } catch (error) {
            console.log(error);
            setCitasBarberos([])
        }

    }

    useEffect(() => {
        if (queryBarbero.trim() !== '') {
            buscarCItaBarbero();
        } else {
            setCitasBarberos([])
            setBusqueda(true)
        }

    }, [queryBarbero])

    useEffect(() => {
        if (queryCita.trim() !== '') {
            buscarCitaEstado();
        } else {
            setCitaEstado([]);
            setBusqueda(true)
        }
    }, [queryCita]);

    useEffect(() => {
        if (query.trim() !== '') {
            buscarCita();
        } else {
            setCitaFillter([]);
            setBusqueda(true)

        }
    }, [query]);

    useEffect(() => {
        if (busqueda && query && citaFillter.length === 0) {
            toast.error('No hay citas para esta fecha')
        }

        console.log(citaFillter)

    }, [busqueda]);

    useEffect(() => {
        if (busqueda && queryCita && citaEstado.length === 0) {
            toast.error('No se encontraron citas para este estado');
        }

    }, [busqueda]);


    const determinarCitas = () => {
        if (citaFillter && citaFillter.length > 0) {
            return citaFillter;
        } else if (citaEstado && citaEstado.length > 0) {
            return citaEstado;
        } else if (citasBarberos && citasBarberos.length > 0) {
            return citasBarberos;
        }
        else {
            return citas;
        }
    };

    const resetInputs = () => {

        setQuery('');
        setQueryCita('');
        setQueryBarbero('');
        setCitasBarberos([]);
        setCitaFillter([]);
        setCitaEstado([]);
        
    }

    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />
            CitasAdmin
            <div className="relative overflow-x-auto overflow-y-auto h-[75vh] shadow-md sm:rounded-lg mx-5 mt-10">
                <div className="flex items-center gap-x-4 flex-column flex-wrap md:flex-row space-y-5 md:space-y-0 md:justify-between pb-4 p-5 bg-black-500 w-full">

                    <div className="flex gap-x-3">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="date" className="text-white text-center">Filtrar Cita por Fecha</label>
                            <div className="relative">
                                <input type="date" value={query} id="date" onChange={handleInputChange} className="block p-2 ps-10 text-sm text-white placeholder:text-white rounded-lg w-80 bg-dark-500 focus:ring-blue-500 focus:border-blue-500" min={getFormattedDate()} placeholder="Buscar Citas" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="estado" className="text-white text-center">Filtrar por estado de la cita</label>
                            <div className="relative">
                                <select name="estado" id="estado" className="w-full py-2 px-4 text-sm bg-dark-500 text-white rounded-lg" value={queryCita} onChange={handleInputChangeStatus}>
                                    <option value={''} disabled>Seleccionar</option>
                                    <option value={'pendiente'}>Pendiente</option>
                                    <option value={'finalizado'}>Finalizado</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="date" className="text-white text-center">Filtrar Por Barberos</label>
                            <div className="relative w-full">
                                <select name="estado" id="estado" className="w-full py-2 px-4 text-sm bg-dark-500 text-white rounded-lg" value={queryBarbero} onChange={handleInputChangeBarbero}>
                                    <option value={''} disabled>Seleccionar</option>
                                    {barberos && barberos.length && (
                                        barberos.map(barbero => (
                                            <option key={barbero.idBarberos} value={Number(barbero.idBarberos)}>{barbero.nombre}</option>
                                        ))
                                    )}

                                </select>
                            </div>
                        </div>

                    </div>


                    <div className="">
                        <button type="button" className="bg-blue-500 hover:bg-blue-700 duration-300 text-white rounded-md px-4 py-1 flex gap-x-2 items-center" onClick={resetInputs}><AiOutlineReload />Reset</button>

                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right bg-black-500 text-dark-200">
                    <thead className="text-xs uppercase w-full">
                        <tr>
                            <th scope="col" className="px-6 py-3">Cliente</th>
                            <th scope="col" className="px-6 py-3">Cita</th>
                            <th scope="col" className="px-6 py-3">Estado</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {determinarCitas() && determinarCitas().length > 0 && determinarCitas().map(cita => (
                            <ListaCitasAdmin key={cita.idCitas} cita={cita} actualizarCitaAdmin={actualizarCitaAdmin} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CitasAdmin;
