import ubicacionIcon from '../../public/Icons/MapPin.svg';
import telefono from '../../public/Icons/Phone.svg'
import clockIcon from '../../public/Icons/Clock.svg'


function Policy() {
    return (
        <>

            <main className="max-w-4xl px-10 my-20 flex flex-col md:flex-row mx-auto">


                <div className="md:w-[70%] mx-auto">
                    <h2 className="text-3xl mb-5 text-secondary-400 font-bold font-Heading leading-10">!Bienvenido a las Políticas de Citas en <span className="block font-bold text-secondary-400">Mojica's BarberShop</span> </h2>

                    <p className="text-sm text-secondary-100 leading-7 text-justify mb-5">Estamos encantados de tenerte aquí y queremos asegurarnos de que tu experiencia con nosotros sea excepcional desde el momento en que reservas tu cita. Por favor, tómate un momento para revisar nuestras políticas de citas a continuación:</p>

                    <ol className="text-secondary-100 text-sm list-decimal space-y-5">
                        <li className="font-bold font-Heading text-secondary-400 text-2xl">Reserva Anticipada

                            <ul className="list-disc mt-4 font-normal font-Body text-secondary-100 text-sm leading-7 space-y-5">
                                <li>Te recomendamos reservar tu cita con anticipación para garantizar tu lugar en nuestro calendario.</li>
                                <li>Puedes reservar fácilmente tu cita a través de nuestra plataforma en línea o llamando a nuestro salón directamente.</li>
                            </ul>
                        </li>

                        <li className="font-bold font-Heading text-secondary-400 text-2xl">Modificaciones y Cancelaciones

                            <ul className="list-disc mt-4 font-normal font-Body text-secondary-100 text-sm leading-7 space-y-5">
                                <li>Entendemos que pueden surgir imprevistos. Sin embargo, cualquier cambio o cancelación de cita debe realizarse con al menos 24 horas de anticipación.</li>
                                <li>Si cancelas tu cita con menos de 24 horas de antelación, se cobrará el costo completo de tu sesión. No hay excepciones para esto. Ya que si no nos avisas a tiempo, no podremos utilizar este tiempo de tu cita con otra persona</li>
                            </ul>
                        </li>

                        <li className="font-bold font-Heading text-secondary-400 text-2xl">Puntualidad

                            <ul className="list-disc mt-4 font-normal font-Body text-secondary-100 text-sm leading-7 space-y-5">
                                <li>Valoramos tu tiempo y el de nuestro equipo. Te pedimos que llegues a tiempo para tu cita programada para asegurar que podamos brindarte el mejor servicio posible.</li>
                                <li>Si llegas tarde, haremos todo lo posible para atenderte, pero es posible que necesitemos reprogramar tu cita para otro momento.</li>
                            </ul>
                        </li>

                        <li className="font-bold font-Heading text-secondary-400 text-2xl">Comunicación

                            <ul className="list-disc mt-4 font-normal font-Body text-secondary-100 text-sm leading-7 space-y-5">
                                <li>Si tienes alguna pregunta o inquietud sobre nuestras políticas de citas, no dudes en comunicarte con nosotros. Estamos aquí para ayudarte y asegurarnos de que tengas una experiencia inolvidable en Mojica's BarberShop.</li>

                            </ul>
                        </li>
                    </ol>

                </div>

                <aside className="hidden md:flex flex-col ps-10 md:w-[30%] mx-auto relative">
                <div className='flex flex-col justify-center items-center space-y-5'>
                    <h3 className='font-Heading text-secondary-400 text-xs'>Información de Contacto</h3>
                    <div className='flex gap-5 items-center justify-start w-full'>
                        <img src={ubicacionIcon} alt="Ubicación" width={24} height={24}/>
                        <p className=' text-white font-thin leading-5 text-xs'>7 esquinas 25 vrs oeste, Masaya, Nicaragua</p>
                    </div>

                    <div className='flex gap-5 items-center justify-start w-full'>
                        <img src={telefono} alt="Ubicación" width={24} height={24}/>
                        <p className='text-xs text-white font-thin leading-5'>+505 8788 2866</p>
                    </div>

                    <div className='flex gap-5 items-center justify-start w-full'>
                        <img src={clockIcon} alt="Ubicación" width={24} height={24}/>
                        <p className='text-xs text-white  font-thin leading-5'>Lunes - Sábado, 9:00 AM - 5:00 PM</p>
                    </div>
                </div>

                </aside>


            </main>


        </>
    )
}

export default Policy