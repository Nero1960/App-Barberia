import { useEffect, useState } from "react"
import clienteAxios from "../../config/axios";
import formatToCordobas from "../../helpers/formatDinero";
import formatFecha from "../../helpers/FormatFecha";
import formatHora from "../../helpers/FormatHora";
import logo from '../../public/logo2.png'
import useCitas from "../../hooks/useCitas";
import { toast } from "react-toastify";


function MisCitas() {

   const { citas , actualizarCitas} = useCitas();

   useEffect(() => {
        actualizarCitas();
   }, [])

   const eliminarCita = async (idCitas: number) => {

       try {

           console.log('eliminando Cita', idCitas)

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

           const { data } : any  = await clienteAxios.delete(`app/eliminar-cita/${idCitas}`, config);
           toast.success(data.msg, {
            theme: 'colored',
            position: 'top-left',
            autoClose: false
           })
       } catch (error : any) {
           console.log(error)
           toast.error(error.response.data.msg, {
            theme: 'colored',
            position: 'top-left',
            autoClose: false
           })
       }
       

       actualizarCitas();

   }


    return (
        <>

            <main className={`${citas.length === 0 ? 'h-screen' : 'h-full'} max-w-[90%] md:my-10 md:max-w-3xl mx-auto`}>

                {citas.length > 0 ?

                    <>

                        <h1 className="text-secondary-400 text-5xl font-Heading text-center">Mis Citas</h1>

                        {citas.map(cita => (

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

                                        <button type="button" className="mt-5 bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600 duration-300">Actualizar</button>

                                        <button type="button" onClick={() => eliminarCita(cita.idCitas as number)} className="mt-5 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 duration-300">Eliminar</button>


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