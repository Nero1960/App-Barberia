import useTestimonial from "../../hooks/useTestimoniales"
import ListaTestimonial from "../../components/ListaTestimonial";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Testimoniales = () => {

  const { testimoniales } = useTestimonial();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <h2 className="font-Heading text-3xl md:text-5xl text-secondary-400 mb-5 text-center">¿Que Opinan Nuestros Clientes?</h2>
      <p className="text-xs leading-5 mb-5 text-secondary-100 md:w-[60%] mx-auto text-center">¡Tu opinión es importante para nosotros! ¿Cómo fue tu experiencia con nuestro servicio? ¡Déjanos tu testimonio y comparte tu opinión!</p>

      <Carousel responsive={responsive} className="md:mb-0 mb-10" autoPlaySpeed={5000} showDots={true} arrows={false} infinite={true} autoPlay={true}>

        {testimoniales && testimoniales.length > 0 ? (

          testimoniales.map(testimonial => (
            <ListaTestimonial
              key={testimonial.titulo}
              testimonial={testimonial}
            />
          ))


        ) : (<h2>No hay testimoniales</h2>)}

      </Carousel>

      <a href="/app/agregar-testimonial" className="bg-primary-500 text-white px-3 py-2 hover:bg-primary-600 duration-300 cursor-pointer mt-5">Publicar Testimonial</a>
    </>
  )
}

export default Testimoniales