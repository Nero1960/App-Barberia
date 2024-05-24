import formatFecha from "../helpers/FormatFecha"
import { TestimonialType } from "../types/Testimoniales"

type TestimonialListType = TestimonialType & {
    cliente: {
        nombre: string,
        imagen: string,
        apellido: string
    }
}

const ListaTestimonial = ({ testimonial }: { testimonial: TestimonialListType }) => {

    return (
        <>

            <div className="card py-6 px-10 rounded-lg bg-black-500 flex flex-col h-[67vh] justify-between items-start mx-2 my-10 hover:scale-105 duration-500">
                <div className="header-card space-y-5">
                    <img src={`${import.meta.env.VITE_BASE_IMAGE}/${testimonial.cliente.imagen}`} alt="imagen cliente" className="w-20 h-20 rounded-full" />
                    <h2 className="text-white font-bold">"{testimonial.titulo}"</h2>
                    <p className="text-white text-sm leading-6">{testimonial.mensaje}</p>

                </div>

                <div className="footer-card text-sm">
                    <p className="text-primary-500 font-bold">{testimonial.cliente.nombre} {" "} {testimonial.cliente.apellido}</p>
                    <p className="text-white">{formatFecha(testimonial.fecha)}</p>

                </div>

            </div>

        </>

    )
}

export default ListaTestimonial