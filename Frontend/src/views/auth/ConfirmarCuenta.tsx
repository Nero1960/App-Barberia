import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../../config/axios";
import { toast } from 'react-toastify'
import logo1 from '../../public/logo1.png'
import logo2 from '../../public/logo2.png'

function ConfirmarCuenta() {

    const [confirmar, setConfirmar] = useState(false);
    const params = useParams();
    const { token } = params;

    useEffect(() => {

        const confirmarCuenta = async () => {

            try {
                const { data } = await clienteAxios.get(`/confirmar/${token}`);

                
                setConfirmar(true);
                toast.success(data.msg, {
                    theme: 'dark'
                })

            } catch (error: any) {
                toast.error(error.response.data.msg, {
                    theme: 'dark'
                })
                setConfirmar(false)
              

            }
        }

        if(token){
            confirmarCuenta();
        }


    }, [])
    return (
        <>
            <div className='flex flex-col items-center'>
                <h1 className="text-center text-secondary-400 text-4xl mt-10 mb-10 md:mt-0 md:mb-0 md:text-5xl font-Heading font-bold md:leading-tight mx-5">
                    Confirmación de Cuenta. Mojica's BarberShop
                </h1>

                <img src={logo2} alt="LogoTipo" className='rounded-full mx-auto -mt-6 md:mt-0' width={250} height={250} />
            </div>

            <div className="space-y-8">

                <div className='mb-5'>
                    <img src={logo1} alt="LogoTipo" className='rounded-full mx-auto' width={150} height={150} />
                    <span className='block text-sm text-secondary-400 text-center -mt-3'>Mojica's BarberShop</span>
                </div>

                {confirmar && (
                    <Link className="block text-center mx-auto w-full bg-primary-400 hover:bg-primary-600 duration-300 px-5 py-2 text-white rounded-lg" to={'/'}>Iniciar Sesión</Link>
                )}
            </div>

        </>
    )
}

export default ConfirmarCuenta