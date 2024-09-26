import express from "express";
import cors from "cors";
import "dotenv/config";

import admin from './routes/admin.js';
import analisis from './routes/analisis_suelos.js';
import climas from './routes/climas.js';
import comprador from './routes/comprador.js';
import control_plagas from './routes/control_plagas.js';
import cultivos from './routes/cultivos.js';
import elaboracion_sustratos from './routes/elaboracion_sustratos.js';
import empleados from './routes/empleados.js';
import facturas from './routes/facturas.js';
import fertilizaciones from './routes/fertilizaciones.js';
import fincas from './routes/fincas.js';
import gastos from './routes/gastos.js';
import insumos from './routes/insumos.js';
import inventario from "./routes/inventario.js";
import mantenimiento from "./routes/mantenimiento.js";
import maquinaria_herramienta from "./routes/maquinaria_herramienta.js";
import nomina from "./routes/nomina.js";
import parcelas from "./routes/parcelas.js";
import preparacion_suelos from "./routes/preparacion_suelos.js";
import procesos from './routes/proceso.js';
import produccion from './routes/produccion.js';
import proveedores from './routes/proveedores.js';
import riego from './routes/riego.js';
import semillas from './routes/semillas.js';
import siembra from './routes/siembras.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use("/admin", admin);
app.use("/analisis", analisis);
app.use("/climas", climas);
app.use("/comprador", comprador);
app.use("/controlPlagas", control_plagas);
app.use("/cultivos", cultivos);
app.use("/elaboracionSustratos", elaboracion_sustratos);
app.use("/empleados", empleados);
app.use("/facturas", facturas);
app.use("/fertilizaciones", fertilizaciones);
app.use("/fincas", fincas);
app.use("/gastos", gastos);
app.use("/insumos", insumos);
app.use("/inventario", inventario);
app.use("/mantenimiento", mantenimiento);
app.use("/maquinariaHerramienta", maquinaria_herramienta);
app.use("/nomina", nomina);
app.use("/parcelas", parcelas);
app.use("/preparacionSuelos", preparacion_suelos);
app.use("/procesos", procesos);
app.use("/produccion", produccion);
app.use("/proveedores", proveedores);
app.use("/riego", riego);
app.use("/semillas", semillas);
app.use("/siembra", siembra);


export default app;
