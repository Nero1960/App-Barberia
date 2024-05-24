import { useContext } from "react";
import TestimonialContext from "../context/TestimonialProvider";

const useTestimonial = () => {
    return useContext(TestimonialContext)
};

export default useTestimonial;