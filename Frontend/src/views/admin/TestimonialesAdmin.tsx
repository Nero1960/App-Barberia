import HeaderAdmin from "../../components/HeaderAdmin"
import ListaTestimonialAdmin from "../../components/ListaTestimonialAdmin";
import useTestimonial from "../../hooks/useTestimoniales"

const TestimonialesAdmin = () => {
    const { testimonialesAdmin } = useTestimonial();
    console.log(testimonialesAdmin)
    return (
        <div className="md:w-[80%] bg-black-900">
            <HeaderAdmin />

            <div className="relative overflow-x-auto overflow-y-auto h-[75vh] shadow-md sm:rounded-lg mx-5 mt-10">
                <table className="w-full text-sm text-left rtl:text-right bg-black-500 text-dark-200">
                    <thead className="text-xs uppercase w-full">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Cliente
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Titulo
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {testimonialesAdmin && testimonialesAdmin.length > 0 && (

                            testimonialesAdmin.map(testimonial => (
                                <ListaTestimonialAdmin
                                    key={testimonial.mensaje}
                                    testimonial={testimonial}
                                />
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TestimonialesAdmin