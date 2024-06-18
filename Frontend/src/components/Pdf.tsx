import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver'
import imagen from '../public/logo2.png'
import formatToCordobas from '../helpers/formatDinero';

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

export interface Cliente {
    idClientes: number;
    cliente: {
        imagen: string;
        nombre: string;
        apellido: string;
        email: string;
        telefono: string;
        direccion: string;
    };
    numCitas: number;
}

export interface PDFReportProps {
    queryMes: number;
    queryYear: number;
    meses: string[];
    years: number[];
    actividad: Barbero[];
    total: number;
    clientes: Cliente[];
    mes: number
}


// Define estilos para el documento PDF
const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: '#0F0F0F'
    },
    section: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#0f0f0f',
    },
    header: {
        color: '#E8E8E8',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        textAlign: 'center'
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
        color: '#AAA',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        paddingHorizontal: 20
    },
    select: {
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#D6A354',
        color: 'white',
    },
    textWhite: {
        color: 'white',
    },
    table: {
        width: '100vw',
        borderCollapse: 'collapse',
        backgroundColor: '#1A1A1A',
        padding: 50,
        marginVertical: 50
    },
    tableHeader: {
        backgroundColor: '#1A1A1A',
        color: 'white',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 13
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A',
        borderBottom: '1px solid #444',
    },
    tableCell: {
        padding: 6,
        color: '#AAA',
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
        width: 30,
        height: 30,
        objectFit: 'cover',
        borderRadius: 100

    },

    parrafos: {
        color: '#A6A6A6',
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
        marginTop: 50
    },

    heading: {
        textAlign: 'center',
        fontSize: '25',
        color: '#F6F1E9',
        fontWeight: 'black'

    },
    span: {
        color: '#D6A354',
        fontSize: 20,
        fontWeight: 'black'
    },

    pTable: {
        fontSize:10
       
    },


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
const PDFReport: React.FC<PDFReportProps> = ({ queryMes, queryYear, meses, years, actividad, total, clientes, mes }) => (

    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.heading}>Mojica's BarberShop Reporte</Text>
            <Image src={imagen} style={styles.img} />
            <View style={styles.section}>
                <Text style={styles.header}>
                    Reporte de Ingresos de la barbería por Mes
                </Text>
                <View style={styles.form}>
                    <View style={styles.formGroup}>
                        <View>
                            <Text style={styles.label}>Mes</Text>
                            <Text style={styles.select}>{meses[queryMes - 1]}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Año</Text>
                            <Text style={styles.select}>{queryYear}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.textWhite, styles.mb10]}>
                    <Text style={styles.parrafos}>En el mes de {meses[queryMes - 1]} se ha obtenido un total de <Text style={styles.span}>{mes}</Text> citas</Text>
                    <Text style={styles.parrafos}>Ingresos Totales por las citas realizadas: <Text style={styles.span}>{formatToCordobas(total)}</Text> </Text>
                </View>
                <View>
                    <Text style={[styles.header, styles.mbY]}>
                        Reporte de Ingresos y Actividades por Barbero
                    </Text>
                    <Table
                        headers={['Nombre', 'Teléfono', 'Ingresos', 'Total Citas']}
                        data={actividad.map(barbero => ([
                            <View key={barbero.idBarberos} style={styles.flex}>
                                <Image style={styles.imagenPerfil} src={`${import.meta.env.VITE_BASE_IMAGE}/${barbero.imagen}`} />
                                <View >
                                    <Text style={styles.pTable}>{barbero.nombre} {barbero.apellido}</Text>
                                    <Text style={styles.pTable}>{barbero.email}</Text>


                                </View>
                            </View>,
                            <Text style={styles.pTable}>{barbero.telefono}</Text>,
                            <Text style={styles.pTable}>{formatToCordobas(barbero.ingresos_generados)}</Text>,
                            <Text style={styles.pTable}>{barbero.citas_atendidas}</Text>,


                        ]))}
                    />
                </View>
                <View>
                    <Text style={[styles.header, styles.mbYY]}>
                        Clientes Frecuentes
                    </Text>
                    <Table
                        headers={['Nombre', 'Teléfono', 'Dirección', 'Numero de Citas']}
                        data={clientes.map(cliente => ([
                            <View style={styles.flex} key={cliente.idClientes}>
                                <Image style={styles.imagenPerfil} src={`${import.meta.env.VITE_BASE_IMAGE}/${cliente.cliente.imagen}`} />
                                <View>
                                    <Text style={styles.pTable}>{cliente.cliente.nombre} {cliente.cliente.apellido}</Text>
                                    <Text style={styles.pTable}>{cliente.cliente.email}</Text>
                                </View>
                            </View>,
                            <Text style={styles.pTable}>{ cliente.cliente.telefono}</Text>,
                            <Text style={styles.pTable}>{ cliente.cliente.direccion}</Text>,
                            <Text style={styles.pTable}>{ cliente.numCitas}</Text>,


                        
                        ]))}
                    />
                </View>
            </View>
        </Page>
    </Document>
);

export default PDFReport;
export { generatePDF };
