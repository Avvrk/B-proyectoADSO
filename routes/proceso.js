import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpProcesos from "../controllers/procesos.js";
import httpProcesos from "../helpers/procesos";

const router = Router();


router.get('/', validarJWT, httpProcesos.getProcesos);

router.get('/:id', httpProcesos.getProcesosID);

router.get('/empleado/:id', httpProcesos.getProcesosEmpleado);

router.get('/fechas',httpProcesos.getProcesosFechas);

router.get('/tipo', httpProcesos.getProcesosTipo);

router.get('/activos', httpProcesos.getProcesosActivos);

router.get('/inactivos', httpProcesos.getProcesosInactivos);

router.post('/', httpProcesos.postProceso);

router.put('/:id', httpProcesos.putProceso);

router.put('/activar/:id', httpProcesos.putProcesoActivar);

router.put('inactivar/:id', httpProcesos.putProcesoInactivar);

export default router;

