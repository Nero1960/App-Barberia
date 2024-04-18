import { Request, Response } from "express";
import moment from 'moment';
import Citas from "../models/Citas";
import Cliente from "../models/Clientes";
import Barbero from "../models/Barberos";
import CitasServicios from "../models/CitasServicios";
import sequelize from "sequelize/lib/sequelize";
import validarHora from "../helpers/validarHora";

type RequestCustom = Request & {
    cliente?: Cliente
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

        if(!validarHora(hora)){
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
                const citasServicio = new CitasServicios({
                    idCitas: nuevaCita.idCitas,
                    idServicios: servicioID
                });
                await citasServicio.save();
            }));
        }

        response.json({msg: 'La cita se ha reservado Correctamente'});


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

    const { idCita } = request.params;
    const { idBarberos, servicios }: Citas = request.body;

    console.log(idCita)

    try {
        const cita = await Citas.findByPk(idCita, {
            include: [CitasServicios]
        })

        if (!cita) {
            const error = new Error('No se ha encontrado una cita');
            return response.status(404).json({ msg: error.message });
        }

        if (!barberoDisponible(idBarberos, cita.fecha, cita.hora)) {
            const error = new Error('El barbero seleccionado no esta disponible en la fecha y hora proporcionada');
            return response.status(404).json({ msg: error.message });
        }

        cita.idBarberos = idBarberos || cita.idBarberos;

        // Eliminamos todos los servicios asociados a la cita
        await CitasServicios.destroy({ where: { idCita } });

        // Creamos los nuevos servicios para la cita
        const nuevosServicios = servicios.map(servicio => ({ idCita, idServicios: servicio.idServicios }));
        await CitasServicios.bulkCreate(nuevosServicios);


        await cita.save();

        response.json({ msg: 'Cita actualizada con éxito', cita })


    } catch (error) {
        console.log(error)
    }
}

export {
    reservarCita,
    reprogramarCita,
    actualizarCita
}