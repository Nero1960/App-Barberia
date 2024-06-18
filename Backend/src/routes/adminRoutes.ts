import express from 'express';
import checkAdmin from '../middleware/checkAdmin';
import upload from '../middleware/subidaArchivos';
import { addBarbero, deleteBarbero, getBarbero, getBarberos, obtenerTotalBarbero, updateBarbero } from '../controllers/barberoController';
import { addService, deleteService, getService, getServices, obtenerServiciosMasSolicitados, obtenerTotalServicios, updateService } from '../controllers/serviciosController';
import { buscarCliente, obtenerClientes, obtenerTotalCliente, obtenerUltimosClientes } from '../controllers/clientesControllers';
import { buscarCitaBarbero, buscarCitaDate, buscarCitaEstado, finalizarCita, obtenerCita, obtenerCitas, obtenerCitasPendientes } from '../controllers/citasController';
import { desaprobarTestimonial, eliminarTestimonial, obtenerTestimonial, obtenerTestimonialesAdmin, permitirTestimonial } from '../controllers/testimonialesController';
import { clientesMasFrecuentados, ingresosCitasMes, ingresosPerBarberos } from '../controllers/reportesController';

const router = express.Router();

//protected routes administrador
router.get('/total-cliente', checkAdmin, obtenerTotalCliente);
router.get('/obtener-clientes', checkAdmin, obtenerClientes);
router.get('/buscar-clientes', checkAdmin, buscarCliente);
router.get('/obtener-ultimos-clientes', checkAdmin, obtenerUltimosClientes)

router.post('/registrar-barbero', checkAdmin, upload.single('imagen'), addBarbero);
router.get('/obtener-barberos', checkAdmin, getBarberos);
router.get('/obtener-barbero/:idBarbero', checkAdmin, getBarbero);
router.put('/actualizar-barbero/:idBarbero', checkAdmin, upload.single('imagen') , updateBarbero);
router.delete('/eliminar-barbero/:idBarbero', checkAdmin, deleteBarbero);
router.get('/total-barbero', checkAdmin, obtenerTotalBarbero);

router.get('/citas-pendientes', checkAdmin, obtenerCitasPendientes);
router.get('/obtener-citas', checkAdmin, obtenerCitas)
router.get('/obtener-cita/:idCitas', checkAdmin, obtenerCita)
router.get('/buscar-cita', checkAdmin, buscarCitaDate )
router.get('/buscar-cita-estado', checkAdmin, buscarCitaEstado);
router.get('/buscar-cita-barbero/:idBarberos', checkAdmin, buscarCitaBarbero);
router.put('/finalizar-cita/:idCitas', checkAdmin, finalizarCita)

router.post('/registrar-servicio', checkAdmin, addService);
router.get('/obtener-servicio/:idServicio', checkAdmin, getService);
router.get('/obtener-servicio', checkAdmin, getServices);
router.put('/actualizar-servicio/:idServicio',checkAdmin, updateService);
router.delete('/eliminar-servicio/:idServicio', checkAdmin, deleteService)
router.get('/obtener-servicio-total', checkAdmin, obtenerTotalServicios);
router.get('/obtener-servicio-solicitado', checkAdmin, obtenerServiciosMasSolicitados);

//testimoniales
router.get('/obtener-testimonial/:idTestimoniales', checkAdmin, obtenerTestimonial);
router.get('/obtener-testimonialAdmin', checkAdmin, obtenerTestimonialesAdmin);
router.put('/permitir-testimonial/:idTestimoniales', checkAdmin, permitirTestimonial);
router.put('/desaprobar-testimonial/:idTestimoniales', checkAdmin, desaprobarTestimonial);
router.delete('/eliminar-testimonial/:idTestimoniales', checkAdmin, eliminarTestimonial)

//registros
router.get('/ingresos-citas-mes', checkAdmin, ingresosCitasMes);
router.get('/ingresos-perBarberos', checkAdmin, ingresosPerBarberos);
router.get('/clientes-frecuentes', checkAdmin, clientesMasFrecuentados);






export default router;