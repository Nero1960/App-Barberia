import express from 'express';
import {
    addClient,
    confirmClient,
    forgotPassword,
    confirmToken,
    newPassword,
    authClient,
    perfil,
} from '../controllers/clientesControllers';
import checkAuth from '../middleware/checkAuth';
import { getBarberos, getBarberoCliente } from '../controllers/barberoController';
import { getServices } from '../controllers/serviciosController';
import { actualizarCita, reprogramarCita, reservarCita } from '../controllers/citasController';


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
router.post('/app/actualizar-cita/:idCita', checkAuth, actualizarCita);


export default router;