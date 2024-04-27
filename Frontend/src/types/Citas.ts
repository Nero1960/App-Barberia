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
    };
    fecha: string;
    hora: string;
    idCitas: number
    servicios: {
        nombre: string;
        precio: number;
    }[];
};