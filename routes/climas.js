import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
//  import { validarJWT } from "../middlewares/validar-jwt";
import httpClimas from "../controllers/climas.js";
import helpersClimas from "../helpers/climas.js";

const router = Router();

router.get("/", [], httpClimas.getClimas);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersClimas.validarId),
    validarCampos
], httpClimas.getClimasId);
router.get("/activos", [], httpClimas.getClimasActivos);
router.get("/desactivados", [], httpClimas.getClimasInactivos);
router.get("/fechas/:fecha", [
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "Ingrese una fecha valida").isISO8601().toDate(),
    validarCampos
], httpClimas.getClimasFecha);
router.get("/temperatura", [], httpClimas.getClimasPromedio);
router.get("/duracion/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersClimas.validarId),
    validarCampos
], httpClimas.getClimasDuracion);
router.get("/tipoclima/:clima", [
    check("clima", "El clima no puede estar vacio").notEmpty(),
    validarCampos
], httpClimas.getClimasPorClima);

router.post("/", [
    check("finca_id", "La id finca no puede estar vacia").notEmpty(),
    check("finca_id", "Ingrese un mongo id valido en finca").isMongoId(),
    check("finca_id").custom(helpersClimas.validarIdFinca),
    check("empleado_id", "El id empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en empleado").isMongoId(),
    check("empleado_id").custom(helpersClimas.validarIdEmpleado),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "Ingrese una fecha valida").isISO8601().toDate(),
    check("tipoClima", "El tipo clima no puede estar vacio").notEmpty(),
    check("horaInicio", "La hora inicio no puede estar vacia").notEmpty(),
    check("horaInicio", "Ingrese una hora valida").matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    check("horaFinal", "La hora fin no puede estar vacia").notEmpty(),
    check("horaFinal", "Ingrese una hora valida").matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    check("temperaturaMaxima", "La temperatura maxima no puede estar vacio").notEmpty(),
    check("temperaturaMaxima", "La temperatura maxina solo puede tener numeros").isNumeric(),
    check("temperaturaMinima", "La temperatura minia no puede estar vacia").notEmpty(),
    check("temperaturaMinima", "La temperatura minima solo puede tener numeros").isNumeric(),
    check(["temperaturaMaxima", "temperaturaMinima"]).custom(helpersClimas.validarTemperatura),
    validarCampos
], httpClimas.postClimas);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersClimas.validarId),
    check("finca_id", "La id finca no puede estar vacia").notEmpty(),
    check("finca_id", "Ingrese un mongo id valido en finca").isMongoId(),
    check("finca_id").custom(helpersClimas.validarIdFinca),
    check("empleado_id", "El id empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en empleado").isMongoId(),
    check("empleado_id").custom(helpersClimas.validarIdEmpleado),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "Ingrese una fecha valida").isISO8601().toDate(),
    check("tipoClima", "El tipo clima no puede estar vacio").notEmpty(),
    check("horaInicio", "La hora inicio no puede estar vacia").notEmpty(),
    check("horaInicio", "Ingrese una hora valida").matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    check("horaFinal", "La hora fin no puede estar vacia").notEmpty(),
    check("horaFinal", "Ingrese una hora valida").matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    check("temperaturaMaxima", "La temperatura maxima no puede estar vacio").notEmpty(),
    check("temperaturaMaxima", "La temperatura maxina solo puede tener numeros").isNumeric(),
    check("temperaturaMinima", "La temperatura minia no puede estar vacia").notEmpty(),
    check("temperaturaMinima", "La temperatura minima solo puede tener numeros").isNumeric(),
    check(["temperaturaMaxima", "temperaturaMinima"]).custom(helpersClimas.validarTemperatura),
    validarCampos
], httpClimas.putClimas);
router.put("/activar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersClimas.validarId),
    validarCampos
], httpClimas.putClimas);
router.put("/desactivar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersClimas.validarId),
    validarCampos
], httpClimas.putClimas);

export default router;
