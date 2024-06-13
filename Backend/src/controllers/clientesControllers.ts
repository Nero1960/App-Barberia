import { Request, Response } from "express";
import Cliente from "../models/Clientes";
import generarId from "../helpers/generarId";
import generarJWT from "../helpers/generarToken";
import emailRegister from "../helpers/sendEmailRegister";
import newPasswordEmail from "../helpers/sendEmailForgotPassword";
import { ClienteType } from "../types";
import path from "path";
import fs from 'fs';
import { Op } from "sequelize";

type RequestBody = {
    email: string,
    password: string
}


type Requests = Request & {
    cliente?: Cliente
}

const addClient = async (request: Request, response: Response) => {

    const { email }: Cliente = request.body;


    const userExist = await Cliente.findOne({ where: { email } });


    if (userExist) {
        const error = new Error('Este usuario ya existe');
        response.status(404).json({ msg: error.message });
        return;
    }

    // const imagenDefault = path.join(__dirname, 'uploads', 'defaultImage.jpg');
    // console.log(imagenDefault);

    try {
        const cliente = new Cliente(request.body);
        const clienteSave = await cliente.save();

        //enviar el email
        emailRegister({
            nombre: cliente.nombre,
            email,
            token: cliente.token
        })

        response.json({ msg: 'Revisa tu correo para confirmar tu cuenta', clienteSave })

    } catch (error) {
        response.status(404).json({ msg: 'Oops! Ha ocurrido un error inesperado' });
    }

}

const confirmClient = async (request: Request, response: Response) => {
    console.log(request.params.token)
    const { token } = request.params;


    const confirmClient = await Cliente.findOne({ where: { token } });

    if (!confirmClient) {
        const error = new Error('El token no es valido')
        return response.status(400).json({ msg: error.message })
    }

    try {

        confirmClient.token = null;
        confirmClient.confirmado = 1;

        await confirmClient.save();

        response.json({ msg: 'Cuenta confirmada correctamente, Ya puedes Iniciar Sesión' })

    } catch (error) {
        response.json({ msg: error })

    }

}

const forgotPassword = async (request: Request, response: Response) => {
    const { email }: RequestBody = request.body;

    const confirmClient = await Cliente.findOne({ where: { email } });

    if (!confirmClient) {
        const error = new Error('El usuario no existe');
        return response.status(404).json({ msg: error.message });
    }

    try {

        confirmClient.token = generarId();
        await confirmClient.save();
        response.json({ msg: 'Revisa tu correo electrónico, hemos enviado un email con las instrucciones' })

        //enviar el email
        newPasswordEmail({
            nombre: confirmClient.nombre,
            email,
            token: confirmClient.token
        })


    } catch (error) {

        response.json({ msg: 'Oops, ha ocurrido un error inesperado' })
        response.json({ error })
        process.exit(1);

    }
}

const confirmToken = async (request: Request, response: Response) => {
    const { token } = request.params;

    const tokenExist = await Cliente.findOne({ where: { token } });

    if (!tokenExist) {
        const error = new Error('El token no es valido');
        return response.status(404).json({ msg: error.message })
    }

    response.json({ msg: 'Introduce Tu Nueva Contraseña' })
}

const newPassword = async (request: Request, response: Response) => {
    const { token } = request.params;
    const { password } = request.body;

    const confirmClient = await Cliente.findOne({ where: { token } })

    if (!confirmClient) {
        const error = new Error('El token no es valido')
        return response.status(404).json({ msg: error.message });
    }

    try {
        confirmClient.password = password;
        confirmClient.token = null;

        await confirmClient.save();

        response.json({ msg: "Contraseña actualizada correctamente" })

    } catch (error) {
        console.log(error);
    }

}

