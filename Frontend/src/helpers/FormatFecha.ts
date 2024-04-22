export  default function formatFecha(fecha: string): string {
    const date = new Date(fecha);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

