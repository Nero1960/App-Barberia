import { Op, QueryTypes, col, fn } from "sequelize";
import moment from 'moment-timezone'
import Citas from "../models/Citas";
import CitasServicios from "../models/CitasServicios";
import { Request, Response } from "express";
import Barberos from "../models/Barberos";
import db from "../config/database";
import Clientes from "../models/Clientes";
import sequelize from "sequelize/lib/sequelize";
import Servicios from "../models/Servicios";


const ingresosCitasMes = async (request: Request, response: Response) => {

    const { mes, year } = request.query;

    if (!mes || !year) {
        return response.status(400).json({ error: 'Debe proporcionar el mes y el year' });
    }


    const query = `
         SELECT
            COUNT(DISTINCT citas.idCitas) AS totalCitas,
            SUM(citas_servicios.precioActual) AS ingresos
        FROM
            citas
        INNER JOIN citas_servicios ON citas.idCitas = citas_servicios.idCitas
        WHERE
            MONTH(citas.fecha) = :mes
        AND 
            YEAR(citas.fecha) = :year
        GROUP BY
            YEAR(citas.fecha), MONTH(citas.fecha)
        ORDER BY
            YEAR(citas.fecha), MONTH(citas.fecha)

      
        
    `;

    try {
        const resultado = await db.query(query, {
            type: QueryTypes.SELECT,
            replacements: { mes, year },
            mapToModel: true, // Mapea automáticamente los resultados a modelos Sequelize si están definidos
            raw: false,
        })

        response.json(resultado);

    } catch (error) {
        console.log(error)

    }

}

const ingresosPerBarberos = async (request: Request, response: Response) => {

    const { mes, year } = request.query;

    if (!mes || !year) {
        return response.status(400).json({ error: 'Debe proporcionar el mes y el year' });
    }


    const query = `
        SELECT
            barberos.idBarberos,
            barberos.nombre,
            barberos.apellido,
            barberos.imagen,
            barberos.telefono,
            barberos.email,
            COUNT(DISTINCT citas.idCitas) as citas_atendidas,
            SUM(citas_servicios.precioActual) AS ingresos_generados
        FROM
            citas 
            INNER JOIN barberos  ON citas.idBarberos = barberos.idBarberos
            INNER JOIN citas_servicios  ON citas.idCitas = citas_servicios.idCitas
            INNER JOIN servicios  ON citas_servicios.idServicios = servicios.idServicios
        WHERE
            MONTH(citas.fecha) = :mes -- Aquí pones el número del mes que te interesa, por ejemplo, junio (6)
            AND YEAR(citas.fecha) = :year  -- Aquí pones el año que te interesa, por ejemplo, 2024
        GROUP BY
            barberos.idBarberos, barberos.nombre
        ORDER BY
            ingresos_generados DESC;  -- Opcional: puedes ordenar por ingresos generados de forma descendente
    `;

    try {
        const resultado = await db.query(query, {
            type: QueryTypes.SELECT,
            replacements: { mes, year },
            mapToModel: true, // Mapea automáticamente los resultados a modelos Sequelize si están definidos
            model: Barberos, // Modelo Sequelize a mapear si es necesario
            raw: false,
        })

        response.json(resultado);

    } catch (error) {
        console.log(error)

    }

}

const clientesMasFrecuentados = async (request: Request, response: Response) => {
    try {
        const resultados = await Citas.findAll({
            attributes: [
                'idClientes',
                [fn('COUNT', col('idCitas')), 'numCitas'],
            ],
            include: [
                {
                    model: Clientes,
                    attributes: ['nombre', 'apellido', 'imagen', 'email', 'telefono', 'direccion'],
                },
            ],
            group: ['idClientes'],
            order: [[sequelize.literal('numCitas'), 'DESC']],
            limit: 3
        });

        response.json(resultados);

    } catch (error) {
        console.error('Error al obtener clientes más frecuentados:', error);
        throw error;
    }
}

