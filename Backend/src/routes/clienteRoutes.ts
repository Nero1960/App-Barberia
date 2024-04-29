import express from 'express';
import {
    addClient,
    confirmClient,
    forgotPassword,
    confirmToken,
    newPassword,
    authClient,
    perfil,
    actualizarPerfil
} from '../controllers/clientesControllers';
import checkAuth from '../middleware/checkAuth';
import { getBarberos, getBarberoCliente } from '../controllers/barberoController';
import { getServices } from '../controllers/serviciosController';
import { actualizarCita, reprogramarCita, reservarCita, mostrarCita, eliminarCita, obtenerCita } from '../controllers/citasController';
import upload from '../middleware/subidaArchivos';


const router = express.Router();

//public routes
router.post('/registrar', addClient);
router.get('/confirmar/:token', confirmClient);
router.post('/olvide-password', forgotPassword);
router.post('/login', authClient)
router.route('/olvide-password/:token').get(confirmToken).post(newPassword);

//protected routes
router.get('/app', checkAuth, perfil);
router.get('/app/obtener-barbero/:idBarbero', checkAuth, getBarberoCliente);
router.get('/app/obtener-barberos', checkAuth, getBarberos);

router.get('/app/obtener-servicios', checkAuth, getServices);

router.post('/app/reservar-cita', checkAuth, reservarCita);
router.post('/app/reprogramar-cita/:idCita', checkAuth, reprogramarCita)
router.put('/app/actualizar-cita/:idCitas', checkAuth, actualizarCita);
router.get('/app/obtener-cita/:idCitas', checkAuth, obtenerCita)
router.get('/app/obtener-citas/:idClientes', checkAuth, mostrarCita)
router.delete('/app/eliminar-cita/:idCitas', checkAuth, eliminarCita);

router.put('/app/actualizar-perfil', checkAuth,  upload.single('imagen'), actualizarPerfil)


export default router;