const authClient = async (request: Request, response: Response) => {
    const { email, password }: RequestBody = request.body;

    const cliente = await Cliente.findOne({ where: { email } });

    if (!cliente) {
        const error = new Error('El usuario no existe');
        return response.status(404).json({ msg: error.message })
    }

    if (!cliente.confirmado) {
        const error = new Error('El usuario no ha confirmado su cuenta');
        return response.status(404).json({ msg: error.message });
    }

    if (!(await cliente.comparePassword(password))) {
        const error = new Error('Las contraseñas no Coinciden');
        return response.status(404).json({ msg: error.message })

    }

    const token = generarJWT({ id: cliente.idClientes, admin: cliente.admin })

    response.json({
        idClientes: cliente.idClientes,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        direccion: cliente.direccion,
        email: cliente.email,
        telefono: cliente.telefono,
        admin: cliente.admin,
        imagen: cliente.imagen,
        token,
        msg: 'Inicio de sesión Exitoso.'

    })
}

const perfil = async (request: Request, response: Response) => {
    const { cliente }: Requests = request;
    response.json(cliente);
}

const actualizarPerfil = async (request: Request, response: Response) => {

    const { cliente }: Requests = request;
    const { nombre, apellido, direccion, email, telefono }: ClienteType = request.body;

    const clienteExiste = await Cliente.findByPk(cliente.idClientes);



    if (!clienteExiste) {
        const error = new Error('El Cliente no existe')
        response.status(400).json({ msg: error.message })
        return;
    }

    // Obtener la imagen de perfil previa del cliente, si existe
    const imagenPrevia = clienteExiste.imagen;

    // Verificar si se ha subido un archivo
    if (request.file) {
        cliente.imagen = request.file.filename;

        if (imagenPrevia && imagenPrevia !== 'default.png') {
            const rutaImagenPrevia = path.join(__dirname, '..', 'uploads', imagenPrevia);
            fs.unlinkSync(rutaImagenPrevia);

        }
    }

    try {

        cliente.nombre = nombre || cliente.nombre;
        cliente.apellido = apellido || cliente.apellido;
        cliente.email = email || cliente.email;
        cliente.telefono = telefono || cliente.telefono;
        cliente.direccion = direccion || cliente.direccion;

        await cliente.save();

        response.json({ msg: 'Perfil Actualizado con éxito', cliente })

    } catch (error) {

        console.error(error);
        response.status(500).json({ msg: 'Ocurrió un error al actualizar el perfil' });

    }


}

const obtenerTotalCliente = async (request: Request, response: Response) => {

    try {
        const totalCliente = await Cliente.count();
        response.status(200).json(totalCliente);
    } catch (error) {
        const errors = new Error('Error al contar los clientes');
        response.status(403).json({ msg: errors.message });

    }
}

const obtenerUltimosClientes = async (request: Request, response: Response) => {
    try {
        // Consulta para obtener los últimos clientes registrados
        const ultimosClientes = await Cliente.findAll({
            order: [['idClientes', 'DESC']], // Ordenar por ID en orden descendente
            limit: 3 // Obtener los últimos 5 clientes
        });
        response.status(200).json(ultimosClientes);
    } catch (error) {
        console.error('Error al obtener los últimos clientes:', error);
        response.status(500).json({ error: 'Ocurrió un error al obtener los últimos clientes' });
    }

}

const obtenerClientes = async (request : Request, response: Response) => {
    try {
        const clientes = await Cliente.findAll();
        response.json(clientes);
    } catch (error) {
        console.log(error)
    }

}

const buscarCliente = async (request: Request, response: Response) => {

    const { nombre } = request.query;
    console.log(nombre);

    try {
        const cliente = await Cliente.findAll({
            where: {
                nombre: {
                    [Op.like] : `%${nombre}%`
                }
            },
            attributes: ['nombre', 'apellido', 'imagen', 'email', 'telefono', 'direccion']
        })

        response.json(cliente);
    } catch (error) {
        console.log(error)
    }
}

export {
    addClient,
    confirmClient,
    forgotPassword,
    confirmToken,
    newPassword,
    authClient,
    actualizarPerfil,
    perfil,
    obtenerClientes,
    obtenerTotalCliente,
    obtenerUltimosClientes,
    buscarCliente
}