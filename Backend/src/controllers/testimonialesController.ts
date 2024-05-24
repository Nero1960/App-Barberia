import { Request, Response } from 'express'
import Cliente from "../models/Clientes";
import Testimoniales from "../models/Testimoniales";
import { TestimonialesType } from '../types';
import { json } from 'sequelize';



const nuevoTestimonial = async (request: Request, response: Response) => {

    try {
        const testimonial = new Testimoniales(request.body);
        await testimonial.save();
        response.json({ msg: 'Se ha Guardado Tu Testimonial', testimonial })
    } catch (error) {
        console.log(error)

    }

}

const obtenerTestimoniales = async (request: Request, response: Response) => {

    try {
        const testimoniales = await Testimoniales.findAll({
            where: {
                estado: 'Aprobado'
            },
            include: [
                {
                    model: Cliente,
                    attributes: ['imagen', 'nombre', 'apellido']

                }
            ],
            attributes: ['fecha', 'titulo', 'mensaje', 'estado', 'idTestimoniales']
        })

        response.json(testimoniales);

    } catch (error) {
        console.log(error)
    }

}

const obtenerTestimonialesAdmin = async (request: Request, response: Response) => {

    try {
        const testimoniales = await Testimoniales.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ['imagen', 'nombre', 'apellido']

                }
            ],
            attributes: ['fecha', 'titulo', 'mensaje', 'estado', 'idTestimoniales']
        })

        response.json(testimoniales);

    } catch (error) {
        console.log(error)
    }

}

const obtenerTestimonial = async (request: Request, response: Response) => {
    
    const idTestimoniales : TestimonialesType['idTestimoniales'] | string = request.params.idTestimoniales;

    try {
        const testimonial = await Testimoniales.findByPk(idTestimoniales, {
            include: [
                {
                    model: Cliente,
                    attributes: ['nombre', 'apellido', 'imagen']
                }
            ]

        });
        return response.json(testimonial);
    } catch (error) {
        return response.json({msg: "Error en el servidor"})
    }
}

const permitirTestimonial = async (request: Request, response: Response) => {

    const idTestimoniales : TestimonialesType['idTestimoniales'] | string= request.params.idTestimoniales;

    const testimoniales = await Testimoniales.findByPk(idTestimoniales);

    if(!testimoniales){
        const error = new Error('No se han encontrado testimoniales');
        return response.status(400).json({msg: error.message});
    }

    try {

        testimoniales.estado = 'Aprobado';
        const testimonialAprobado = await testimoniales.save();

        response.json({msg: "Has aprobado este testimonial", testimonialAprobado})
        
        
    } catch (error) {
        console.log(error);
        
    }
}

const desaprobarTestimonial = async (request: Request, response: Response) => {

    const idTestimoniales : TestimonialesType['idTestimoniales'] | string= request.params.idTestimoniales;

    const testimoniales = await Testimoniales.findByPk(idTestimoniales);

    if(!testimoniales){
        const error = new Error('No se han encontrado testimoniales');
        return response.status(400).json({msg: error.message});
    }

    try {

        testimoniales.estado = 'Pendiente';
        const testimonialAprobado = await testimoniales.save();

        response.json({msg: "Has Desaprobado el Testimonial", testimonialAprobado})
        
        
    } catch (error) {
        console.log(error);
        
    }
}

const eliminarTestimonial = async (request: Request, response: Response) => {
    const idTestimoniales : TestimonialesType['idTestimoniales'] | string = request.params.idTestimoniales;

    const testimonial = await Testimoniales.findByPk(idTestimoniales);

    if(!testimonial){
        const error = new Error('No se encontraron resultados')
        return response.status(401).json({msg: error.message})
    }

    try {
        testimonial.destroy();
        response.json({msg: 'Se ha eliminado el testimonial correctamente'})
    } catch (error) {
        const errors = new Error('Error de servidor')
        return response.status(401).json({msg: errors.message})
        
    }
}

export {
    nuevoTestimonial,
    obtenerTestimoniales,
    permitirTestimonial,
    obtenerTestimonial,
    obtenerTestimonialesAdmin,
    eliminarTestimonial,
    desaprobarTestimonial
}