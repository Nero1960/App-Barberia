import { Page, Text, View, Document, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { CitaConDetalle } from '../types/Citas';  // Ajusta la ruta según tu estructura de proyecto
import imagen from '../public/logo2.png'
import formatFecha from '../helpers/FormatFecha';
import formatHora from '../helpers/FormatHora';
import formatToCordobas from '../helpers/formatDinero';
import saveAs from 'file-saver';

// Define los estilos
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 6,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: '50%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    column: {
        flex: 1,
        paddingHorizontal: 5,
    },
    total: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10,
    },
    img: {
        width: '180',
        marginHorizontal: '155',
        marginVertical: '0',
        height: '100',
        borderRadius: 20,
        marginRight: 10,

    },
});
type GeneratePdfProps = {
    barberosQuery: CitaConDetalle[];
};

const generatePdfDocument = async ({ barberosQuery }: GeneratePdfProps) => {
    const asPdf = pdf(<PdfBarbero barberos={barberosQuery} />); // Crea una instancia del documento PDF
    const blob = await asPdf.toBlob(); // Convierte el documento PDF a un blob

    saveAs(blob, 'Reporte_Barbero.pdf'); // Guarda el PDF en el disco
};



const PdfBarbero = ({ barberos }: { barberos: CitaConDetalle[] }) => (
    <Document>
        {barberos.map(barbero => (
            <Page size="A4" style={styles.page} key={barbero.barbero.email}>
                <Text style={styles.heading}>Mojica's BarberShop Reporte</Text>
                <Text style={styles.heading}>{formatFecha(barbero.fecha)}</Text>

                <Image src={imagen} style={styles.img} />
                <View style={styles.section}>
                    <Text style={styles.heading}>Resumen De Actividades del barbero {barbero.barbero.nombre}</Text>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.subheading}>Barbero</Text>
                            <Image src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.barbero.imagen}`} style={styles.image} />
                            <Text style={styles.text}>{barbero.barbero.nombre} {barbero.barbero.apellido}</Text>
                            <Text style={styles.text}>{barbero.barbero.email}</Text>
                            <Text style={styles.text}>{barbero.barbero.telefono}</Text>
                        </View>

                        <View style={styles.column}>
                            <Text style={styles.subheading}>Información de la cita</Text>
                            <Image src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.cliente.imagen}`} style={styles.image} />
                            <Text style={styles.text}>{barbero.cliente.nombre} {barbero.cliente.apellido}</Text>
                            <Text style={styles.text}>{barbero.cliente.email}</Text>
                            <Text style={styles.text}>{barbero.cliente.telefono}</Text>
                            <Text style={styles.text}>Fecha: {formatFecha(barbero.fecha)}</Text>
                            <Text style={styles.text}>Hora: {formatHora(barbero.hora)}</Text>
                            <Text style={styles.text}>Estado: {barbero.estado}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.subheading}>Servicios Atendidos</Text>
                        {barbero.servicios.map(servicio => (
                            <View key={servicio.nombre} style={styles.row}>
                                <Text style={styles.text}>{servicio.nombre}</Text>
                                <Text style={styles.text}>{formatToCordobas(servicio.CitasServicios.precioActual)}</Text>
                            </View>
                        ))}
                        <Text style={styles.row}>
                            Total: {formatToCordobas(barbero.servicios.reduce((total, servicio) => total + servicio.CitasServicios.precioActual, 0))}
                        </Text>
                    </View>
                </View>
            </Page>
        ))}
    </Document>
);

export default PdfBarbero;


export {
    generatePdfDocument
}