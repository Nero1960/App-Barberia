import { Op, QueryTypes, col, fn } from "sequelize";
import Citas from "../models/Citas";
import Servicios from "../models/Servicios";
import CitasServicios from "../models/CitasServicios";
import { Request, Response } from "express";
import Barberos from "../models/Barberos";
import db from "../config/database";
import Clientes from "../models/Clientes";
import sequelize from "sequelize/lib/sequelize";


const ingresosCitasMes = async (request: Request, response: Response) => {

    try {
        const { mes, year } = request.query;

        if (!mes || !year) {
            return response.status(400).json({ error: 'Debe proporcionar el mes y el year' });
        }

        const inicioMes = new Date(Number(year), Number(mes) - 1, 1);
        const finMes = new Date(Number(year), Number(mes), 1);

        const totalCitas = await Citas.count({
            where: {
                fecha: {
                    [Op.gte]: inicioMes,
                    [Op.lt]: finMes
                }
            }
        });

        // Obtener el total de ingresos
        const totalPrecio = await CitasServicios.findAll({
            attributes: [
                [fn('SUM', col('precioActual')), 'precioActual']
            ],
            where: {
                '$Cita.fecha$': {
                    [Op.gte]: inicioMes,
                    [Op.lt]: finMes
                }
            },
            include: [{
                model: Citas,
                attributes: [],
                where: {
                    fecha: {
                        [Op.gte]: inicioMes,
                        [Op.lt]: finMes
                    }
                }
            }],
            group: ['CitasServicios.idCitas'], // Agrupar por el identificador único de la cita
        });

        // Calcular los ingresos sumando los precios actuales de los servicios asociados
        const ingresos = totalPrecio.reduce((total: number, cita: CitasServicios) => total + Number(cita.precioActual), 0)

        response.json({ totalCitas, ingresos });

    } catch (err) {
        response.status(500).json({ error: err.message });
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


export {
    ingresosCitasMes,
    ingresosPerBarberos,
    clientesMasFrecuentados
}