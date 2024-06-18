import { Model, Column, BelongsTo, ForeignKey, Table, DataType, BelongsToMany, AllowNull, Default} from 'sequelize-typescript';
import Barbero from './Barberos';
import Cliente from './Clientes';
import CitasServicios from './CitasServicios';
import Servicios from './Servicios';

@Table({
    tableName: 'citas',
    timestamps: false
})

class Citas extends Model {
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    })

    declare idCitas : number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })

    declare fecha : Date;

    @Column({
        type: DataType.TIME,
        allowNull: false
    })

    declare hora : string;

    @Default('Pendiente')
    @Column({
        type: DataType.STRING,
        allowNull:false
    })

    declare estado: string;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare idClientes: number

    @BelongsTo(() => Cliente)
    declare cliente : Cliente

    
    @ForeignKey(() => Barbero)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare idBarberos : number

    @BelongsTo(() => Barbero)
    declare barbero : Barbero;

    @BelongsToMany(() => Servicios, () => CitasServicios)
    servicios: Servicios[];

}




export default Citas;