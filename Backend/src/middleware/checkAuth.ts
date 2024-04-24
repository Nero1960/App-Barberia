import jwt from 'jsonwebtoken'
import Cliente from '../models/Clientes'
import { Request, Response, NextFunction } from 'express'

type Datos = {
    nombre: string,
    idClientes : number,
    token : string,
    email: string
}

type Requests = Request & {
    cliente?: Datos
}


const checkAuth = async(request: Requests, response: Response, next: NextFunction) => {
    let token: string;

    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){

        try {
            token = request.headers.authorization.split(" ")[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (typeof decoded === 'string') {
                throw new Error('Token no válido');
            }

            const cliente  = await Cliente.findByPk(decoded.id) ;

            if(!cliente){
                const error = new Error('Usuario no encontrado')
                return response.status(403).json({msg: error.message})

            }

            request.cliente = cliente

            return next();

            
        } catch (error) {
             // Maneja cualquier error que ocurra durante la verificación del token.
             const e = new Error("Token no válido");
             return response.status(403).json({msg: e.message});
        }


    } 

    // Maneja el caso en el que no se proporciona un token válido.
    if(!token){
         const e = new Error("Token no válido o inexistente");
        return response.status(403).json({msg: e.message});
    }
    
    // Llama a la siguiente función en la cadena de middleware.
    next();
} 


export default checkAuth;