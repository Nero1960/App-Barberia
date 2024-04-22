 export default function formatHora(hora: string): string {
    const [hour, minute] = hora.split(':').map(Number);
    const amPm = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${amPm}`;
}