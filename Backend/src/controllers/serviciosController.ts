import { Response, Request, response } from "express";
import Servicios from "../models/Servicios";
import { ServicioType } from "../types";
import sequelize from "sequelize/lib/sequelize";
import Citas from "../models/Citas";
import CitasServicios from "../models/CitasServicios";
import { Sequelize } from "sequelize-typescript";

const addService = async (request: Request, response: Response) => {

    const { nombre }: ServicioType = request.body;

    try {

        const existService = await Servicios.findOne({ where: { nombre } });

        if (existService) {
            const error = new Error('Este servicio ya existe');
            return response.status(404).json({ msg: error.message });
        }

        const servicio = new Servicios(request.body);
        await servicio.save();
        response.json({ msg: 'Servicio agregado correctamente' });

    } catch (error) {
        console.log(error);
    }


}

const getService = async (request: Request, response: Response) => {
    const { idServicio } = request.params;

    try {

        const servicio = await Servicios.findByPk(idServicio);

        if (!servicio) {
            const error = new Error('El servicio no existe');
            return response.status(404).json({ msg: error.message });
        }

        response.json(servicio);

    } catch (error) {
        console.log(error)
    }
}

const getServices = async (request: Request, response: Response) => {

    try {

        const servicios = await Servicios.findAll();
        response.json(servicios);

    } catch (error) {
        console.log(error);
    }
}

const updateService = async (request: Request, response: Response) => {
    const { idServicio } = request.params;
    const { nombre, precio }: ServicioType = request.body;


    try {
        const servicio = await Servicios.findByPk(idServicio);

        if (!servicio) {
            const error = new Error('El servicio no existe')
            return response.status(404).json({ msg: error.message });
        }

        servicio.nombre = nombre || servicio.nombre;
        servicio.precio = precio || servicio.precio;

        await servicio.save();

        response.json({ msg: 'Servicio actualizado con éxito' });


    } catch (error) {
        console.log(error);
    }
}

const deleteService = async (request: Request, response: Response) => {
    const { idServicio } = request.params;

    try {
        const servicio = await Servicios.findByPk(idServicio);

        if (!servicio) {
            const error = new Error('El servicio no existe');
            return response.status(404).json({ msg: error.message });

        }

        await servicio.destroy();

        response.json({ msg: 'Servicio eliminado correctamente' })
    } catch (error) {
        console.log(error);


    }
}

const obtenerTotalServicios = async (request: Request, response: Response) => {
    try {
        const totalServicios = await Servicios.count();

        response.json(totalServicios)

    } catch (error) {
        console.log(error)
    }
}

// Función asincrónica para obtener los servicios más solicitados
const obtenerServiciosMasSolicitados = async (request: Request, response: Response) => {
    try {
        const topServicios = await CitasServicios.findAll({
            attributes: [
                'idServicios',
                [Sequelize.fn('COUNT', Sequelize.col('CitasServicios.idServicios')), 'count']
            ],
            group: ['idServicios'],
            order: [[Sequelize.literal('count'), 'DESC']],
            limit: 3,
            include: [
                {
                    model: Servicios,
                    attributes: ['idServicios' ,'nombre', 'precio']
                }
            ]
        });


        // Mapear resultados y manejar potenciales undefined
        const result = topServicios.map(entry => ({
            idServicios : entry.servicio ? entry.servicio.idServicios : 'Desconocido',
            nombre: entry.servicio ? entry.servicio.nombre : 'Desconocido',
            precio: entry.servicio ? entry.servicio.precio : 'Desconocido',
            count: entry.get('count')
        }));

        response.json(result)

    } catch (error) {
        console.error('Error obteniendo los servicios más solicitados:', error);
    }
};

export {
    addService,
    getService,
    getServices,
    updateService,
    deleteService,
    obtenerTotalServicios,
    obtenerServiciosMasSolicitados
}