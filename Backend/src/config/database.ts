import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config();

const db = new Sequelize(process.env.DATABASE_NAME , process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    models: [__dirname + '/../models/**/*.ts']
})

db.sync();




export default db;