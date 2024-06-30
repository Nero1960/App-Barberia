import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver'
import imagen from '../public/logo2.png'
import formatToCordobas from '../helpers/formatDinero';
import formatFecha from '../helpers/FormatFecha';

// types.ts

export interface Barbero {
    idBarberos: number;
    imagen: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    ingresos_generados: number;
    citas_atendidas: number;
}


export interface PDFReportProps {
    queryFecha: string;
    barberos: Barbero[];
    totalCitas: number;
    ingresos: number
}


// Define estilos para el documento PDF
const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: '#FFFFFF'
    },
    section: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    header: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'semibold',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        textAlign: 'center',

    },
    form: {
        marginBottom: 20,
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        color: '#000000',
        fontWeight: 'normal',
        fontSize: 16,
        marginBottom: 8,
        paddingHorizontal: 20
    },
    select: {
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#e1e1e1e1',
        color: '#000000',
    },
    textWhite: {
        color: 'white',
    },
    table: {
        width: '100vw',
        borderCollapse: 'collapse',
        backgroundColor: '#000',
        padding: 50,
        marginVertical: 50,
        border: "gray"
    },
    tableHeader: {
        backgroundColor: '#ffffffff',
        color: 'white',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 13
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#ffffffff',
        borderBottom: '1px solid #gray',
    },
    tableCell: {
        padding: 6,
        color: '#000',
        flex: 1,
    },
    img: {
        width: '180',
        marginHorizontal: '155',
        marginVertical: '0',
        height: '100',
        borderRadius: 20,
        marginRight: 10,

    },

    imagenPerfil: {
        width: 100,
        height: 30,
        objectFit: 'cover',
        borderRadius: 100

    },

    parrafos: {
        color: '#000000',
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'center'

    },

    flex: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5

    },
    mb10: {
        marginBottom: 10,
    },
    mb5: {
        marginBottom: 5,
    },

    mbY: {
        marginVertical: 30
    },
    mbYY: {
        marginTop: 80
    },

    heading: {
        textAlign: 'center',
        fontSize: '25',
        color: '#000000',
        fontWeight: 'black'

    },
    span: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'black'
    },

    pTable: {
        fontSize: 10,
        textAlign: 'center'

    },

    pTablemt: {
        paddingTop: '40px',
        fontSize: 10
    }


});

// Función para generar y descargar el PDF
const generatePDF = async (props: PDFReportProps) => {
    const blob = await pdf(<PDFReport {...props} />).toBlob();
    saveAs(blob, 'reporte.pdf');
};

// Componente de tabla
const Table: React.FC<{ headers: string[], data: React.ReactNode[][] }> = ({ headers, data }) => (
    <View>
        <View style={[styles.tableRow, styles.tableHeader]}>
            {headers.map((header, index) => (
                <Text style={styles.tableCell} key={index}>{header}</Text>
            ))}
        </View>
        {data.map((row, index) => (
            <View style={styles.tableRow} key={index}>
                {row.map((cell, cellIndex) => (
                    <Text style={styles.tableCell} key={cellIndex}>{cell}</Text>
                ))}
            </View>
        ))}
    </View>
);

// Componente de reporte PDF
const PDFReport: React.FC<PDFReportProps> = ({ queryFecha, ingresos, barberos, totalCitas }) => (

    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.heading}>Mojica's BarberShop Reporte</Text>
            <Image src={imagen} style={styles.img} />
            <View style={styles.section}>
                <Text style={styles.header}>
                    Reporte de Ingresos de la barbería por Día
                </Text>
                <View style={styles.form}>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>Día</Text>
                            <Text style={styles.select}>{formatFecha(queryFecha)}</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={[styles.textWhite, styles.mb10]}>
                    <Text style={styles.parrafos}>El Día {formatFecha(queryFecha)} se han realizado un total de <Text style={styles.span}>{totalCitas}</Text> citas</Text>
                    <Text style={styles.parrafos}>Ingresos Totales por las citas realizadas: <Text style={styles.span}>{formatToCordobas(ingresos)}</Text> </Text>
                </View>
                <View>
                    <Text style={[styles.header, styles.mbY]}>
                        Actividades por Barbero
                    </Text>
                    <Table
                        headers={['Nombre', 'Teléfono', 'Ingresos', 'Total Citas']}
                        data={barberos.map(barbero => ([
                            <View key={barbero.idBarberos} style={styles.flex}>

                                <View >
                                    <Image style={styles.imagenPerfil} src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.imagen}`} />
                                    <Text style={styles.pTable}>{barbero.nombre} {barbero.apellido}</Text>

                                </View>
                            </View>,
                            <Text style={styles.pTablemt}>{barbero.telefono}</Text>,
                            <Text style={styles.pTablemt}>{formatToCordobas(barbero.ingresos_generados)}</Text>,
                            <Text style={styles.pTablemt}>{barbero.citas_atendidas}</Text>,


                        ]))}
                    />
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFReport;
export { generatePDF };
