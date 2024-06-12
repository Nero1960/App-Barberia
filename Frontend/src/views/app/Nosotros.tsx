import imagen from '../../public/background.jpg'
import imagen2 from '../../public/imagen4.webp'
import imagen3 from '../../public/imagen1.jpg'






function Nosotros() {
    return (
        <>

            <main className="py-10 md:py-24 grid md:grid-cols-2  max-w-[90%] md:max-w-5xl mx-auto gap-10">

                <div className="text-xs text-secondary-100 leading-6 text-justify space-y-8">
                    <h2 className='text-4xl font-Heading text-center text-secondary-200'>¡Bienvenido a Mojica's BarberShop!</h2>
                    <p className="">

                        En Mojica's BarberShop, creemos en la importancia de crear un ambiente acogedor y relajante para todos nuestros clientes. Desde el momento en que entras por nuestras puertas, te recibirás con una sonrisa y un servicio atento que hace que cada visita sea especial. Nuestro espacio está diseñado para ofrecerte la máxima comodidad, con una decoración moderna y sillas de barbería confortables, perfectas para relajarte mientras te atendemos.

                    </p>

                    <p> Además de nuestros servicios de cortes y afeitados, también ofrecemos tratamientos de cuidado capilar y facial, utilizando productos de alta calidad que garantizan resultados excepcionales. Nos enorgullece ser parte de la comunidad local y estamos comprometidos con mantener los más altos estándares de higiene y seguridad en cada servicio.</p>

                    <p>En Mojica's BarberShop, no solo cuidamos de tu apariencia, sino también de tu bienestar. Nos apasiona lo que hacemos y nos dedicamos a proporcionar una experiencia de barbería que va más allá de lo ordinario. Ven y descubre por qué nuestros clientes nos eligen una y otra vez. Te esperamos para brindarte un servicio excepcional y hacer que cada visita sea inolvidable.</p>
                    
                   

                    <p className='bg-primary-500 py-2 w-full text-center rounded'>¡Esperamos darte la bienvenida pronto!</p>

                </div>

                <div className='grid  gap-x-5 items-center md:grid-cols-2 h-full'>

                
                    <img src={imagen2} alt="imagen" className=' rounded-md h-full w-full object-cover' />
                    <img src={imagen3} alt="imagen" className=' rounded-md h-full w-full object-cover' />
                    <img src={imagen} alt="imagen" className=' rounded-md bg-image md:h-[75%] md:-mt-10 w-full object-cover' />

                </div>

            </main>
        </>
    )
}

export default Nosotros