function formatToCordobas(amount: number): string {
    const formatter = new Intl.NumberFormat('es-NI', {
        style: 'currency',
        currency: 'NIO'
    });
    return formatter.format(amount);
}

export default formatToCordobas;