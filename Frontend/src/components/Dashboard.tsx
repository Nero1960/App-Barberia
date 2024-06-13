import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { FiUsers, FiUser, FiCalendar, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import { cliente } from "../types/cliente";
import ListaClientesAdmin from "./ListaClientesAdmin";
import { Servicios } from "../types/Servicios";
import ListaServiciosAdmin from "./ListaServiciosAdmin";

function Dashboard() {

    const [totalCliente, setTotalCliente] = useState<number>(0);
    const [totalBarbero, setTotalBarbero] = useState<number>(0);
    const [totalCitas, setTotalCitas] = useState<number>(0);
    const [totalServicio, setTotalServicio] = useState<number>(0);

    const [lastClientes, setLastClientes] = useState<cliente[]>([])
    const [serviciosMasSolicitados, setServiciosMasSolicitados] = useState<Servicios[]>([])

    useEffect(() => {

        const obtenerTotalCliente = async () => {

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
                const { data } = await clienteAxios('/admin/total-cliente', config);
                setTotalCliente(data);
            } catch (error) {
                console.log(error)
            }
        }
        obtenerTotalCliente();

        const obtenerTotalBarbero = async () => {
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
                const { data } = await clienteAxios('/admin/total-barbero', config);
                setTotalBarbero(data);
            } catch (error) {
                console.log(error)
            }

        }

        obtenerTotalBarbero();

        const obtenerCitasPendientes = async () => {
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

                const { data } = await clienteAxios.get('/admin/citas-pendientes', config);
                setTotalCitas(data);
            } catch (error) {
                console.log(error);
                setTotalCitas(0);
            }
        }
        obtenerCitasPendientes();

        const obtenerTotalServicios = async () => {
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

                const { data } = await clienteAxios.get('/admin/obtener-servicio-total', config);
                setTotalServicio(data);
            } catch (error) {
                console.log(error);
                setTotalServicio(0);
            }
        }

        obtenerTotalServicios();

        const obtenerUltimosClientes = async () => {
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

                const { data }: { data: cliente[] } = await clienteAxios.get('/admin/obtener-ultimos-clientes', config);
                setLastClientes(data);
            } catch (error) {
                console.log(error);
                setLastClientes([]);
            }

        }

        obtenerUltimosClientes();

        const obtenerServiciosSolicitados = async () => {
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

                const { data }: { data: Servicios[] } = await clienteAxios.get('/admin/obtener-servicio-solicitado', config);
                setServiciosMasSolicitados(data);
            } catch (error) {
                console.log(error);
                setServiciosMasSolicitados([]);
            }

        }

        obtenerServiciosSolicitados()

    }, [])


    console.log(lastClientes)
    return (
        <div className="md:w-[80%] bg-black-900">

            <HeaderAdmin />

            <div className="relative overflow-x-auto overflow-y-auto h-screen pb-20">

                <section className="cards grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 mx-5 my-10 border-b border-b-gray-300 pb-5">

                    <div className="max-w-sm p-6 bg-black-500 rounded-lg shadow space-y-3">

                        <div className="flex flex-col gap-y-3">
                            <p className="text-5xl text-white"><FiUsers /></p>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex justify-between">Total Clientes <span className="text-2xl text-primary-500">{totalCliente}+</span></h5>
                        </div>


                        <p className="mb-3 font-normal text-dark-200">Actualmente,la barbería cuenta con un total de <span className="text-primary-500 font-bold">{totalCliente}+</span> clientes registrados.</p>

                        <Link className="bg-primary-500 hover:bg-primary-600 duration-300 text-white px-4 py-2 text-sm rounded flex items-center gap-x-2 justify-center" to="/admin/clientes"><FiUsers /> Ver Clientes</Link>

                    </div>

                    <div className="max-w-sm p-6 bg-black-500 rounded-lg shadow space-y-3">

                        <div className="flex flex-col gap-y-3">
                            <p className="text-5xl text-white"><FiUsers /></p>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex justify-between">Total Barberos <span className="text-2xl text-primary-500">{totalBarbero}+</span></h5>
                        </div>


                        <p className="mb-3 font-normal text-dark-200">Actualmente, la Barbería Cuenta con un total de <span className="text-primary-500 font-bold">{totalBarbero}+</span> Profesionales registrados.</p>

                        <Link className="bg-primary-500 hover:bg-primary-600 duration-300 text-white px-4 py-2 text-sm rounded flex items-center gap-x-2 justify-center" to="/admin/barberos"><FiUsers /> Ver Barberos</Link>

                    </div>


                    <div className="max-w-sm p-6 bg-black-500 rounded-lg shadow space-y-3">

                        <div className="flex flex-col gap-y-3">
                            <p className="text-5xl text-white"><FiCalendar /></p>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex justify-between">Citas Pendientes <span className="text-2xl text-primary-500">{totalCitas}+</span></h5>
                        </div>


                        <p className="mb-3 font-normal text-dark-200">Actualmente, la Barbería Tiene <span className="text-primary-500 font-bold">{totalCitas} </span>Citas Pendientes, comienza a administrarlas</p>

                        <Link className="bg-primary-500 hover:bg-primary-600 duration-300 text-white px-4 py-2 text-sm rounded flex items-center gap-x-2 justify-center" to="/admin/citas"><FiCalendar /> Ver Citas</Link>

                    </div>

                    <div className="max-w-sm p-6 bg-black-500 rounded-lg shadow space-y-3">

                        <div className="flex flex-col gap-y-3">
                            <p className="text-5xl text-white"><FiLayers /></p>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex justify-between">Total Servicios <span className="text-2xl text-primary-500">{totalServicio}+</span></h5>
                        </div>


                        <p className="mb-3 font-normal text-dark-200">Actualmente, la Barbería tiene a disposición   <span className="text-primary-500 font-bold">{totalServicio} </span> servicios. Comienza a administrarlos.</p>

                        <Link className="bg-primary-500 hover:bg-primary-600 duration-300 text-white px-4 py-2 text-sm rounded flex items-center gap-x-2 justify-center" to="/admin/servicios"><FiLayers /> Ver Servicios</Link>

                    </div>

                </section>

                <div className="last-customer mx-10 mb-10 border-b border-b-gray-300 pb-5">

                    <h2 className="text-white my-2 text-2xl font-bold">Últimos clientes Registrados</h2>

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

                            {lastClientes && lastClientes.length > 0 && (
                                lastClientes.map(cliente => (
                                    <ListaClientesAdmin
                                        key={cliente.email}
                                        cliente={cliente}
                                    />
                                ))
                            )}


                        </tbody>
                    </table>

                </div>


                <div className="mx-10 mb-10 ">
                    <h2 className="text-white font-bold text-2xl my-3">Servicios Mas Solicitados</h2>

                    <table className="w-full text-sm text-left rtl:text-right bg-black-500 text-dark-200">
                        <thead className="text-xs uppercase w-full">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Precio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {serviciosMasSolicitados && serviciosMasSolicitados.length > 0 && (

                                serviciosMasSolicitados.map(servicio => (
                                    <ListaServiciosAdmin
                                        key={servicio.idServicios}
                                        servicio={servicio}
                                    />
                                ))
                            )}




                        </tbody>
                    </table>

                </div>



            </div>



        </div>
    )
}

export default Dashboard