const ingresosCitasDia = async (request: Request, response: Response) => {

    const { fecha } = request.query;

    if (!fecha) {
        const error = new Error('No se ha proporcionado una fecha');
        return response.status(400).json({ msg: error.message });

    }

    try {

        //obtener el total de citas
        const totalCitasDia = await Citas.count({
            where: {
                fecha: {
                    [Op.eq]: new Date(fecha as string)
                }
            },
        });

        //obtener el total de ingresos por dia
        const totalPrecio = await CitasServicios.findAll({
            attributes: [
                [fn('SUM', col('precioActual')), 'precioActual']
            ],
            where: {
                '$Cita.fecha$': {
                    [Op.eq]: new Date(fecha as string),
                }
            },
            include: [{
                model: Citas,
                attributes: [],
                where: {
                    fecha: {
                        [Op.eq]: new Date(fecha as string),

                    }
                }
            }],
            group: ['CitasServicios.idCitas'], // Agrupar por el identificador único de la cita
        });

        // Calcular los ingresos sumando los precios actuales de los servicios asociados
        const ingresos = totalPrecio.reduce((total: number, cita: CitasServicios) => total + Number(cita.precioActual), 0)

        response.json({ totalCitasDia, ingresos });


    } catch (error) {
        const err = new Error('Oops, Error en el servidor');
        return response.status(400).json({ msg: err.message, error })
    }


}

const ingresosPerBarberosDia = async (request: Request, response: Response) => {
    const { fecha } = request.query;

    if (!fecha) {
        return response.status(400).json({ error: 'Debe proporcionar una fecha' });
    }

    try {

        const query = `
            SELECT
                barberos.idBarberos,
                barberos.nombre,
                barberos.apellido,
                barberos.imagen,
                barberos.telefono,
                barberos.email,
                COUNT(DISTINCT citas.idCitas) as citas_atendidas,
                SUM(citas_servicios.precioActual) AS ingresos_generados
            FROM
                citas
            INNER JOIN barberos ON citas.idBarberos = barberos.idBarberos
            INNER JOIN citas_servicios ON citas.idCitas = citas_servicios.idCitas
            INNER JOIN servicios ON citas_servicios.idServicios = servicios.idServicios
            WHERE
                citas.fecha = :fecha
            GROUP BY
                barberos.idBarberos,
                barberos.nombre
            ORDER BY
                ingresos_generados DESC; 
        `

        const resultado = await db.query(query, {
            type: QueryTypes.SELECT,
            replacements: { fecha },
            mapToModel: true, // Mapea automáticamente los resultados a modelos Sequelize si están definidos
            model: Barberos, // Modelo Sequelize a mapear si es necesario
            raw: false,
        })

        response.json(resultado);

    } catch (error) {
        const err = new Error('Oops, Error en el servidor');
        console.log(error)
        return response.status(400).json({ msg: err.message, error })
    }

}

const actividadBarberos = async (request: Request, response: Response) => {
    const { idBarberos, fecha } = request.body;

    if (!idBarberos || !fecha) {
        const error = new Error('No se han proporcionado los datos');
        return response.status(400).json({ msg: error });
    }

    try {
        const resultado = await Citas.findAll({

            where: {
                idBarberos: idBarberos,
                fecha: new Date(fecha as string)
            },

            include: [
                {
                    model: Clientes,
                    attributes: ['nombre', 'imagen', 'apellido', 'email', 'telefono']
                },

                {
                    model: Barberos,
                    attributes: ['nombre', 'apellido', 'imagen', 'especialidad', 'email', 'telefono']
                },

                {
                    model: Servicios,
                    through: {
                        model: CitasServicios,
                        attributes: ['precioActual']
                    } as any,
                    attributes: ['nombre']
                }
            ]
        });

        response.json(resultado);
    } catch (error) {
        console.log(error)

    }
}

export {
    ingresosCitasMes,
    ingresosCitasDia,
    ingresosPerBarberos,
    ingresosPerBarberosDia,
    clientesMasFrecuentados,
    actividadBarberos
}