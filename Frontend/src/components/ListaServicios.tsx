import { Servicios } from "../types/Servicios"
import formatToCordobas from "../helpers/formatDinero"
import logo from '../public/logo2.png'

function ListaServicios({servicio} : {servicio : Servicios}) {
  return (
    <div className="bg-dark-500 p-6 hover:scale-105 duration-300  rounded-lg">
        <div className="flex gap-x-3 justify-around items-center ">
            <div>
                <img src={logo} alt="Logo" width={120} height={120} />
            </div>

            <div className="flex flex-col gap-y-3 items-center font-Heading ">
                <p className="text-secondary-100 text-sm">{servicio.nombre}</p>
                <p className="text-xl font-bold text-primary-500">{formatToCordobas(servicio.precio)}</p>
            </div>

        </div>

    </div>
  )
}

export default ListaServicios