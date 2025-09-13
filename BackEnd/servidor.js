import express from 'express'; // Framework para crear y gestionar el servidor y las rutas HTTP.
import cors from 'cors'; //  Middleware que permite la comunicación entre Frontend y Backend (habilita CORS).
import dotenv from 'dotenv'; //Carga las variables de entorno definidas en el archivo .env.
import mongoose from 'mongoose'; // ODM que facilita la conexión y manipulación de datos en MongoDB.


dotenv.config(); // Cargar las variables de entorno.
const app = express(); // Vamos a cargar las diferentes rutas con esta constante app. 

app.disable('x-powored-by'); // Desabilita esta cabecera, por temas de seguridad. 
app.use(express.json()) // Permite leer datos enviados en formato JSON desde el frontend.
app.use(cors()); // Permite solicitudes CORS desde cualquier origen (útil en desarrollo).

const PORT = process.env.PORT ?? 54321; 

mongoose.connect(process.env.MONGO_DB_URI)
.then(()=>{
    console.log("Base de datos conectada a MongoDb");    
    app.listen(PORT, ()=> {
        console.log(`Servidor conecto en el puerto: http://localhost:${PORT}`);
    })
})
.catch(error => console.error(error));