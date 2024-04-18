const validarHora = (hora: string): boolean => {
    // Parsear la hora en formato HH:MM a un objeto Date
    const horaSeleccionada = new Date(`2000-01-01T${hora}`);

    // Crear objetos Date para las horas de inicio y fin del rango permitido
    const horaInicio = new Date(`2000-01-01T09:00`);
    const horaFin = new Date(`2000-01-01T18:00`);

    // Validar si la hora seleccionada está dentro del rango permitido
    return horaSeleccionada >= horaInicio && horaSeleccionada <= horaFin;
};

export default validarHora;