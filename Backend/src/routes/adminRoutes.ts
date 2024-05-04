import express from 'express';
import checkAdmin from '../middleware/checkAdmin';
import upload from '../middleware/subidaArchivos';
import { addBarbero, deleteBarbero, getBarbero, getBarberos, obtenerTotalBarbero, updateBarbero } from '../controllers/barberoController';
import { addService, deleteService, getService, getServices, obtenerServiciosMasSolicitados, obtenerTotalServicios, updateService } from '../controllers/serviciosController';
import { buscarCliente, obtenerClientes, obtenerTotalCliente } from '../controllers/clientesControllers';
import { obtenerCitasPendientes } from '../controllers/citasController';

const router = express.Router();

//protected routes administrador
router.get('/total-cliente', checkAdmin, obtenerTotalCliente);
router.get('/obtener-clientes', checkAdmin, obtenerClientes);
router.get('/buscar-clientes', checkAdmin, buscarCliente);

router.post('/registrar-barbero', checkAdmin, upload.single('imagen'), addBarbero);
router.get('/obtener-barberos', checkAdmin, getBarberos);
router.get('/obtener-barbero/:idBarbero', checkAdmin, getBarbero);
router.put('/actualizar-barbero/:idBarbero', checkAdmin, upload.single('imagen') , updateBarbero);
router.delete('/eliminar-barbero/:idBarbero', checkAdmin, deleteBarbero);
router.get('/total-barbero', checkAdmin, obtenerTotalBarbero);

router.get('/citas-pendientes', checkAdmin, obtenerCitasPendientes);


router.post('/registrar-servicio', checkAdmin, addService);
router.get('/obtener-servicio/:idServicio', checkAdmin, getService);
router.get('/obtener-servicio', checkAdmin, getServices);
router.put('/actualizar-servicio/:idServicio',checkAdmin, updateService);
router.delete('/eliminar-servicio/:idServicio', checkAdmin, deleteService)
router.get('/obtener-servicio-total', checkAdmin, obtenerTotalServicios);
router.get('/obtener-servicio-solicitado', checkAdmin, obtenerServiciosMasSolicitados);





export default router;