import imagen from '../../public/background.jpg'

function Nosotros() {
    return (
        <>

            <main className="px-5 md:px-40 py-24 grid md:grid-cols-2 max-w-[100%] mx-auto gap-10">

                <div className="text-xs text-secondary-100 leading-6 text-justify space-y-8">
                    <h2 className='text-4xl font-Heading text-center text-secondary-200'>¡Bienvenido a Mojica's BarberShop!</h2>
                    <p className="">

                        En Mojica's BarberShop, nos enorgullece ofrecer servicios de barbería de primera calidad desde hace más de 5 años. Fundada en 2019, nuestra barbería se ha convertido en un destino confiable para hombres que buscan un corte de cabello impecable, un afeitado suave y un servicio excepcional.

                        </p>

                        <p> Ya sea que estés buscando un cambio de imagen completo o simplemente necesites un retoque rápido, estamos aquí para cumplir con tus necesidades de cuidado personal. Ven y únete a nosotros en Mojica's BarberShop, donde la excelencia en el arte de la barbería se encuentra con la comodidad y la hospitalidad.</p>

                        <p className='bg-primary-500 py-2 w-full text-center rounded'>¡Esperamos darte la bienvenida pronto!</p>

                </div>

                <div>

                    <img src={imagen} alt="imagen" className='block w-full' />


                </div>

            </main>
        </>
    )
}

export default Nosotros