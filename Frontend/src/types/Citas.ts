export type Citas = {
    idCitas: number,
    fecha: string,
    hora: string,
    idBarberos: number,
    idClientes: number,
    servicios: [
        nombre: string,
        precio: number
    ]
}

export type CitaConDetalle = {
    barbero: {
        nombre: string;
        apellido: string;
        imagen: string;
        email: string
        telefono: string
    };
    cliente: {
        nombre: string,
        imagen: string,
        apellido: string
        telefono: string
    }
    fecha: string;
    hora: string;
    idCitas: number;
    estado: string;
    servicios: {
        nombre: string;
        precio: number;
        CitasServicios: {
            precioActual : number;
        }
    }[];
};