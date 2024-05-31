import express from "express";
import cors from "cors";
// impotar las rutas
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
// usar las rutas

export default app;