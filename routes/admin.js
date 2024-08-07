import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpAdmin from "../controllers/admin.js";
import helpersAdmin from "../helpers/admin.js";

const router = Router();

router.get("/", [], httpAdmin.getAdmins);
router.get("/id/:id", [
    check("id", "El id no puede estar vacio").notEmpty(),
    check("id", "Ingrese un mongo id valido"),
    check("id").custom(helpersAdmin.validarId),
    validarCampos
], httpAdmin.getAdminsId);
router.get("/activos", [], httpAdmin.getAdminsActivos);
router.get("/desactivados", [], httpAdmin.getAdminsInactivos);

router.post("/ingresar", [
    check("correo", "El correo no puede estar vacio").notEmpty(),
    check("correo", "Ingrese un correo valido").isEmail(),
    check("password", "La contraseña no puede estar vacia").notEmpty(),
    check("password", "La contraseña debe tener minimo 8 caracteres").isLength({ min: 8 }),
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
    validarCampos
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
    validarCampos
], httpAdmin.putAdmins);
router.put("/activar/:id", [
    check("id", "El id no puede estar vacio").notEmpty(),
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAdmin.validarId),
    validarCampos
], httpAdmin.putAdminsActivar);
router.put("/desactivar/:id", [
    check("id", "El id no puede estar vacio").notEmpty(),
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAdmin.validarId),
    validarCampos
], httpAdmin.putAdminsInactivar);

export default router;
