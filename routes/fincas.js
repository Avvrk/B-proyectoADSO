import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpFinca from "../controllers/fincas.js";
import helpersFincas from "../helpers/fincas.js";

const router = Router();

router.get("/", httpFinca.getFincas);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    validarCampos
], httpFinca.getFincasId);
router.get("/activos", httpFinca.getFincasActivos);
router.get("/inactivos", httpFinca.getFincasInactivos);

router.post("/", [
    check("_idAdmin", "El id admin no puede estar vacio").notEmpty(),
    check("_idAdmin", "Ingrese un mongo id valido").isMongoId(),
    check("_idAdmin").custom(helpersFincas.validarIdAdmin),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("rut", "El rut no puede estar vacio").notEmpty(),
    check("direccion", "La direccion no puede estar vacia").notEmpty(),
    check("ubicacionGeografica", "La ubcacion geografica no puede estar vacia").notEmpty(),
    check("departamento", "El departamento no puede estar vacio").notEmpty(),
    check("ciudad", "La ciudad no puede estar vacia").notEmpty(),
    check("limites", "El limite no puede estar vacio").notEmpty(),
    check("area", "El area no puede estar vacio").notEmpty(),
    validarCampos
], httpFinca.postFincas);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    check("_idAdmin", "Ingrese un mongo id valido").isMongoId(),
    check("_idAdmin").custom(helpersFincas.validarIdAdmin),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("rut", "El rut no puede estar vacio").notEmpty(),
    check("direccion", "La direccion no puede estar vacia").notEmpty(),
    check("ubicacionGeografica", "La ubcacion geografica no puede estar vacia").notEmpty(),
    check("departamento", "El departamento no puede estar vacio").notEmpty(),
    check("ciudad", "La ciudad no puede estar vacia").notEmpty(),
    check("limites", "El limite no puede estar vacio").notEmpty(),
    check("area", "El area no puede estar vacio").notEmpty(),
    check("area", "El area no puede estar vacio").isNumeric(),
    validarCampos
], httpFinca.putFincas);
router.put("/activar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    validarCampos
], httpFinca.putFincasActivar);
router.put("/desactivar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFincas.validarId),
    validarCampos
], httpFinca.putFincasInactivar);

export default router;
