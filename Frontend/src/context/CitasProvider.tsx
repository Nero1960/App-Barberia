import { createContext, useState, useEffect } from "react";
import { CitaConDetalle } from "../types/Citas";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

type CitasDetails = CitaConDetalle & {
    cliente: {
        nombre: string,
        imagen: string,
        apellido: string
        telefono: string
    }
}[]



type CitasTypeContext = {
    citas: CitasDetails[],
    setCitas: React.Dispatch<React.SetStateAction<CitasDetails[]>>,
    actualizarCitas : () => void
}

const CitasContext = createContext<CitasTypeContext>({ citas: [], setCitas: () => { } , actualizarCitas: () => {}});

const CitasProvider = ({ children }: { children: React.ReactNode }) => {

    const [citas, setCitas] = useState<CitasDetails[]>([]);
    const [cargando, setCargando] = useState(false);
    const { auth } = useAuth();
    


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

                const { data } : {data: CitasDetails[]} = await clienteAxios.get(`app/obtener-citas/${auth?.idClientes}`, config);
                setCitas(data);


            } catch (error) {

                console.log(error);
                setCitas([]);

            }

        }

        obtenerCitas();


    }, [auth?.idClientes, cargando]);


    const actualizarCitas = () => {
        setCargando(prevState => !prevState);
    };



    return (
        <CitasContext.Provider
            value={{
                citas,
                setCitas,
                actualizarCitas,
            }}
        >

            {children}

        </CitasContext.Provider>
    )

}

export {
    CitasProvider
}

export default CitasContext;