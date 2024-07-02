import { Request, Response, request, response } from "express";
import moment from 'moment';
import Citas from "../models/Citas";
import Cliente from "../models/Clientes";
import Barbero from "../models/Barberos";
import CitasServicios from "../models/CitasServicios";
import validarHora from "../helpers/validarHora";
import Servicios from "../models/Servicios";
import Sequelize, { Model, Op, where } from 'sequelize';


type RequestCustom = Request & {
    cliente?: Cliente
}


// Define una interfaz para las opciones de inclusión
interface IncludeThroughOptionsWithModel extends Sequelize.IncludeThroughOptions {
    model: typeof Servicios; // Tipo de modelo para la inclusión
}


const barberoDisponible = async (idBarberos: number, fecha: Date, hora: string): Promise<boolean> => {
    try {
        // Obtener la fecha y hora exactas de la cita solicitada
        const fechaSolicitada = new Date(fecha);

        // Verificar si existe una cita para el mismo barbero en la misma fecha y hora exacta
        const citaExistente = await Citas.findOne({
            where: {
                idBarberos: idBarberos,
                fecha: fechaSolicitada,
                hora: hora
            }
        });

        // Si ya existe una cita para ese barbero en esa fecha y hora exacta, el barbero está ocupado
        return !citaExistente;

    } catch (error) {
        console.log(error);
        return false; // Retornar falso en caso de error
    }
}

const obtenerCitasPendientes = async (request: Request, response: Response) => {

    try {

        const citasPendientes = await Citas.count({
            where: {
                estado: 'Pendiente'
            }
        })

        response.json(citasPendientes)

    } catch (error) {
        console.log(error);
    }

}

const obtenerCita = async (request: Request, response: Response) => {

    const idCitas = request.params.idCitas;

    try {

        const citaCliente = await Citas.findByPk(idCitas, (
            {
                include: [
                    {
                        model: Servicios,
                        through: {
                            model: CitasServicios,
                            attributes: ['precioActual']
                        } as any,

                        attributes: ['nombre', 'precio']
                    },
                    {
                        model: Barbero,
                        attributes: ['idBarberos', 'nombre', 'apellido']
                    }, 
                    {
                        model: Cliente,
                        attributes: ['nombre', 'apellido', 'imagen']
                    }
                ],

                attributes: ['fecha', 'hora', 'idCitas', 'estado']

            }
        ));


        response.json(citaCliente);


    } catch (error) {

        // Si ocurre algún error, responde con un mensaje de error
        console.error('Error al mostrar las citas del cliente:', error);
        response.status(500).json({ mensaje: 'Error interno del servidor' });
    }

}

