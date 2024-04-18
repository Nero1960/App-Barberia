import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

type Data = {
    nombre: string,
    email: string,
    token: string,
}

const emailRegister = async (data: Data) => {

    const transport = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: 2525,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD
        }
    });

    const {nombre, email, token} = data;

    const info = await transport.sendMail({
        from: "Bienvenido a Mojica's BarberShop",
        to: email,
        subject: "Confirma tu cuenta en Mojica's BarberShop",
        text: "Confirmación de cuenta",
        html: `
            <p>Hola ${nombre}, confirma tu cuenta en Mojica's BarberShop.</p>
            <p>Tu cuenta ya esta lista, solo debes confirmarla dando click en el siguiente enlace</p>
            <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Confirmar Cuenta</a>
            <p>Si no has realizado acciones para confirmar cuenta, puedes ignorar el siguiente mensaje</p>
        
        `
    })
}

export default emailRegister;

