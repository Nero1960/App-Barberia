import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Cliente from '../models/Clientes';

type CustomRequest = Request & { cliente?: Cliente };

const checkAdmin = async (request: CustomRequest, response: Response, next: NextFunction) => {
    // Verifica si hay un token de autorización en el encabezado
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrae el token de autorización del encabezado
            const token = request.headers.authorization.split(' ')[1];

            // Verifica el token y extrae la ID del cliente
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };

            // Busca al cliente en la base de datos utilizando la ID del token decodificado
            const cliente = await Cliente.findByPk(decoded.id, {
                attributes: ['nombre', 'email', 'idClientes', 'admin']
            });

            // Verifica si el cliente existe y si es administrador
            if (cliente && cliente.admin) {
                // Si el cliente es un administrador, permite que la solicitud continúe
                request.cliente = cliente;
                return next();
            } else {
                // Si el cliente no es un administrador, devuelve un error de permiso denegado
                return response.status(403).json({ error: 'Permiso denegado: solo los administradores pueden acceder a esta función.' });
            }
        } catch (error) {
            // Maneja cualquier error que ocurra durante la verificación del token
            console.error(error);
            return response.status(401).json({ error: 'Token inválido' });
        }
    } else {
        // Si no se proporciona un token de autorización, devuelve un error de token no válido
        return response.status(401).json({ error: 'Token no válido' });
    }
};

export default checkAdmin;
