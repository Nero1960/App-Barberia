import React, { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

// Definimos la interfaz para los datos de autenticación
type AuthData = {
    idClientes: number;
    token: string;
    telefono: string;
    imagen: string;
    nombre: string;
    email: string;
    admin: number;
    apellido: string;
    direccion: string;
}

type AuthContextType = {
    auth: AuthData | null,
    cargando : boolean,
    setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>,
    cerrarSession : () => void
}

// Creamos el contexto de autenticación con la interfaz AuthData
const AuthContext = createContext<AuthContextType>({auth: null, setAuth: () => {}, cargando: true, cerrarSession: () => {}});

// Creamos el componente proveedor de autenticación
const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    // Definimos el estado para almacenar los datos de autenticación
    const [auth, setAuth] = useState<AuthData | null>(null);
    const [cargando, setCargando] = useState(true);

    // Efecto secundario para autenticar al usuario al cargar el componente
    useEffect(() => {
        // Función para autenticar al usuario
        const autenticarUsuario = async () => {
            // Obtenemos el token del almacenamiento local
            const token = localStorage.getItem('token');


            // Si no hay token, retornamos sin hacer nada más
            if (!token) {
                setCargando(false)
                return;
            }

            // Configuración para la solicitud HTTP
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }


            try {
                // Realizamos la solicitud GET al servidor para obtener los datos de autenticación
                const { data } = await clienteAxios.get<AuthData>('/app', config);
                // Actualizamos el estado con los datos obtenidos
                setAuth(data);

            } catch (error: any) {
                // Manejamos errores de forma adecuada
                console.log(error.response?.data?.msg);
                // Si hay un error, establecemos el estado como un objeto vacío
                setAuth(null);
            }

            setCargando(false)

        }

        // Llamamos a la función de autenticación al cargar el componente
        autenticarUsuario();

    }, [])

    //cerrar Sesion
    const cerrarSession = () : void => {
        localStorage.removeItem('token');
        setAuth(null)
    }

    // Devolvemos el proveedor de contexto con los datos de autenticación y el estado de autenticación
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSession
            }}
        >
            {/* Renderizamos los componentes hijos */}
            {children}
        </AuthContext.Provider>
    )
}

// Exportamos el componente proveedor de autenticación
export {
    AuthProvider
}

// Exportamos el contexto de autenticación
export default AuthContext;