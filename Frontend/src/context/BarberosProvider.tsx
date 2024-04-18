import { createContext, useState, useEffect } from "react";
import { Barberos } from "../types/Barberos";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

type BarberosType = Barberos[];


type BarberosTypeContext = {
    barberos: BarberosType,
}


const BarberosContext = createContext<BarberosTypeContext>({ barberos: []});

const BarberosProvider = ({ children }: { children: React.ReactNode }) => {

    const [barberos, setBarberos] = useState<BarberosType>([])
    const { auth } = useAuth();


    useEffect(() => {

        const obtenerBarberos = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log(token);

                if (!token) {
                    return
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }



                const { data } = await clienteAxios.get('/app/obtener-barberos', config);
                setBarberos(data)
            } catch (error) {
                console.log(error)
                setBarberos([])
            }



        }

        obtenerBarberos();

    }, [auth?.token])

    



    return (
        <BarberosContext.Provider
            value={{
                barberos
            }}
        >
            {children}
        </BarberosContext.Provider>
    )

}


export {
    BarberosProvider
}

export default BarberosContext;


