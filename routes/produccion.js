import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpProducciones from "../controllers/produccion.js";
import helpersProducciones from "../helpers/produccion.js";

const router = Router();

router.get('/', validarJWT, httpProducciones.getProducciones);

router.get('/:id', httpProducciones.getProduccionId);

router.get('/fechas', httpProducciones.getProduccionesFechas);

router.get('/total',httpProducciones.getProduccionesTotal);

router.get('/tipo', httpProducciones.getProduccionesPorCultivo);

router.get('/activos', httpProducciones.getProduccionesActivas);

router.get('/inactivos', httpProducciones.getProduccionesInactivas);

router.post('/', httpProducciones.postProduccion);

router.put('/:id', httpProducciones.putProduccion);

router.put('/activar/:id', httpProducciones.putProduccionActivar);

router.put('inactivar/:id', httpProducciones.putProduccionInactivar);

export default router;