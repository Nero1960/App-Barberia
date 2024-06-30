import { MdAttachMoney } from "react-icons/md"
import { useEffect, useState } from "react"
import clienteAxios from "../config/axios";
import formatFecha from "../helpers/FormatFecha";
import formatToCordobas from "../helpers/formatDinero";
import { LuActivitySquare } from "react-icons/lu";
import { generatePDF } from "./PdfDay";
import { FiDownload } from "react-icons/fi";

type TotalCitasIngresosType = {
    totalCitasDia: number,
    ingresos: number
}

type IngresosBarberosType = {
    idBarberos: number,
    nombre: string,
    apellido: string,
    imagen: string,
    telefono: string,
    email: string,
    citas_atendidas: number,
    ingresos_generados: number
}

const IngresosDias = () => {

    const [queryFecha, setQueryFecha] = useState('');
    const [totalCitasIngresos, setTotalCitasIngresos] = useState<TotalCitasIngresosType>({} as TotalCitasIngresosType);
    const [barberos, setBarberos] = useState<IngresosBarberosType[]>([]);



    useEffect(() => {

        if (queryFecha.trim() !== '') {
            resultadoIngresos();
            resultadoIngresosBarberos();
        }

    }, [queryFecha]);

    const resultadoIngresos = async () => {


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

            const { data }: { data: TotalCitasIngresosType } = await clienteAxios.get(`/admin//ingresos-citas-dia/?fecha=${queryFecha}`, config);

            console.log(data);
            setTotalCitasIngresos({
                totalCitasDia: data.totalCitasDia,
                ingresos: data.ingresos
            });



        } catch (error) {
            console.log(error)
        }

    }

    const resultadoIngresosBarberos = async () => {
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

            const { data }: { data: IngresosBarberosType[] } = await clienteAxios.get(`/admin//ingresos-perBarberosDia?fecha=${queryFecha}`, config);
            console.log(data)
            setBarberos(data)



        } catch (error) {
            console.log(error)
        }
    }

    const ingresos = totalCitasIngresos.ingresos;
    const totalCitas = totalCitasIngresos.totalCitasDia;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryFecha(e.target.value)
    }

    const handleDownload = () => {
        generatePDF({ queryFecha, ingresos, barberos, totalCitas });
    };


    return (
        <>

            <section className="border-t border-t-white pt-5 mt-10 mx-10 bg-black-500 p-5">

                <h2 className="text-white text-2xl font-bold flex gap-x-2 items-center">Total de ingresos por Día <span className="text-5xl text-blue-500 font-bold"><MdAttachMoney /></span> </h2>

                <label htmlFor="day">Selecciona una fecha</label>
                <input type="date" id="day" className="block w-full p-1 rounded-lg bg-dark-500 text-white" onChange={handleInputChange} />

                {queryFecha ? (
                    <>

                        <div className="text-white flex flex-col justify-center items-center p-10 space-y-5">
                            <p className="text-dark-200">Total de Citas el dia {formatFecha(queryFecha)}<span className="text-primary-500 font-black text-2xl">{" "}{totalCitasIngresos.totalCitasDia}</span></p>
                            <p className="text-dark-200">Ingresos de citas en el dia seleccionado : <span className="text-primary-500 font-black text-2xl">{formatToCordobas(totalCitasIngresos.ingresos)}</span> </p>
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

                                    {barberos && barberos.length > 0 && (
                                        barberos.map(barbero => (

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

                        <div className="">
                            <button onClick={handleDownload} className="text-white bg-blue-500 px-5 py-2 rounded flex items-center gap-x-2"><FiDownload /> Ingresos Dias PDF</button>
                        </div>

                    </>
                ) : (
                    <h2 className="text-center mt-10 text-white font-semibold text-2xl">Selecciona una fecha y aparecerán los resultados</h2>
                )}



            </section>

        </>
    )
}

export default IngresosDias