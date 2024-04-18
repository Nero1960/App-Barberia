import { Request, Response, request } from "express";
import Cliente from "../models/Clientes";
import generarId from "../helpers/generarId";
import generarJWT from "../helpers/generarToken";
import emailRegister from "../helpers/sendEmailRegister";
import newPasswordEmail from "../helpers/sendEmailForgotPassword";

type RequestBody = {
    email: string,
    password: string
}

type Requests = Request & {
    cliente?: Cliente
}

const addClient = async (request: Request, response: Response) => {

    const { email } : Cliente = request.body;

    const userExist = await Cliente.findOne({ where: { email } });

    if (userExist) {
        const error = new Error('Este usuario ya existe');
        response.status(404).json({ msg: error.message });
        return;
    }

    try {
        const cliente = new Cliente(request.body);
        const clienteSave = await cliente.save();

        //enviar el email
        emailRegister({
            nombre: cliente.nombre,
            email,
            token: cliente.token
        })
        
        response.json({ msg: 'OK, Revisa tu correo para confirmar tu cuenta', clienteSave })

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

    response.json({ msg: 'Introduce Tu Nueva Contraseña'})
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

    const token = generarJWT({id: cliente.idClientes, admin: cliente.admin})

    response.json({
        idClientes: cliente.idClientes,
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        admin: cliente.admin,
        token,
        msg: 'Inicio de sesión Exitoso.'

    })
}

const perfil = async (request: Request, response: Response) => {
    const { cliente } : Requests = request;
    response.json(cliente);
}


export {
    addClient,
    confirmClient,
    forgotPassword,
    confirmToken,
    newPassword,
    authClient,
    perfil,
}