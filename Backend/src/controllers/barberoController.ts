import { Request, Response } from "express";
import Barbero from "../models/Barberos";
import Cliente from "../models/Clientes";
import { BarberoType } from "../types";


type Requests = Request & {
    cliente?: Cliente
}



const addBarbero = async (request: Requests, response: Response) => {
    const { email, nombre, apellido, telefono, especialidad }: BarberoType = request.body;
     //request.file.filename;
     console.log(email)
     console.log(request.file.filename);

    try {


        if (!request.cliente || !request.cliente.admin) {
            const error = new Error('Acceso no autorizado');
            return response.status(403).json({ msg: error.message });
        }

        const existBarber = await Barbero.findOne({ where: { email } });

        if (existBarber) {
            const error = new Error('Este barbero ya esta registrado');
            return response.status(404).json({ msg: error.message });
        }


        const nuevoBarbero = new Barbero({
            nombre,
            email,
            especialidad,
            apellido,
            telefono,
            imagen: request.file.filename
        });
        await nuevoBarbero.save();


        response.json({ msg: 'Barbero agregado con éxito' });


    } catch (error) {
        response.status(404).json({ msg: 'Oops! ha ocurrido un error' });
        console.log(error)
        process.exit(1);
    }

}

const getBarbero = async (request: Requests, response: Response) => {

    const { idBarbero } = request.params;

    try {
        const barbero = await Barbero.findByPk(idBarbero);

        if (!barbero) {
            const error = new Error('Barbero no encontrado');
            return response.status(404).json({ msg: error.message })
        }

        response.json(barbero);
    } catch (error) {
        response.json({ error })
    }


}

const getBarberoCliente = async (request: Request, response: Response) => {
    const { idBarbero } = request.params;

    try {
        const barbero = await Barbero.findByPk(idBarbero);


        if (!barbero) {
            const error = new Error('Barbero no encontrado');
            return response.status(404).json({ msg: error.message })
        }

        response.json({ nombre: barbero.nombre, apellido: barbero.apellido, especialidad: barbero.especialidad , imagen: barbero.imagen});
    } catch (error) {
        console.log(error)
    }
}

const updateBarbero = async (request: Request, response: Response) => {

    const { idBarbero } = request.params;
    const { nombre, apellido, telefono, email, especialidad }: BarberoType = request.body;

    const barbero = await Barbero.findByPk(idBarbero);

    if (!barbero) {
        const error = new Error('Barbero no encontrado');
        return response.status(404).json({ msg: error.message });
    }

    try {

        barbero.nombre = nombre || barbero.nombre;
        barbero.apellido = apellido || barbero.apellido;
        barbero.telefono = telefono || barbero.telefono;
        barbero.email = email || barbero.email;
        barbero.especialidad = especialidad || barbero.especialidad;

        await barbero.save();
        response.json(barbero);

    } catch (error) {
        console.log(error)
        return response.status(404).json({ msg: 'Oops, ocurrio un error al actualizar el sistema' })
    }
}

const deleteBarbero = async (request: Request, response: Response) => {

    const { idBarbero } = request.params;

    try {
        const barbero = await Barbero.findByPk(idBarbero);

        if (!barbero) {
            const error = new Error('Barbero no encontrado');
            return response.status(404).json({ msg: error.message })
        }

        await barbero.destroy();

        response.json({ msg: 'Barbero eliminado correctamente' });

    } catch (error) {
        console.log(error)
    }

    console.log(idBarbero)
}

const getBarberos = async (request: Request, response: Response) => {

    const barberos = await Barbero.findAll();
    response.json(barberos)

}

export {
    addBarbero,
    getBarbero,
    getBarberoCliente,
    getBarberos,
    updateBarbero,
    deleteBarbero
}