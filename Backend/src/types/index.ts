type BarberoType = {
    idBarbero: number,
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    especialidad: string,
    imagen: string
}

type ClienteType = {
    idCliente: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    password: string,
    token: string,
    confirmado: number,
    direccion: string,
    imagen: string

}

type ServicioType = {
    idServicio: number,
    nombre: string,
    precio: number
}

export {
    BarberoType, ClienteType, ServicioType
}