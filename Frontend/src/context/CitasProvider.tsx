import { createContext, useState, useEffect } from "react";
import { CitaConDetalle } from "../types/Citas";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
type CitasType = CitaConDetalle[];


type CitasTypeContext = {
    citas: CitasType,
    setCitas: React.Dispatch<React.SetStateAction<CitasType>>,
    actualizarCitas : () => void
}

const CitasContext = createContext<CitasTypeContext>({ citas: [], setCitas: () => { } , actualizarCitas: () => {}});

const CitasProvider = ({ children }: { children: React.ReactNode }) => {

    const [citas, setCitas] = useState<CitasType>([]);
    const [cargando, setCargando] = useState(false);
    const { auth } = useAuth();
    


    useEffect(() => {

        console.log('El componente esta listo')

        const obtenerCitas = async () => {

            try {

                const token = localStorage.getItem('token');

                console.log('Token desde citas: ', token);


                if (!token) {
                    return;
                }


                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get(`app/obtener-citas/${auth?.idClientes}`, config);
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