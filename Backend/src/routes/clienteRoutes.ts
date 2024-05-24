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
import { actualizarCita,
        reprogramarCita, 
        reservarCita,
        mostrarCita, 
        eliminarCita, 
        obtenerCita } from '../controllers/citasController';

import upload from '../middleware/subidaArchivos';
import { nuevoTestimonial, obtenerTestimoniales } from '../controllers/testimonialesController';


const router = express.Router();

//public routes
router.post('/registrar', addClient);
router.get('/confirmar/:token', confirmClient);
router.post('/olvide-password', forgotPassword);
router.post('/login', authClient)
router.route('/olvide-password/:token').get(confirmToken).post(newPassword);

//protected routes
//barberos
router.get('/app/obtener-barbero/:idBarbero', checkAuth, getBarberoCliente);
router.get('/app/obtener-barberos', checkAuth, getBarberos);

//servicio
router.get('/app/obtener-servicios', checkAuth, getServices);

//citas
router.post('/app/reservar-cita', checkAuth, reservarCita);
router.post('/app/reprogramar-cita/:idCita', checkAuth, reprogramarCita)
router.put('/app/actualizar-cita/:idCitas', checkAuth, actualizarCita);
router.get('/app/obtener-cita/:idCitas', checkAuth, obtenerCita)
router.get('/app/obtener-citas/:idClientes', checkAuth, mostrarCita)
router.delete('/app/eliminar-cita/:idCitas', checkAuth, eliminarCita);

//perfil
router.get('/app', checkAuth, perfil);
router.put('/app/actualizar-perfil', checkAuth,  upload.single('imagen'), actualizarPerfil)

//testimoniales
router.post('/app/agregar-testimonial', checkAuth, nuevoTestimonial);
router.get('/app/obtener-testimoniales', checkAuth, obtenerTestimoniales);


export default router;