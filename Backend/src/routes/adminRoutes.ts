import express from 'express';
import checkAdmin from '../middleware/checkAdmin';
import upload from '../middleware/subidaArchivos';
import { addBarbero, deleteBarbero, getBarbero, getBarberos, updateBarbero } from '../controllers/barberoController';
import { addService, deleteService, getService, getServices, updateService } from '../controllers/serviciosController';

const router = express.Router();

//protected routes administrador
router.post('/registrar-barbero', checkAdmin, upload.single('imagen'), addBarbero);
router.get('/obtener-barberos', checkAdmin, getBarberos);
router.get('/obtener-barbero/:idBarbero', checkAdmin, getBarbero);
router.put('/actualizar-barbero/:idBarbero', checkAdmin, updateBarbero);
router.delete('/eliminar-barbero/:idBarbero', checkAdmin, deleteBarbero);

router.post('/registrar-servicio', checkAdmin, addService);
router.get('/obtener-servicio/:idServicio', checkAdmin, getService);
router.get('/obtener-servicio', checkAdmin, getServices);
router.put('/actualizar-servicio/:idServicio',checkAdmin, updateService);
router.delete('/eliminar-servicio/:idServicio', checkAdmin, deleteService)




export default router;