import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpControlPlagas from "../controllers/control_plagas.js";
import herlpersControlPlagas from "../helpers/control_plagas.js";

const router = Router();

router.get("/", [
    validarJWT
], httpControlPlagas.getPlagas);

router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(herlpersControlPlagas.validarId),
    validarCampos,
    validarJWT
], httpControlPlagas.getPlagasId);

router.get("/fechas/:fechaInicio/:fechaFin", [
    check("fechaInicio").custom(herlpersControlPlagas.validarFecha),
    check("fechaFin").custom(herlpersControlPlagas.validarFecha),
    check(["fechaInicio", "fechaFin"]).custom(herlpersControlPlagas.validarFechas),
    validarCampos,
    validarJWT
], httpControlPlagas.getPlagasFechas);

router.get("/operario/:operario", [
    validarJWT
], httpControlPlagas.getPlagasOperario);

router.get("/tipo/:tipo", [
    validarJWT
], httpControlPlagas.getPlagasTipo);

router.post("/", [
    check("id_cultivo", "El id cultivo no puede estar vacio").notEmpty(),
    check("id_cultivo", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("id_cultivo").custom(herlpersControlPlagas.validarIdCultivo),
    check("empleado_id", "El id empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("empleado_id").custom(herlpersControlPlagas.validarIdEmpleado),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(herlpersControlPlagas.validarFecha),
    check("tipoCultivo", "El tipo cultivo no puede estar vacio").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("ingredientesActivo", "El ingrediente activo no puede estar vacio").notEmpty(),
    check("dosis", "La dosis no puede estar vacia").notEmpty(),
    check("operario", "El operario no puede estar vacio").notEmpty(),
    check("observaciones", "La observaciones no puede estar vacia").notEmpty(),
    validarCampos,
    validarJWT
], httpControlPlagas.postPlagas);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(herlpersControlPlagas.validarId),
    check("id_cultivo", "El id cultivo no puede estar vacio").notEmpty(),
    check("id_cultivo", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("id_cultivo").custom(herlpersControlPlagas.validarIdCultivo),
    check("empleado_id", "El id empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("empleado_id").custom(herlpersControlPlagas.validarIdEmpleado),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(herlpersControlPlagas.validarFecha),
    check("tipoCultivo", "El tipo cultivo no puede estar vacio").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("ingredientesActivo", "El ingrediente activo no puede estar vacio").notEmpty(),
    check("dosis", "La dosis no puede estar vacia").notEmpty(),
    check("operario", "El operario no puede estar vacio").notEmpty(),
    check("observaciones", "La observaciones no puede estar vacia").notEmpty(),
    validarCampos,
    validarJWT
], httpControlPlagas.putPlagas);

export default router;
