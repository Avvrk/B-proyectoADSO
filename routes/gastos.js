import { Router } from "express";
// import { check } from "express-validator";
// import { validarCampos } from "../middlewares/validar-datos";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpGasto from "../controllers/gastos.js";
// import helpersClimas from "../helpers/climas.js";

const router = Router();

router.get("/", httpGasto.getGastos);
router.get("/gastos/:id",[], httpGasto.getGastos);
router.get("/activos", httpGasto.getGastos);
router.get("/desactivados", httpGasto.getGastos);
router.get("/fechas", httpGasto.getGastos);
router.get("/porcentaje", httpGasto.getGastos);
router.get("/responsable", httpGasto.getGastos);

router.post("/",[], httpGasto.postGastos);

router.put("/",[], httpGasto.putGastos);
router.put("activar/:id",[], httpGastos.putGastos);
router.put("desactivar/:id",[], httpGastos.putGastos);

export default router;