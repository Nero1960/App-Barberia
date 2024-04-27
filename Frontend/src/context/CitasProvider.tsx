import { createContext, useState, useEffect } from "react";
import { CitaConDetalle } from "../types/Citas";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

type CitasType = CitaConDetalle[];

type CitasTypeContext = {
    citas: CitasType,
    setCitas: React.Dispatch<React.SetStateAction<CitasType>>,
}

const CitasContext = createContext<CitasTypeContext>({ citas: [], setCitas: () => { } });

const CitasProvider = ({ children }: { children: React.ReactNode }) => {

    const [citas, setCitas] = useState<CitasType>([]);
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

                const { data } = await clienteAxios.get(`app/obtener-cita/${auth?.idClientes}`, config);
                setCitas(data);


            } catch (error) {

                console.log(error);
                setCitas([]);

            }

        }

        obtenerCitas();

    }, [citas, setCitas, auth?.token]);



    return (
        <CitasContext.Provider
            value={{
                citas,
                setCitas,
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