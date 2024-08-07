import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpGasto from "../controllers/gastos.js";
import helpersGatos from "../helpers/gastos.js";

const router = Router();

router.get("/", httpGasto.getGastos);
router.get("/id/:id",[
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersGatos.validarId),
    validarCampos
], httpGasto.getGastosId);
router.get("/fecha/:fechaInicio/:fechaFin", [
    check("fechaInicio").custom(helpersGatos.validarFecha),
    check("fechaFin").custom(helpersGatos.validarFecha),
    check(["fechaInicio", "fechaFin"]).custom(helpersGatos.validarFechas),
    validarCampos
], httpGasto.getGastosFechas);

router.post("/",[
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(helpersGatos.validarFecha),
    check("numeroFactura", "El numero factura no puede estar vacio").notEmpty(),
    check("descripcion", "La descripcion no puede estar vacio").notEmpty(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total debe ser numerico").isNumeric(),
    check("insumos_id", "El insumos_id no puede estar vacio").notEmpty(),
    check("insumos_id", "Ingrese un mongo id valido").isMongoId(),
    check("insumos_id").custom(helpersGatos.validarIdInsumos),
    check("semillas_id", "El semillas_id no puede estar vacio").notEmpty(),
    check("semillas_id", "Ingrese un mongo id valido").isMongoId(),
    check("semillas_id").custom(helpersGatos.validarIdSemillas),
    check("mantenimiento_id", "El insumos_id no puede estar vacio").notEmpty(),
    check("mantenimiento_id", "Ingrese un mongo id valido").isMongoId(),
    check("mantenimiento_id").custom(helpersGatos.validarIdMantenimientos),
    validarCampos
], httpGasto.postGastos);

router.put("/:id",[
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersGatos.validarId),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(helpersGatos.validarFecha),
    check("numeroFactura", "El numero factura no puede estar vacio").notEmpty(),
    check("descripcion", "La descripcion no puede estar vacio").notEmpty(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total debe ser numerico").isNumeric(),
    check("insumos_id", "El insumos_id no puede estar vacio").notEmpty(),
    check("insumos_id", "Ingrese un mongo id valido").isMongoId(),
    check("insumos_id").custom(helpersGatos.validarIdInsumos),
    check("semillas_id", "El semillas_id no puede estar vacio").notEmpty(),
    check("semillas_id", "Ingrese un mongo id valido").isMongoId(),
    check("semillas_id").custom(helpersGatos.validarIdSemillas),
    check("mantenimiento_id", "El insumos_id no puede estar vacio").notEmpty(),
    check("mantenimiento_id", "Ingrese un mongo id valido").isMongoId(),
    check("mantenimiento_id").custom(helpersGatos.validarIdMantenimientos),
    validarCampos
], httpGasto.putGastos);

export default router;