import { FiPlus } from "react-icons/fi";
import HeaderAdmin from "../../components/HeaderAdmin"
import useServicios from "../../hooks/useServicios"
import { Link } from "react-router-dom";
import ListaServiciosAdmin from "../../components/ListaServiciosAdmin";

function ServiciosAdmin() {

    const { servicios} = useServicios();
    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            <div className="relative overflow-x-auto overflow-y-auto h-[75vh] shadow-md sm:rounded-lg mx-5 mt-10">

                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 p-5 bg-black-500 w-full">

                    <Link to={'/admin/agregar-servicio'} className="flex bg-dark-500 hover:bg-primary-500 duration-300 px-4 py-2 items-center text-white gap-x-2 rounded"><FiPlus />Servicios</Link>

                </div>


                <table className="w-full text-sm text-left rtl:text-right bg-black-500 text-dark-200">
                    <thead className="text-xs uppercase w-full">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {servicios && servicios.length > 0 && (

                            servicios.map(servicio => (
                                <ListaServiciosAdmin
                                    key={servicio.idServicios}
                                    servicio={servicio}
                                />
                            ))
                        )}




                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ServiciosAdmin