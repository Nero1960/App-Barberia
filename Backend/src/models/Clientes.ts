import { Model, Table, Column, DataType, Default, BeforeCreate, BeforeUpdate, HasMany, AllowNull} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId';
import Citas from './Citas';
//definir el numero de saltos del hasheo
const saltRounds : number = 10;

// Define la tabla en la base de datos y deshabilita los timestamps
@Table({
    tableName: 'clientes',
    timestamps: false
})
class Cliente extends Model {
    
    // Define el atributo idClientes como la clave primaria con autoincremento
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare idClientes: number;

    // Define el atributo nombre como una cadena de hasta 30 caracteres, no nulo
    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    declare nombre: string;

    // Define el atributo apellido como una cadena de hasta 30 caracteres, puede ser nulo
    @Column({
        type: DataType.STRING(30),
        allowNull: true
    })
    declare apellido: string;

    // Define el atributo email como una cadena de hasta 60 caracteres, no nulo
    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    declare email: string;

    // Define el atributo password como una cadena de hasta 60 caracteres, no nulo
    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    declare password: string;

    // Define el atributo telefono como una cadena de hasta 12 caracteres, no nulo
    @Column({
        type: DataType.STRING(12),
        allowNull: false
    })
    declare telefono: string;

    // Define el atributo direccion como una cadena de hasta 60 caracteres, puede ser nulo
    @Column({
        type: DataType.STRING(60),
        allowNull: true
    })
    declare direccion: string;

    // Define el atributo confirmado como un número entero pequeño (TINYINT), no nulo
    @Default(0)
    @Column({
        type: DataType.TINYINT,
        allowNull: false
    })
    declare confirmado: number;

    // Define el atributo token como una cadena de hasta 100 caracteres, puede ser nulo
    @Column({
        type: DataType.STRING(100),
        allowNull: true
    })
    declare token: string;

    @Default(0)
    @Column({
        type: DataType.TINYINT(),
        allowNull: false

    })

    declare admin: number;

    @Default('default.png')
    @Column({
        type: DataType.STRING(100),
        allowNull: true
    })

    declare imagen: string

    @HasMany(() => Citas)
    citas: Citas[]

    @BeforeCreate
    static asignarToken(cliente: Cliente) {
        cliente.token = generarId();
    }


    @BeforeCreate
    static async hashPasswordBeforeCreate(instance: Cliente): Promise<void> {
        // Hashea la contraseña antes de crear el registro
        const hashedPassword = await bcrypt.hash(instance.password, saltRounds);
        instance.password = hashedPassword;
    }

    // Hook que se ejecuta antes de actualizar un registro
    @BeforeUpdate
    static async hashPasswordBeforeUpdate(instance: Cliente): Promise<void> {
        // Si la contraseña ha sido modificada, hashea la nueva contraseña
        if (instance.changed('password')) {
            const hashedPassword = await bcrypt.hash(instance.password, saltRounds);
            instance.password = hashedPassword;
        }
    }

    async comparePassword(password: string) : Promise<boolean>{
        return await bcrypt.compare(password, this.password)
    }


}




export default Cliente;
