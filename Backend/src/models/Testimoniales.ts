import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Cliente from './Clientes';

@Table({
    tableName: 'testimoniales',
    timestamps: false
})

class Testimoniales extends Model{
    @Column({
        type: DataType.INTEGER(),
        autoIncrement: true,
        primaryKey: true
    })

    declare idTestimoniales : number;

    @Column({
        type: DataType.STRING,
        allowNull: false

    })

    declare mensaje : string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })

    declare fecha : Date;

    @Column({
        type: DataType.STRING,
        allowNull: false

    })

    declare titulo : string;

    @Default('Pendiente')
    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    declare estado : string;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare idClientes: number

    @BelongsTo(() => Cliente)
    declare cliente : Cliente
}

export default Testimoniales;