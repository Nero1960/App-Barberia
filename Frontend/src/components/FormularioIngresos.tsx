import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import formatToCordobas from "../helpers/formatDinero";
import { MdAttachMoney } from "react-icons/md";
import { RiUserStarFill } from "react-icons/ri";
import { LuActivitySquare } from "react-icons/lu";
import  PDFReport, { generatePDF } from "./Pdf";
import { FiDownload } from "react-icons/fi";
import { PDFViewer } from "@react-pdf/renderer";


type ActividadBarbero = {

    idBarberos: number,
    ingresos_generados: number,
    citas_atendidas: number,
    nombre: string,
    apellido: string,
    imagen: string,
    telefono: string,
    email: string
}

type clientesFrecuentesType = {
    numCitas: number,
    idClientes: number,
    cliente: {
        nombre: string,
        apellido: string,
        email: string,
        telefono: string,
        imagen: string,
        direccion: string
    }
}

const FormularioIngresos = () => {

    const [queryMes, setQueryMes] = useState<number>(new Date().getMonth() + 1);
    const [queryYear, setQueryYear] = useState<number>(new Date().getFullYear())
    const [mes, setMes] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [actividad, setActividad] = useState<ActividadBarbero[]>([])
    const [clientes, setClientes] = useState<clientesFrecuentesType[]>([])

    const handleDownload = () => {
        generatePDF({ queryMes, queryYear, meses, years, actividad, total, clientes, mes });
    };


    const handleInputChangeMes = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQueryMes(Number(e.target.value))
    }

    const handleInputChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQueryYear(Number(e.target.value))
    }

    useEffect(() => {

        obtenerIngresosMes()
        actividadBarberos()



    }, [queryMes, queryYear])

    const actividadBarberos = async () => {

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

            const { data }: { data: ActividadBarbero[] } = await clienteAxios.get(`/admin/ingresos-perBarberos?mes=${queryMes}&year=${queryYear}`, config);
            setActividad(data)

        } catch (error) {
            console.log(error)
            setActividad([])

        }

    }

    const obtenerIngresosMes = async () => {

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

            const { data }: { data: { totalCitas: number, ingresos: number } } = await clienteAxios.get(`/admin/ingresos-citas-mes?mes=${queryMes}&year=${queryYear}`, config);

            setMes(data.totalCitas)
            setTotal(data.ingresos)


        } catch (error) {
            console.log(error)

        }

    }

    useEffect(() => {

        const clientesFrecuentes = async () => {

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

                const { data }: { data: clientesFrecuentesType[] } = await clienteAxios.get('/admin/clientes-frecuentes', config);

                setClientes(data)

            } catch (error) {
                console.log(error)

            }

        }

        clientesFrecuentes();


    }, [])

    const meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const yearMax = new Date().getFullYear();
    const yearMin = yearMax - 4;

    // Crear un arreglo de años
    const years: number[] = [];
    for (let year = yearMax; year >= yearMin; year--) {
        years.push(year);
    }





    return (
        <>
            <section className="mx-10 mb-10 bg-black-500 p-5">
                <h2 className="text-white text-2xl font-bold flex gap-x-2 items-center">Total de ingresos por Mes <span className="text-5xl text-green-500 font-bold"><MdAttachMoney /></span> </h2>

                <form action="" className="w-full bg-black-500 p-5">

                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="mes" className="text-black-100 font-bold text-xl">Mes</label>
                            <select name="mes" id="mes" defaultValue={queryMes} className="px-2 py-1 rounded-md bg-dark-500 text-white" onChange={handleInputChangeMes} >
                                {meses.map((mes, index) => (
                                    <option key={mes} value={index + 1}>{mes}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="year" className="text-black-100 font-bold text-xl">Año</label>
                            <select name="year" value={queryYear} id="year" className="px-2 py-1 rounded-md bg-dark-500 text-white" onChange={handleInputChangeYear}>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                </form>


                <div className="text-white flex flex-col justify-center items-center p-10 space-y-5">
                    <p className="text-dark-200">Total de Citas en el mes de {meses[queryMes - 1]} {" "}<span className="text-primary-500 font-black text-2xl">{mes}</span></p>
                    <p className="text-dark-200">Ingresos Totales por Citas : <span className="text-primary-500 font-black text-2xl">{formatToCordobas(total)}</span> </p>
                </div>


                <div className="my-10">
                    <h2 className="text-white text-2xl font-bold mb-5 flex items-center gap-x-2">Reporte de Ingresos y Actividades por Barbero <span className="text-2xl text-primary-500 font-bold"> <LuActivitySquare /></span></h2>
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
                                    Ingresos
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Citas
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {actividad && actividad.length > 0 && (
                                actividad.map(barbero => (

                                    <tr className="bg-black-500 border-b border-b-dark-500 hover:bg-dark-500" key={barbero.idBarberos}>

                                        <th scope="row" className="flex items-center px-6 py-4 text-dark-200 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.imagen}`} />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{barbero.nombre}{" "}{barbero.apellido}</div>
                                                <div className="font-normal text-dark-200">{barbero.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {barbero.telefono}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatToCordobas(barbero.ingresos_generados)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {barbero.citas_atendidas}
                                        </td>

                                    </tr>
                                ))
                            )}


                        </tbody>
                    </table>
                </div>

                <div className="my-10">
                    <h2 className="text-white text-2xl font-bold mb-5 flex items-center gap-x-2">Clientes Frecuentes <span className="text-primary-500 text-2xl font-bold"><RiUserStarFill /></span> </h2>
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
                                    Numero de Citas
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {clientes && clientes.length > 0 && (
                                clientes.map(clientes => (

                                    <tr className="bg-black-500 border-b border-b-dark-500 hover:bg-dark-500" key={clientes.idClientes}>

                                        <th scope="row" className="flex items-center px-6 py-4 text-dark-200 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_BASE_IMAGE}/${clientes.cliente.imagen}`} />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{clientes.cliente.nombre}{" "}{clientes.cliente.apellido}</div>
                                                <div className="font-normal text-dark-200">{clientes.cliente.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {clientes.cliente.telefono}
                                        </td>
                                        <td className="px-6 py-4">
                                            {clientes.cliente.direccion}
                                        </td>
                                        <td className="px-6 py-4">
                                            {clientes.numCitas}
                                        </td>

                                    </tr>
                                ))
                            )}


                        </tbody>
                    </table>
                </div>

                <div className="">
                    <button onClick={handleDownload} className="text-white bg-blue-500 px-5 py-2 rounded flex items-center gap-x-2"><FiDownload/> Ingresos Mes PDF</button>
                </div>

            </section>

            {/* <PDFViewer className="h-screen w-screen">
                <PDFReport
                    queryMes={queryMes}
                    queryYear={queryYear}
                    meses={meses}
                    years={years}
                    actividad={actividad}
                    total={total}
                    clientes={clientes}
                    mes={mes}
                />
            </PDFViewer>  */}

        </>


    )
}

export default FormularioIngresos