import { useContext } from "react";
import BarberosContext from '../context/BarberosProvider'

const useBarberos = () => {
    return useContext(BarberosContext);
}

export default useBarberos;