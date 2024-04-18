import {  Column, Model, Table, DataType , BelongsToMany} from "sequelize-typescript";
import CitasServicios from "./CitasServicios";
import Citas from "./Citas";

@Table({
    tableName: 'servicios',
    timestamps: false
})


class Servicios extends Model {
    @Column({
        type: DataType.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })

    declare idServicios : number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })

    declare nombre : string;

    @Column({
        type: DataType.DOUBLE(5,6),
        allowNull: false
    })

    declare precio : number

    @BelongsToMany(() => Citas, () => CitasServicios)
    citas: Citas[];

}


export default Servicios;
