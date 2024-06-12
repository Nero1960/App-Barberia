import { useEffect, useState } from 'react'
import play from '../../public/Icons/PlayCircle.svg'
import ubicacionIcons from '../../public/Icons/MapPin.svg'
import home from '../../public/Icons/Home.svg'
import tijeras from '../../public/Icons/scissors.png'
import imagen1 from '../../public/imagen2.jpg'
import { Link } from 'react-router-dom'
import ListaServicios from '../../components/ListaServicios'
import ListaBarberos from '../../components/ListaBarberos'
import 'react-toastify/dist/ReactToastify.css';
import imagen2 from '../../public/galeria1.jpg'
import imagen3 from '../../public/galeria2.jpg'
import imagen4 from '../../public/galeria3.jpg'
import imagenCita from '../../public/citas.jpg'
import video1 from '../../public/videos/video1.mp4'
import Arrow from '../../public/Icons/ArrowUp.svg'
import useServicios from '../../hooks/useServicios'
import useBarberos from '../../hooks/useBarberos'
import Testimoniales from './Testimoniales'
import { FiEye, FiStar } from 'react-icons/fi'


function Inicio() {


  const { servicios, loading } = useServicios();
  const { barberos } = useBarberos();

  if (loading) return 'Cargando...'

  const [scrolly, setScrollY] = useState(0);

  const year : number= new Date().getFullYear() - 2019;


  useEffect(() => {
    const scrollDetect = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', scrollDetect);

    // Limpieza del efecto
    return () => {
      window.removeEventListener('scroll', scrollDetect);
    };
  }, []);


  return (
    <>

      <section className="hero mt-5 md:mt-0 pt-7 md:p-0">
        <div className="max-w-[90%] md:max-w-5xl mx-auto grid grid-cols-1 gap-y-40 grid-rows-2 md:grid-rows-1 md:grid-cols-2 place-items-center h-full">

          <div className="space-y-5">
            <h1 className="font-Heading text-4xl md:text-5xl md:leading-[3.5rem] text-secondary-400">Un Estilo de Cabello Impresionante</h1>
            <p className="leading-relaxed text-secondary-100 text-xs md:w-3/4 font-Heading">Descubre nuestra colección exclusiva de cortes de cabello para lucir un estilo impresionante y único..</p>

            <div className="flex gap-x-3">
              <a href='#servicios' className="bg-primary-500 px-4 py-2 text-white rounded-lg hover:bg-primary-600 duration-300 flex items-center gap-x-2"> <FiEye/>Servicios</a>

              <a href='#galeria' className="flex items-center gap-x-2 bg-transparent px-4 py-2 text-secondary-400 rounded-lg hover:bg-black-500 duration-300"> <img src={play} alt="icono playclassName='object-cover h-full' " width={22} height={22} /> Galería</a>

            </div>

            <p className='text-white font-bold md:w-[40%] text-sm flex items-center gap-x-2'><span className='text-primary-500 font-bold text-xl'><FiStar/></span> {year} años Atendiendo con una excelente calidad</p>
            <div className='flex gap-x-3 items-center'>
              <img src={ubicacionIcons} alt="Ubicación" width={26} height={26} />
              <p className='text-xs text-white font-thin leading-5 md:w-1/3'>7 esquinas 25 vrs oeste, Masaya, Nicaragua</p>

            </div>
          </div>


        </div>


      </section>

      <section className='about bg-black-500 px-5 py-10'>
        <div className='max-w-[90%] md:max-w-5xl mx-auto '>
          <h2 className='font-Heading text-3xl md:text-5xl text-secondary-400 mb-10'>Nosotros</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 mt-5 gap-y-20 md:gap-x-1 md:gap-y-0'>
            <div className='info text-xs text-secondary-100 leading-6 text-justify'>
              <p className='mb-5'>!Bienvenido a Mojica's BarberShop!. En Mojica's BarberShop, nos enorgullece ofrecer servicios de barbería de primera calidad desde hace más de <span className='text-primary-500'>{new Date().getFullYear() - 2019}</span> años.</p>
              <p>Fundada en [2019], nuestra barbería se ha convertido en un destino confiable para hombres que buscan un corte de cabello impecable, un afeitado suave y un servicio excepcional..</p>

              <p className='mt-5'>En Mojica's BarberShop, no solo nos preocupamos por el aspecto exterior; también nos preocupamos por la experiencia en su totalidad. </p>

              <div className='mt-10'>
                <Link to={'nosotros'} className='rounded-lg bg-primary-500 text-white px-10 py-2 hover:bg-primary-600 duration-700'>Leer Más</Link>
              </div>
            </div>


            <div className='col-span-2 relative'>
              <div className='grid grid-cols-2  relative'>
                <div className='absolute top-2 md:top-20 md:left-40'>
                  <button className='cursor-default flex gap-x-1 items-center bg-primary-500 rounded-3xl px-3 py-4 text-white text-sm' type='button'>
                    <img src={tijeras} alt="tijeras" width={20} height={20} />
                    Buena Experiencia Asegurada</button>
                </div>

                <div className='absolute top-64 right-0 md:left-28'>
                  <button className='cursor-default flex gap-x-1 items-center bg-primary-500 rounded-3xl px-3 py-4 text-white text-sm' type='button'>
                    <img src={home} alt="tijeras" width={20} height={20} />
                    Sientete como en Casa</button>
                </div>

                <div className='grid-column3-4'>
                  <img src={imagen1} alt="imagen mojicas" className='block rounded-lg ' width={400} height={0} />
                </div>

              </div>

            </div>
          </div>

          {scrolly > 555 && (
            <div className='hidden md:block fixed bottom-9 right-24 w-10 h-10 border '>
              <a href="#" ><img className='block p-1 cursor-pointer' src={Arrow} alt="imagen inicio" /></a>
            </div>
          )}



        </div>


      </section>

      <main className='servicios px-5 max-w-[90%] py-40 md:max-w-5xl mx-auto' id='servicios'>

        <h2 className='text-3xl md:text-5xl text-secondary-400 text-center font-Heading'>Nuestros Servicios</h2>
        <p className='my-6 text-center text-xs text-secondary-100 md:w-2/5 leading-5 mx-auto'>Nuestro equipo de profesionales está aquí para ofrecerte una amplia gama de servicios diseñados para resaltar tu estilo.</p>

        <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>

          {servicios.map(servicio => (
            <ListaServicios
              key={servicio.idServicios}
              servicio={servicio}
            />
          ))}


        </div>

      </main>

      <section className='barberos max-w-[90%] pb-40 md:max-w-5xl mx-auto' id='barberos'>
        <h2 className=' text-3xl md:text-5xl text-secondary-400 text-center font-Heading w-2/3 mx-auto'>Nuestros Profesionales</h2>
        <p className='my-6 text-center text-xs text-secondary-100 md:w-2/5 leading-5 mx-auto'> Descubre quiénes son los talentos detrás de nuestros servicios y déjate consentir por manos expertas. ¡Te invitamos a conocer a nuestros profesionales!</p>

        <div className='grid grid-cols-1 gap-y-5 md:grid-cols-3 space-y-7 md:space-y-0'>
          {barberos.map(barbero => (
            <ListaBarberos
              key={barbero.idBarberos}
              barberoProp={barbero}
            />

          ))}

        </div>
      </section>

      <section className='testimoniales section'>
        <div className='max-w-[90%] py-10 md:py-20 md:max-w-5xl mx-auto'>
          <Testimoniales />
        </div>
      </section>


      <section className='galeria bg-black-500  py-20' id='galeria'>

        <div className='md:max-w-5xl max-w-[90%] mx-auto'>
          <h2 className='font-Heading text-secondary-400 text-5xl text-center'>Galería</h2>
          <p className='text-xs text-center text-secondary-100 my-5 md:w-1/2 mx-auto leading-5'>Explora nuestra galería y descubre los trabajos que hemos realizado. Confía en nosotros para brindarte el mejor estilo y experiencia en cada visita.</p>

          <div className='grid grid-cols-2 my-10 md:grid-cols-4 gap-5'>

            <div className='imagen1'>
              <video src={video1} muted autoPlay loop className='object-cover h-full'></video>

            </div>


            <div className='imagen3'>
              <img src={imagen2} alt="galeria" className='object-cover h-full' />
            </div>

            <div className='imagen4'>
              <img src={imagen3} alt="galeria" className='object-cover h-full' />
            </div>


            <div className='imagen8'>
              <img src={imagen4} alt="galeria" className='object-cover h-full' />
            </div>

            <div className='imagen-cita'>
              <img src={imagenCita} alt="galeria" className='object-cover h-full' />

            </div>

          </div>

        </div>




      </section>

      <section className='policy max-w-[90%] py-32 md:max-w-5xl mx-auto'>
        <div className='bg-primary-500 rounded-xl'>
          <div className='flex flex-col px-5 items-center justify-center text-white md:w-1/2 mx-auto py-10 space-y-5'>
            <h2 className='font-Heading text-center text-sm'>Explora Nuestras Políticas de Citas <span className='text-2xl block mt-2'> Todo lo que Necesitas Saber para una Experiencia Perfecta</span></h2>
            <p className='text-xs font-light text-center md:w-3/4 leading-5'>Descubre cómo nuestras políticas de citas están diseñadas para garantizar tu comodidad, seguridad y satisfacción en cada visita</p>
            <Link to="policy" className='bg-white w-full text-center text-black-200 hover:bg-primary-600 hover:text-white duration-300 py-2'>Ver Políticas De Citas</Link>
          </div>

        </div>

      </section>

    </>
  )
}

export default Inicio