import express from 'express';
import clienteRoute from './routes/clienteRoutes';
import adminRoute from './routes/adminRoutes'
import db from './config/database';
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'

dotenv.config();
//Iniciar el servidor
const server = express();
server.use(cors());


//leer datos del formulario
server.use(express.json())

//comprobar la conexión a la base de datos
db.authenticate()
    .then(() => {
        console.log(colors.bgGreen.white('Base de datos conectada correctamente'));
        db.sync();
    })
    .catch(error => console.log(colors.bgRed('Error de conexión'), error));


//hacer usp de los router
server.use('/API', clienteRoute);
server.use('/API/admin', adminRoute);
server.use('/uploads', express.static('src/uploads'));


//Definir el puerto
const port = process.env.PORT || 4000;

//Arrancar el servidor en el puerto establecido
server.listen(port, () => {
    console.log(colors.white.bgGreen(`El servidor esta funcionando en el puerto ${port}`))
})

