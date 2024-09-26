import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpAdmin from "../controllers/admin.js";
import helpersAdmin from "../helpers/admin.js";

const router = Router();

router.get("/", [
    validarJWT
], httpAdmin.getAdmins);

router.get("/id/:id", [
    check("id", "El id no puede estar vacio").notEmpty(),
    check("id", "Ingrese un mongo id valido"),
    check("id").custom(helpersAdmin.validarId),
    validarCampos,
    validarJWT
], httpAdmin.getAdminsId);

router.get("/activos", [
    validarJWT
], httpAdmin.getAdminsActivos);

router.get("/desactivados", [], httpAdmin.getAdminsInactivos);

router.post("/ingresar", [
    check("correo", "El correo no puede estar vacio").notEmpty(),
    check("correo", "Ingrese un correo valido").isEmail(),
    check("password", "La contraseña no puede estar vacia").notEmpty(),
    validarCampos
], httpAdmin.postLogin);

router.post("/", [
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("direccion", "La direccion no puede estar vacia").notEmpty(),
    check("correo", "El correo no puede estar vacio").notEmpty(),
    check("correo", "Ingrese una direccion de correo valida").isEmail(),
    check("telefono", "El telefono no puede estar vacio").notEmpty(),
    check("telefono", "El telefono solo pueden tener numeros").isNumeric(),
    check("telefono", "El telefono debe tener minimo 10 caracteres").isLength({ min: 10 }),
    check("municipio", "El municipio no puede estar vacio").notEmpty(),
    check("password", "La contraseña no puede estar vacia").notEmpty(),
    check("rol", "El rol no puede estar vacio").notEmpty(),
    validarCampos
    // validarJWT
], httpAdmin.postLog);

router.put("/:id", [
    check("id", "El id no puede estar vacio").notEmpty(),
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAdmin.validarId),
    check("direccion", "La direccion no puede estar vacia").notEmpty(),
    check("correo", "El correo no puede estar vacio").notEmpty(),
    check("correo", "Ingrese una direccion de correo valida").isEmail(),
    check("telefono", "El telefono no puede estar vacio").notEmpty(),
    check("telefono", "El telefono solo pueden tener numeros").isNumeric(),
    check("telefono", "El telefono debe tener minimo 10 caracteres").isLength({ min: 10 }),
    check("municipio", "El municipio no puede estar vacio").notEmpty(),
    check("rol", "El rol no puede estar vacio").notEmpty(),
    validarCampos,
    validarJWT
], httpAdmin.putAdmins);

router.put("/activar/:id", [
    check("id", "El id no puede estar vacio").notEmpty(),
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAdmin.validarId),
    validarCampos,
    validarJWT
], httpAdmin.putAdminsActivar);

router.put("/desactivar/:id", [
    check("id", "El id no puede estar vacio").notEmpty(),
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAdmin.validarId),
    validarCampos,
    validarJWT
], httpAdmin.putAdminsInactivar);

export default router;
