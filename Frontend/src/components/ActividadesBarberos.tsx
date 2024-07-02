import useBarberos from "../hooks/useBarberos"
import { GiOfficeChair } from "react-icons/gi";
import { useForm } from 'react-hook-form'
import Errors from "./Errors";
import clienteAxios from "../config/axios";
import { CitaConDetalle } from "../types/Citas";
import { useState } from "react";
import Spinner from "./Spinner";
import { FaCalendar, FaClock, FaSatellite } from "react-icons/fa";
import formatFecha from "../helpers/FormatFecha";
import formatHora from "../helpers/FormatHora";
import formatToCordobas from "../helpers/formatDinero";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import { generatePdfDocument } from "./PdfBarbero";

type DataType = {
    idBarberos: number,
    fecha: Date
}

const ActividadesBarberos = () => {

    const { barberos } = useBarberos();
    const { register, formState: { errors }, handleSubmit, reset } = useForm<DataType>();
    const [barberosQuery, setBarberosQuery] = useState<CitaConDetalle[]>([]);
    const [loading, setLoading] = useState(false);

    const formValidate = async (datos: DataType) => {

        try {
            setLoading(true);

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


            const { data }: { data: CitaConDetalle[] } = await clienteAxios.post('/admin/actividad-barbero', datos, config);
            setBarberosQuery(data)

            if (data.length === 0) {
                toast.error('No hay resultados para esta consulta')
            }


        } catch (error) {
            setBarberosQuery([]);
            console.log(error)
        } finally {
            setLoading(false)
        }


        reset();

    }

    const handleDownload = () => {
        generatePdfDocument({ barberosQuery });
    };
    return (
        <>

            <div className="mt-20 mx-10 p-10  bg-black-500">
                <h2 className="text-white text-3xl text-center font-bold mb-2 flex items-center gap-x-3 justify-center">Sigue las actividades de tus barberos <GiOfficeChair /> </h2>
                <p className="text-dark-200 text-center text-sm w-2/3 mx-auto">Consulta las actividades de tus barberos, y sigue de cerca cada cita que atienden en una fecha en especifico</p>

                <form action="" method="post" onSubmit={handleSubmit(formValidate)} noValidate className="md:max-w-2xl mx-auto mt-10 space-y-5">
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="barbero"
                            className="text-dark-200">
                            Selecciona un barbero
                        </label>
                        <select
                            id="idBarberos"
                            className="p-2 rounded-md bg-dark-500 text-white"

                            {...register('idBarberos', {
                                required: 'Este campo es obligatorio',
                                valueAsNumber: true
                            })}
                        >
                            {barberos.map(barbero => (
                                <option key={barbero.idBarberos} value={barbero.idBarberos}>{barbero.nombre}{" "}{barbero.apellido}</option>
                            ))}
                        </select>

                        {errors.idBarberos && <Errors>{errors.idBarberos.message as string}</Errors>}

                    </div>

                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="fecha"
                            className="text-dark-200">
                            Proporciona la fecha de actividades
                        </label>

                        <input
                            type="date"
                            id="fecha"
                            className="p-2 rounded-md bg-dark-500 text-white"
                            {...register('fecha', {
                                required: 'Este campo es obligatorio'
                            })}
                        />

                        {errors.fecha && <Errors>{errors.fecha.message as string}</Errors>}
                    </div>

                    <input type="submit" value={loading ? 'Consultando' : 'Consultar'} className="bg-primary-500 text-white py-2 px-8 cursor-pointer rounded-md hover:bg-primary-600 duration-300" />

                    {loading && <Spinner />}

                </form>

            </div>

            {barberosQuery && barberosQuery.length > 0 && (

                <>
                    {barberosQuery.map(barbero => (
                        <div className="mt-20 mx-10 p-10   bg-black-500" key={barbero.barbero.email}>
                            <h2 className="text-primary-500 font-black text-2xl text-center">Resumen</h2>

                            <div className="flex mt-10">
                                <div className="md:w-[30%] flex flex-col space-y-2 items-center pe-5 mt-0">
                                    <h3 className="text-white text-left text-xl font-bold mb-5"> Barbero</h3>


                                    <img src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.barbero.imagen}`} alt="imagen barbero" className="rounded-full w-40 h-40 object-cover" />
                                    <div className="space-y-0 mt-2 text-center">
                                        <p className="text-dark-200">{barbero.barbero.nombre}{" "}{barbero.barbero.apellido}</p>
                                        <p className="text-dark-200">{barbero.barbero.email}</p>
                                        <p className="text-dark-200">{barbero.barbero.telefono}</p>

                                    </div>

                                </div>

                                <div className="md:w-[70%] px-5">
                                    <div className="grid grid-cols-2">
                                        <div className="flex justify-center items-center flex-col">
                                            <h3 className="text-white text-left text-xl font-bold mb-5">Información de la cita</h3>

                                            <img src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.cliente.imagen}`} alt="imagen cliente" className="rounded-full w-40 h-40 object-cover" />
                                            <div className="space-y-0 mt-2 text-center">
                                                <p className="text-dark-200">{barbero.cliente.nombre}{" "}{barbero.cliente.apellido}</p>
                                                <p className="text-dark-200">{barbero.cliente.email}</p>
                                                <p className="text-dark-200">{barbero.cliente.telefono}</p>

                                            </div>

                                        </div>

                                        <div className="flex justify-center items-center flex-col">
                                            <div className="space-y-2">
                                                <p className="text-dark-200 flex items-center gap-x-1"><FaCalendar /> Fecha: <span className="text-primary-500 font-black">{formatFecha(barbero.fecha)}</span> </p>
                                                <p className="text-dark-200 flex items-center gap-x-1"><FaClock /> Hora: <span className="text-primary-500 font-black">{formatHora(barbero.hora)}</span> </p>
                                                <p className="text-dark-200 flex items-center gap-x-1"><FaSatellite /> Estado: <span className="text-primary-500 font-black">{barbero.estado}</span> </p>

                                            </div>


                                        </div>

                                    </div>

                                    <div className="servicios mt-10 px-5">
                                        <h3 className="text-white text-left text-xl font-bold mb-5">Servicios Atendidos</h3>
                                        {barbero.servicios.map(servicio => (
                                            <div key={servicio.nombre} className="flex justify-between items-center text-dark-200 space-y-3">
                                                <p className="mt-2">{servicio.nombre}</p>
                                                <p className="text-primary-500 font-bold">{formatToCordobas(servicio.CitasServicios.precioActual)}</p>
                                            </div>


                                        ))}

                                        <div className="flex justify-between  items-center text-dark-200 space-y-3">
                                            <p className="">Total</p>
                                            <p className="text-primary-500 font-bold text-xl">{formatToCordobas(barbero.servicios.reduce((total, precio) => total + precio.CitasServicios.precioActual, 0))}</p>
                                        </div>

                                    </div>

                                </div>

                            </div>


                        </div>
                    ))}

                    <div className="mx-10 mt-5">
                        <button onClick={handleDownload} className="text-white bg-blue-500 px-5 py-2 rounded flex items-center gap-x-2"><FiDownload />Reporte Barbero PDF</button>
                    </div>

                    {/* <PDFViewer className="h-screen w-screen">
                        <PdfBarbero
                            barberos={barberosQuery}
                        />
                    </PDFViewer> */}

                </>
            )}





        </>
    )
}

export default ActividadesBarberos


