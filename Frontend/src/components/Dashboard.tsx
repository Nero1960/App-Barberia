import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { FiUsers, FiUser, FiCalendar, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

function Dashboard() {

    const [totalCliente, setTotalCliente] = useState<number>(0);
    const [totalBarbero, setTotalBarbero] = useState<number>(0);
    const [totalCitas, setTotalCitas] = useState<number>(0);
    const [totalServicio, setTotalServicio] = useState<number>(0);

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

    }, [])


    console.log(totalCitas)
    return (
        <div className="md:w-[80%] bg-black-900">

            <HeaderAdmin/>

            <section className="cards grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 mx-5 my-10">


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

        </div>
    )
}

export default Dashboard