const obtenerCitas = async (request: Request, response: Response) => {
    try {

        const citas = await Citas.findAll({
            include: [
                {
                    model: Servicios,
                    through: {
                        model: CitasServicios,
                        attributes: ['precioActual']
                    } as any,

                    attributes: ['nombre', 'precio']
                },
                {
                    model: Barbero,
                    attributes: ['idBarberos', 'nombre', 'apellido', 'imagen', 'email']
                },
                {
                    model: Cliente,
                    attributes: ['nombre', 'apellido', 'imagen', 'telefono']
                }
            ],

            attributes: ['fecha', 'hora', 'idCitas', 'estado'],
            order: [['fecha', 'DESC']]

        })

        response.json(citas)


    } catch (error) {

        // Si ocurre algún error, responde con un mensaje de error
        console.error('Error al mostrar las citas del cliente:', error);
        response.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const reservarCita = async (request: RequestCustom, response: Response) => {

    const { idBarberos, fecha, servicios, hora }: Citas = request.body;

    try {

        const barbero = await Barbero.findByPk(idBarberos);

        if (!barbero) {
            const error = new Error('El barbero seleccionado no existe');
            return response.status(404).json({ msg: error.message })
        }

        const disponible = await barberoDisponible(idBarberos, fecha, hora);

        // Si hay citas existentes para el barbero en esa fecha y hora, significa que está ocupado
        if (!disponible) {
            return response.status(400).json({ error: 'El barbero ya está ocupado en esta fecha y hora.' });
        }

        if (!validarHora(hora)) {
            return response.status(400).json({ error: 'Selecciona una hora dentro del rango de atención.' });
        }


        const cita = new Citas({
            fecha: request.body.fecha,
            hora: request.body.hora,
            idBarberos: request.body.idBarberos,
            idClientes: request.cliente.idClientes
        })

        const nuevaCita = await cita.save();

        // Verificar si se proporcionaron servicios
        if (servicios && servicios.length > 0) {
            // Asociar los servicios con la nueva cita en la tabla de citas_servicios
            await Promise.all(servicios.map(async servicioID => {
               console.log('this is idService?', servicioID)
               const idServicios : number = Number(servicioID);

               const servicio = await Servicios.findByPk(idServicios);
               const precio = servicio.precio;

                const citasServicio = new CitasServicios({
                    idCitas: nuevaCita.idCitas,
                    idServicios: servicioID,
                    precioActual: precio
                });
                await citasServicio.save();
                
            }));
        }

        response.json({ msg: 'La cita se ha reservado Correctamente' });


    } catch (error) {
        console.log(error);
    }

}

const reprogramarCita = async (request: Request, response: Response) => {

    const { fecha, hora }: Citas = request.body;
    const { idCita } = request.params;

    try {

        //actualizar la cita
        const cita = await Citas.findByPk(idCita);

        const fechaActual = moment();


        if (!cita) {
            const error = new Error('No se ha encontrado una cita');
            return response.status(404).json({ msg: error.message });
        }

        // Verificar si la fecha propuesta es mayor a la fecha actual
        const fechaPropuesta = moment(fecha, 'YYYY-MM-DD');
        if (!fechaPropuesta.isValid() || fechaPropuesta.isSameOrBefore(fechaActual)) {
            return response.status(400).json({ msg: 'La fecha propuesta debe ser válida y mayor a la fecha actual' });
        }


        const diferenciaHoras = Math.abs(moment.duration(fechaActual.diff(cita.fecha)).asHours());


        if (diferenciaHoras <= 24) {
            response.status(404).json({ msg: 'No se puede reprogramar la cita dentro de las 24 horas previas a la cita original' })
            return;

        }

        cita.fecha = fecha || cita.fecha;
        cita.hora = hora || cita.hora;

        await cita.save();

        response.json({ msg: 'Se ha reprogramado la cita exitosamente' })


    } catch (error) {
        response.json({ msg: 'Oops! Ha ocurrido un error en el servidor' })
    }

}

const actualizarCita = async (request: Request, response: Response) => {

    const { idCitas } = request.params;
    const { idBarberos, servicios, fecha, hora }: Citas = request.body;

    console.log(idCitas)

    const fechaActual = moment();

    try {
        const cita = await Citas.findByPk(idCitas, {
            include: [
                {
                    model: Servicios,
                    through: {
                        model: CitasServicios,
                        attributes: ['precioActual']
                    },
                    attributes: ['nombre', 'precio']
                } as any,
                {
                    model: Barbero,
                    attributes: ['idBarberos']
                }
            ]
        })

        // Verificar si la fecha propuesta es mayor a la fecha actual
        const fechaPropuesta = moment(fecha, 'YYYY-MM-DD');
        if (!fechaPropuesta.isValid() || fechaPropuesta.isSameOrBefore(fechaActual)) {
            return response.status(400).json({ msg: 'La fecha propuesta debe ser válida y mayor a la fecha actual' });
        }

        const diferenciaHoras = Math.abs(moment.duration(fechaActual.diff(cita.fecha)).asHours());
        console.log(diferenciaHoras)

        if (diferenciaHoras < 24) {
            response.status(404).json({ msg: 'No se puede reprogramar la cita dentro de las 24 horas previas a la cita original' })
            return;

        }

        if (!cita) {
            const error = new Error('No se ha encontrado una cita');
            return response.status(404).json({ msg: error.message });
        }

        if (!barberoDisponible(idBarberos, cita.fecha, cita.hora)) {
            const error = new Error('El barbero seleccionado no esta disponible en la fecha y hora proporcionada');
            return response.status(404).json({ msg: error.message });
        }

        cita.idBarberos = idBarberos || cita.idBarberos;
        cita.fecha = fecha || cita.fecha;
        cita.hora = hora || cita.hora;

        // Eliminamos todos los servicios asociados a la cita
        await CitasServicios.destroy({ where: { idCitas } });

        // Creamos los nuevos servicios para la cita
        // Crear nuevos registros en la tabla intermedia para los servicios actualizados
        await Promise.all(servicios.map(async (servicioId) => {
            const idServicios : number = Number(servicioId);
            const servicios = await Servicios.findByPk(idServicios)
            const precioActual = servicios.precio;
            await CitasServicios.create({ idCitas: idCitas, idServicios: servicioId, precioActual });
        }));


        await cita.save();

        response.json({ msg: 'Cita actualizada con éxito', cita })


    } catch (error) {
        console.log(error)
    }
}

const mostrarCita = async (request: Request, response: Response) => {

    const idClientes = request.params.idClientes;


    try {

        const citasCliente = await Citas.findAll((
            {
                where: { idClientes: idClientes },
                include: [
                    {
                        model: Servicios,
                        through: {
                            model: CitasServicios,
                            attributes: ['precioActual']
                        } as any,

                        attributes: ['nombre', 'precio']
                    },
                    {
                        model: Barbero,
                        attributes: ['nombre', 'apellido']
                    },
                    {
                        model: Cliente,
                        attributes: ['nombre', 'apellido', 'imagen', 'telefono']
                    }
                ],

                attributes: ['fecha', 'hora', 'idCitas', 'estado'],
                order: [['fecha', 'DESC']]

            }
        ));


        response.json(citasCliente);


    } catch (error) {

        // Si ocurre algún error, responde con un mensaje de error
        console.error('Error al mostrar las citas del cliente:', error);
        response.status(500).json({ mensaje: 'Error interno del servidor' });
    }

}

const eliminarCitaAdmin = async (request: Request, response: Response) => {
    const { idCitas } = request.params;
    console.log(idCitas)

    try {
        const citaExiste = await Citas.findByPk(idCitas);

        const fechaActual = moment();


        if (!citaExiste) {
            const error = new Error("No se ha encontrado ninguna cita");
            return response.json({ msg: error.message })
        }

       

        // Eliminar las filas relacionadas en la tabla citas_servicios
        await CitasServicios.destroy({ where: { idCitas: idCitas } });


        await Citas.destroy({ where: { idCitas: idCitas } })
        response.json({ msg: "Se ha eliminado la cita, según la política de cita", Citas });


    } catch (error) {

        console.log(error)

    }
}

const eliminarCita = async (request: Request, response: Response) => {
    const { idCitas } = request.params;
    console.log(idCitas)

    try {
        const citaExiste = await Citas.findByPk(idCitas);

        const fechaActual = moment();


        if (!citaExiste) {
            const error = new Error("No se ha encontrado ninguna cita");
            return response.json({ msg: error.message })
        }

        const diferenciaHoras = Math.abs(moment.duration(fechaActual.diff(citaExiste.fecha)).asHours());


        if (diferenciaHoras <= 24) {
            response.status(404).json({ msg: 'No se puede Eliminar la cita dentro de las 24 horas previas a la cita original' })
            return;

        }

        // Eliminar las filas relacionadas en la tabla citas_servicios
        await CitasServicios.destroy({ where: { idCitas: idCitas } });


        await Citas.destroy({ where: { idCitas: idCitas } })
        response.json({ msg: "Se ha eliminado la cita, según la política de cita", Citas });


    } catch (error) {

        console.log(error)

    }





}

const buscarCitaDate = async (request: Request, response: Response) => {
    const { fecha } = request.query;

    try {

        const citas = await Citas.findAll({
            where: {
                fecha: {
                    [Op.eq]: new Date(fecha as string)
                }
            },

            include: [
                {
                    model: Servicios,
                    through: {
                        model: CitasServicios,
                        attributes: ['precioActual']
                    } as any,

                    attributes: ['nombre', 'precio']
                },
                {
                    model: Barbero,
                    attributes: ['idBarberos', 'nombre', 'apellido', 'imagen', 'email']
                },
                {
                    model: Cliente,
                    attributes: ['nombre', 'apellido', 'imagen', 'telefono']
                }
            ],

            attributes: ['fecha', 'hora', 'idCitas', 'estado']
        })

        response.json(citas)

    } catch (error) {
        console.log(error)

    }

}

const buscarCitaEstado = async (request : Request, response: Response) => {
    const { estado } = request.query;

    try {
        const citasByEstado = await Citas.findAll(
            {
                where : {
                    estado : estado
                }, 

                include: [
                    {
                        model: Servicios,
                        through: {
                            model: CitasServicios,
                            attributes: ['precioActual']
                        } as any,

                        attributes: ['nombre', 'precio']
                    },

                    {
                        model: Barbero,
                        attributes: ['idBarberos', 'nombre', 'apellido', 'imagen', 'email']
                    },
                    {
                        model: Cliente,
                        attributes: ['nombre', 'apellido', 'imagen', 'telefono']
                    }

                ]
            }


        )

        if(!citasByEstado){
            const error = new Error("No se han encontrado citas");
            return response.status(400).json({msg : error.message})
        }

        response.json(citasByEstado).status(200)
        
    } catch (error) {
        console.log(error);
    }
}

const buscarCitaBarbero = async (request: Request, response: Response) => {

    const { idBarberos } = request.params;
    console.log(idBarberos)

    if(!idBarberos){
        const error = new Error('No se proporciono un ID');
        console.log(error);
        return;

    }

    try {
        const citasBarberos = await Citas.findAll({
            where : {
                idBarberos
            },

            include: [
                {
                    model: Servicios,
                    through: {
                        model: CitasServicios,
                        attributes: ['precioActual']
                    } as any,

                    attributes: ['nombre']
                },
                {
                    model: Barbero,
                    attributes: ['idBarberos', 'nombre', 'apellido', 'imagen', 'email']
                },
                {
                    model: Cliente,
                    attributes: ['nombre', 'apellido', 'imagen', 'telefono']
                }

            ],

            attributes: ['estado', 'fecha', 'hora', 'idCitas']
        });

        if(!citasBarberos){
            const error = new Error('No se encontraron citas');
            return response.status(400).json({msg: error.message})
        }

        response.json(citasBarberos);
        
    } catch (error) {
        // const err = new Error('Opps Ocurrió un error en el servidor')
        // response.status(400).json({msg : err, error})
        console.log(error)
        
    }

}

const finalizarCita = async ( request : Request, response: Response ) => {

    const { idCitas } = request.params;

    try {

        const cita = await Citas.findByPk(idCitas);

        if(!cita){
            const error = new Error('No se encontro la cita')
            return response.status(400).json({msg: error.message})
        }

        cita.estado = 'Finalizado'
        await cita.save();

        response.json({msg: 'La cita ha sido finalizada'}).status(200)
        
    } catch (error) {
        console.log(error)
    }

}
export {
    reservarCita,
    reprogramarCita,
    eliminarCitaAdmin,
    actualizarCita,
    mostrarCita,
    eliminarCita,
    obtenerCita,
    obtenerCitas,
    obtenerCitasPendientes,
    buscarCitaDate,
    buscarCitaEstado,
    buscarCitaBarbero,
    finalizarCita
}