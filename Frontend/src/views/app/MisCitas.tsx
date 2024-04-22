import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import clienteAxios from "../../config/axios";
import formatToCordobas from "../../helpers/formatDinero";
import formatFecha from "../../helpers/FormatFecha";
import formatHora from "../../helpers/FormatHora";
import logo from '../../public/logo2.png'


type CitaConDetalle = {
    barbero: {
        nombre: string;
        apellido: string;
    };
    fecha: string;
    hora: string;
    idCitas: number
    servicios: {
        nombre: string;
        precio: number;
    }[];
};


function MisCitas() {

    const params = useParams();
    const idClientes = Number(params.idClientes);

    const [infoCita, setInfoCita] = useState<CitaConDetalle[]>([]);
    console.log(idClientes);

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

                const { data } = await clienteAxios.get(`app/obtener-cita/${idClientes}`, config);
                setInfoCita(data);

            } catch (error) {
                console.log(error)
                setInfoCita([]);
            }

        }

        obtenerCitas();

    }, [])


    return (
        <>

            <main className={`${infoCita.length === 0 ? 'h-screen' : 'h-full'} w-[90%] md:my-10 md:max-w-[70%] mx-auto`}>

                {infoCita.length > 0 ?

                    <>

                        <h1 className="text-secondary-400 text-5xl font-Heading text-center">Mis Citas</h1>

                        {infoCita.map(cita => (

                            <div className="bg-dark-500 grid md:grid-cols-2 my-10 " key={cita.idCitas}>

                                <div className="flex flex-col gap-y-5 p-10 rounded">
                                    <p className="font-black text-secondary-400 text-2xl font-Heading">Fecha: <span className="font-thin text-xl text-secondary-200">{formatFecha(cita.fecha)}</span></p>
                                    <p className="font-black text-secondary-400 text-2xl font-Heading">Hora: <span className="font-thin text-xl text-secondary-200">{formatHora(cita.hora)}</span></p>

                                    <p className="font-black text-secondary-400 text-2xl font-Heading">Servicios: </p>
                                    {cita.servicios.map(servicio => (

                                        <ul className="text-secondary-400 font-Heading" key={servicio.nombre}>
                                            <li className="flex  items-center gap-x-5 list-inside text-secondary-400">
                                                <p><span className="font-black text-xl text-secondary-200">{servicio.nombre}</span></p>
                                                <p><span className="font-black text-xl text-secondary-200">{formatToCordobas(servicio.precio)}</span></p>
                                            </li>

                                        </ul>

                                    ))}

                                    <p className="font-black text-secondary-400 text-2xl font-Heading">Barbero: <span className="font-thin text-xl text-secondary-200">{cita.barbero.nombre} {" "} {cita.barbero.apellido}</span></p>

                                    <p className="font-black text-secondary-400 text-2xl font-Heading">Total a Pagar: <span className="text-secondary-200 text-2xl">{formatToCordobas(cita.servicios.reduce((total, servicio) => total + servicio.precio, 0))}</span> </p>

                                    <div className="flex gap-x-4">

                                        <button type="button" className="mt-5 bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600 duration-300">Actualizar Cita</button>

                                    </div>

                                </div>

                                <div className="flex justify-center items-center">

                                    <img src={logo} alt="Logotipo" width={250} height={250} />

                                </div>

                            </div>

                        ))}

                    </>

                    : <>

                        <h1 className="text-secondary-400 text-5xl font-Heading text-center">No tienes Citas, Comienza Reservando</h1>
                        <img className="mx-auto" src={logo} alt="Logotipo" width={200} height={200} />

                    </>

                }

            </main>


        </>
    )
}

export default MisCitas