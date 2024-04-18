import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

type Data = {
    nombre: string,
    email: string,
    token: string,
}

const newPasswordEmail = async (data: Data) => {

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
        from: "Mojica's BarberShop",
        to: email,
        subject: "Solicitud para Restablecer Contraseña",
        text: "Restablecer Contraseña",
        html: `
            <p>Hola ${nombre}, Has Solicitado restablecer tu Contraseña en Mojica's BarberShop.</p>
            <p>Para Generar una nueva Contraseña, solo debes dar click en el siguiente enlace</p>
            <a href='${process.env.FRONTEND_URL}/olvide-password/${token}'>Restablecer Contraseña</a>
            <p>Si no has realizado acciones para restablecer la contraseña, puedes ignorar el siguiente mensaje</p>
        `
    })
}

export default newPasswordEmail;
