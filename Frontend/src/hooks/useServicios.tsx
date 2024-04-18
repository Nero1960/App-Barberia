import { useContext } from "react";
import ServiciosContext from '../context/ServiciosProvider'

const useServicios = () => {
    return useContext(ServiciosContext);
}

export default useServicios;