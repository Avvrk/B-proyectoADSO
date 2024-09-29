import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpFinca from "../controllers/fincas.js";
import helpersFincas from "../helpers/fincas.js";

const router = Router();

router.get("/", [
    validarJWT
], httpFinca.getFincas);

router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    validarCampos,
    validarJWT
], httpFinca.getFincasId);

router.get("/activos", [
    validarJWT
], httpFinca.getFincasActivos);

router.get("/inactivos", [
    validarJWT
], httpFinca.getFincasInactivos);

router.post("/", [
    check("_idUsuario", "El id admin no puede estar vacio").notEmpty(),
    check("_idUsuario", "Ingrese un mongo id valido").isMongoId(),
    check("_idUsuario").custom(helpersFincas.validarIdAdmin),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("rut", "El rut no puede estar vacio").notEmpty(),
    check("direccion", "La direccion no puede estar vacia").notEmpty(),
    check("ubicacionGeografica", "La ubcacion geografica no puede estar vacia").notEmpty(),
    check("departamento", "El departamento no puede estar vacio").notEmpty(),
    check("ciudad", "La ciudad no puede estar vacia").notEmpty(),
    check("area", "El area no puede estar vacio").notEmpty(),
    check("documentos", "El campo documentos no puede estar vacio").notEmpty(),
    check('limites', 'Límites son requeridos').notEmpty(),
    validarCampos,
    validarJWT
], httpFinca.postFincas);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    check("_idUsuario", "Ingrese un mongo id valido").isMongoId(),
    check("_idUsuario").custom(helpersFincas.validarIdAdmin),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("rut", "El rut no puede estar vacio").notEmpty(),
    check("direccion", "La direccion no puede estar vacia").notEmpty(),
    check("ubicacionGeografica", "La ubcacion geografica no puede estar vacia").notEmpty(),
    check("departamento", "El departamento no puede estar vacio").notEmpty(),
    check("ciudad", "La ciudad no puede estar vacia").notEmpty(),
    check("limites", "El limite no puede estar vacio").notEmpty(),
    check("area", "El area no puede estar vacio").notEmpty(),
    check("area", "El area no puede estar vacio").isNumeric(),
    check("documentos", "El campo documentos no puede estar vacio").notEmpty(),
    validarCampos,
    validarJWT
], httpFinca.putFincas);

router.put("/activar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    validarCampos,
    validarJWT
], httpFinca.putFincasActivar);

router.put("/inactivar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    validarCampos,
    validarJWT
], httpFinca.putFincasInactivar);

export default router;
