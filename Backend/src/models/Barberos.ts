import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Citas from './Citas';

@Table({
    tableName: 'barberos',
    timestamps: false
})

class Barbero extends Model{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
      })
      declare idBarberos: number;

    @Column({
        type: DataType.STRING(),
        allowNull: false

    })

    declare nombre: string;

    @Column({
        type: DataType.STRING(),
        allowNull: false

    })

    declare apellido: string;

    @Column({
        type: DataType.STRING(),
        allowNull: true

    })

    declare telefono: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    declare email: string;

    @Column({
        type : DataType.TEXT,
        allowNull: false
    })

    declare especialidad : string;

    @Column({
        type: DataType.STRING(60),
        allowNull: true
    })

    declare imagen : string;

    @HasMany(() => Citas)
    citas: Citas[]


}



export default Barbero;