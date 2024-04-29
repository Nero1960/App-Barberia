export  default function formatFecha(fecha: string): string {
    const date = new Date(fecha + 'T00:00:00-06:00');
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

