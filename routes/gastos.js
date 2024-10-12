import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpGasto from "../controllers/gastos.js";
import helpersGatos from "../helpers/gastos.js";

const router = Router();

router.get("/", [
    validarJWT
], httpGasto.getGastos);

router.get("/id/:id",[
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersGatos.validarId),
    validarCampos,
    validarJWT
], httpGasto.getGastosId);

router.get("/fecha/:fechaInicio/:fechaFin", [
    check("fechaInicio").custom(helpersGatos.validarFecha),
    check("fechaFin").custom(helpersGatos.validarFecha),
    check(["fechaInicio", "fechaFin"]).custom(helpersGatos.validarFechas),
    validarCampos,
    validarJWT
], httpGasto.getGastosFechas);

router.post("/",[
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("fincas_id", "La finca no puede estar vacia").notEmpty(),
    check("fincas_id", "La finca debe ser un mongoid valido").isMongoId(),
    check("fincas_id").custom(helpersGatos.validarIdFincas),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(helpersGatos.validarFecha),
    check("codigo", "El numero factura no puede estar vacio").notEmpty(),
    check("descripcion", "La descripcion no puede estar vacio").notEmpty(),
    validarCampos,
    validarJWT
], httpGasto.postGastos);

router.put("/:id",[
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersGatos.validarId),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("fincas_id", "La finca no puede estar vacia").notEmpty(),
    check("fincas_id", "La finca debe ser un mongoid valido").isMongoId(),
    check("fincas_id").custom(helpersGatos.validarIdFincas),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(helpersGatos.validarFecha),
    check("codigo", "El numero factura no puede estar vacio").notEmpty(),
    check("descripcion", "La descripcion no puede estar vacio").notEmpty(),
    validarCampos,
    validarJWT
], httpGasto.putGastos);

export default router;