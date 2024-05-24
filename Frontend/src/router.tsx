import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ServiciosProvider } from './context/ServiciosProvider';

//vistas de la Autenticación
import AuthLayout from './layouts/AuthLayout';
import RegistrarCliente from './views/auth/RegistrarCliente';
import ConfirmarCuenta from './views/auth/ConfirmarCuenta';
import Login from './views/auth/Login';
import OlvidePassword from './views/auth/OlvidePassword';
import NuevoPassword from './views/auth/NuevoPassword';


//vistas administrador
import AdminLayout from './layouts/AdminLayout';
import InicioAdmin from './views/admin/InicioAdmin';
import ClientesAdmin from './views/admin/ClientesAdmin';


//vistas de la Aplicación
import AppLayout from './layouts/AppLayout';
import Inicio from './views/app/Inicio';
import { BarberosProvider } from './context/BarberosProvider';

import ReservarCita from './views/app/ReservarCita';
import Nosotros from './views/app/Nosotros';
import Policy from './views/app/Policy';
import MisCitas from './views/app/MisCitas';
import ActualizarCita from './views/app/ActualizarCita';
import MiPerfil from './views/app/MiPerfil';
import ActualizarPerfil from './views/app/ActualizarPerfil';
import { CitasProvider } from './context/CitasProvider';
import BarberosAdmin from './views/admin/BarberosAdmin';
import AgregarBarberoAdmin from './views/admin/AgregarBarberoAdmin';
import ActualizarBarberosAdmin from './views/admin/ActualizarBarberosAdmin';
import ServiciosAdmin from './views/admin/ServiciosAdmin';
import AgregarServicioAdmin from './views/admin/AgregarServicioAdmin';
import ActualizarServiciosAdmin from './views/admin/ActualizarServiciosAdmin';
import CitasAdmin from './views/admin/CitasAdmin';
import AgregarTestimonial from './views/app/AgregarTestimonial';
import { TestimonialProvider } from './context/TestimonialProvider';
import TestimonialesAdmin from './views/admin/TestimonialesAdmin';
import InformacionTestimonial from './views/admin/InformacionTestimonial';


function router() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <ServiciosProvider>
                        <BarberosProvider>
                            <CitasProvider>
                                <TestimonialProvider>
                                    <Routes>
                                        <Route path='/' element={<AuthLayout />}>
                                            <Route index element={<Login />} />
                                            <Route path='/registrar-cliente' element={<RegistrarCliente />} />
                                            <Route path='/confirmar/:token' element={<ConfirmarCuenta />} />
                                            <Route path='/olvide-password' element={<OlvidePassword />} />
                                            <Route path='/olvide-password/:token' element={<NuevoPassword />} />
                                        </Route>

                                        <Route path='/admin' element={<AdminLayout />}>
                                            <Route index element={<InicioAdmin />} />
                                            <Route path='/admin/clientes' element={<ClientesAdmin />} />
                                            <Route path='/admin/barberos' element={<BarberosAdmin />} />
                                            <Route path='/admin/agregar-barbero' element={<AgregarBarberoAdmin />} />
                                            <Route path='/admin/actualizar-barbero/:idBarberos' element={<ActualizarBarberosAdmin />} />
                                            <Route path='/admin/servicios' element={<ServiciosAdmin />} />
                                            <Route path='/admin/agregar-servicio' element={<AgregarServicioAdmin />} />
                                            <Route path='/admin/actualizar-servicio/:idServicios' element={<ActualizarServiciosAdmin />} />
                                            <Route path='/admin/citas' element={<CitasAdmin />} />
                                            <Route path='/admin/testimoniales' element={<TestimonialesAdmin />} />
                                            <Route path='/admin/ver-testimonial/:idTestimoniales' element={<InformacionTestimonial />} />



                                        </Route>


                                        <Route path='/app' element={<AppLayout />}>
                                            <Route index element={<Inicio />} />
                                            <Route path='/app/citas' element={<ReservarCita />} />
                                            <Route path='/app/nosotros' element={<Nosotros />} />
                                            <Route path='/app/policy' element={<Policy />} />
                                            <Route path='/app/mis-citas' element={<MisCitas />} />
                                            <Route path='/app/actualizar-cita/:idCitas' element={<ActualizarCita />} />
                                            <Route path='/app/perfil' element={<MiPerfil />} />
                                            <Route path='/app/actualizar-perfil' element={<ActualizarPerfil />} />
                                            <Route path='/app/agregar-testimonial' element={<AgregarTestimonial />} />

                                        </Route>
                                    </Routes>
                                </TestimonialProvider>
                            </CitasProvider>
                        </BarberosProvider>
                    </ServiciosProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default router