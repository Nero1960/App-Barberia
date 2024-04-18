import { createContext, useState, useEffect } from "react";
import { Servicios } from "../types/Servicios";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

type ServiciosType = Servicios[];

type ServiciosTypeContext = {
    servicios: ServiciosType,
    loading: boolean,
}


const ServiciosContext = createContext<ServiciosTypeContext>({ servicios: [], loading: true });

const ServiciosProvider = ({ children }: { children: React.ReactNode }) => {

    const [servicios, setServicios] = useState<ServiciosType>([])
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log(token)

                if (!token) {
                    setLoading(false);
                    return
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }



                const { data } = await clienteAxios.get('/app/obtener-servicios', config);
                setServicios(data)
            } catch (error) {
                console.log(error)
                setServicios([])
            }

            setLoading(false)

        }

        obtenerServicios();
    }, [auth?.token])





    return (
        <ServiciosContext.Provider
            value={{
                servicios,
                loading,
            }}
        >
            {children}
        </ServiciosContext.Provider>
    )

}


export {
    ServiciosProvider
}

export default ServiciosContext;


