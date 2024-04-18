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


//vistas de la Aplicación
import AppLayout from './layouts/AppLayout';
import Inicio from './views/app/Inicio';
import { BarberosProvider } from './context/BarberosProvider';


function router() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <ServiciosProvider>
                        <BarberosProvider>
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

                                </Route>


                                <Route path='/app' element={<AppLayout />}>
                                    <Route index element={<Inicio />} />
                                </Route>
                            </Routes>
                        </BarberosProvider>
                    </ServiciosProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default router