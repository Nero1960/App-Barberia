import { createContext, useEffect, useState } from "react"
import { TestimonialType } from "../types/Testimoniales"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"

type TestimonialContextProp = {
    testimoniales: TestimonialesStateType[],
    actualizarTestimoniales: () => void,
    testimonialesAdmin: TestimonialesStateType[]
}

export type TestimonialesStateType = TestimonialType & {
    cliente: {
        nombre: string,
        apellido: string,
        imagen: string
    }
}

const TestimonialContext = createContext<TestimonialContextProp>({ testimoniales: [], actualizarTestimoniales: () => { }, testimonialesAdmin: [] })

export const TestimonialProvider = ({ children }: { children: React.ReactNode }) => {

    const { auth } = useAuth();
    const [testimoniales, setTestimoniales] = useState<TestimonialesStateType[]>([]);
    const [testimonialesAdmin, setTestimonialesAdmin] = useState<TestimonialesStateType[]>([]);

    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        const obtenerTestimoniales = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const config = {
                    headers: {
                        'ContentType': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data }: { data: TestimonialesStateType[] } = await clienteAxios.get('/app/obtener-testimoniales', config)
                setTestimoniales(data)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerTestimoniales()

        const obtenerTestimonialesAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const config = {
                    headers: {
                        'ContentType': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data }: { data: TestimonialesStateType[] } = await clienteAxios.get('/admin/obtener-testimonialAdmin', config)
                setTestimonialesAdmin(data)
            } catch (error) {
                console.log(error)
            }
        }

        if (auth?.admin === 1) {
            obtenerTestimonialesAdmin();


        }


    }, [cargando, auth?.token])

    const actualizarTestimoniales = () => {
        setCargando(prevState => !prevState);
    }

    return (

        <TestimonialContext.Provider
            value={{
                testimoniales,
                actualizarTestimoniales,
                testimonialesAdmin
            }}
        >
            {children}
        </TestimonialContext.Provider>

    )

}

export default TestimonialContext;

