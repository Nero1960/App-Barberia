export type DataType = {
    nombre: string,
    email: string,
    token: string,
    admin: number,
    msg: string
}

export type DataEmail = Pick<DataType, 'email'>;
