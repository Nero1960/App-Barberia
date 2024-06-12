import { Table, DataType, Model, BelongsTo, Column, ForeignKey } from 'sequelize-typescript';
import Citas from './Citas';
import Servicios from './Servicios';

@Table({
    tableName: 'citas_servicios',
    timestamps: false
})

class CitasServicios extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })

    declare id: number;

    @ForeignKey(() => Citas)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    
    declare idCitas: number;

    @BelongsTo(() => Citas)
    declare cita: Citas;

    @ForeignKey(() => Servicios)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare idServicios: number;

    @BelongsTo(() => Servicios)
    declare servicio: Servicios;

    @Column({
        type: DataType.DOUBLE(5,2),
        allowNull: false
    })

    declare precioActual : number
}

export default CitasServicios;