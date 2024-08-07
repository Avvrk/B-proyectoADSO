import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpComprador from "../controllers/comprador.js";
import helpersComprador from "../helpers/comprador.js";

const router = Router();

router.get("/", [], httpComprador.getCompradores);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersComprador.validarId),
    validarCampos
], httpComprador.getCompradoresId);
router.get("/activos", [], httpComprador.getCompradoresActivos);
router.get("/inactivos", [], httpComprador.getCompradoresInactivos);
router.get("/fecha/:fechaInicio/:fechaFin", [
    check("fechaInicio", "Ingrese una fecha inicial valida").isISO8601().toDate(),
    check("fechaFin", "Ingrese una fecha final valida").isISO8601().toDate(),
    check(["fechaInicio", "fechaFin"]).custom(helpersComprador.validarFechas),
    validarCampos
], httpComprador.getCompradoresFechas);
router.get("/compras/:documento", [], httpComprador.getCompradoresCompras);

router.post("/", [
    check("_id_produccion", "El id produccion no puede estar vacio").notEmpty(),
    check("_id_produccion", "Ingrese un mongo id de produccion valido").isMongoId(),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "Ingrese una fecha valida").isISO8601().toDate(),
    check("especie", "La especie no puede estar vacia").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("documento", "El documento no puede estar vacio"),
    check("documento", "El documento solo puede tener numeros").isNumeric(),
    check("documento", "El documento debe tener minimo 6 digitos"),
    check("telefono", "El telefono no puede estar vacio").notEmpty(),
    check("telefono", "El telefono solo pueden tener numeros").isNumeric(),
    check("telefono", "El telefono debe tener minimo 10 caracteres").isLength({ min: 10 }),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad solo puede tener numeros").isNumeric(),
    check("numeroGuiaTransporte", "El numero guia transporte no puede estar vacio").notEmpty(),
    check("numeroLoteComercial", "El numero lote comercial no puede estar vacio").notEmpty(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total solo puede tener numeros").isNumeric(),
    validarCampos
], httpComprador.postCompradores);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersComprador.validarId),
    check("_id_produccion", "El id produccion no puede estar vacio").notEmpty(),
    check("_id_produccion", "Ingrese un mongo id de produccion valido").isMongoId(),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "Ingrese una fecha valida").isISO8601().toDate(),
    check("especie", "La especie no puede estar vacia").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("documento", "El documento no puede estar vacio"),
    check("documento", "El documento solo puede tener numeros").isNumeric(),
    check("documento", "El documento debe tener minimo 6 digitos"),
    check("telefono", "El telefono no puede estar vacio").notEmpty(),
    check("telefono", "El telefono solo pueden tener numeros").isNumeric(),
    check("telefono", "El telefono debe tener minimo 10 caracteres").isLength({ min: 10 }),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad solo puede tener numeros").isNumeric(),
    check("numeroGuiaTransporte", "El numero guia transporte no puede estar vacio").notEmpty(),
    check("numeroLoteComercial", "El numero lote comercial no puede estar vacio").notEmpty(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total solo puede tener numeros").isNumeric(),
    validarCampos
], httpComprador.putCompradores);
router.put("/activar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersComprador.validarId),
    validarCampos
], httpComprador.putCompradoresActivar);
router.put("/desactivar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersComprador.validarId),
    validarCampos
], httpComprador.putCompradoresInactivar);

export default router;
