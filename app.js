import express from "express";
import cors from "cors";
import "dotenv/config";
//importar la conexion a la base de datos
import dbConexion from "./database/conexionMongo.js";
// impotar las rutas
import inventario from "./routes/inventario.js";
import mantenimiento from "./routes/mantenimiento.js";
import maquinaria_herramienta from "./routes/maquinaria_herramienta.js";
import nomina from "./routes/nomina.js";
import parcelas from "./routes/parcelas.js";
import preparacion_suelos from "./routes/preparacion_suelos.js";

const app = express();

app.use(cors());
app.use(express.json());
// usar las rutas
app.use("/inventario", inventario);
app.use("/mantenimiento", mantenimiento);
app.use("/maquinaria_herramienta", maquinaria_herramienta);
app.use("/nomina", nomina);
app.use("/parcelas", parcelas);
app.use("/preparacion_suelos", preparacion_suelos);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.ser.PORT}`);
});

export default app;