import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpInsumos from "../controllers/insumos.js";
import helpersInsumos from "../helpers/insumos.js";

const router = Router();

router.get("/", httpInsumos.getInsumos);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersInsumos.validarId),
    validarCampos
], httpInsumos.getInsumos);

router.post("/", [
    check("proveedores_id", "El proveedor id no puede estar vacio").notEmpty(),
    check("proveedores_id", "Ingrese un mongo id valido").isMongoId(),
    check("proveedores_id").custom(helpersInsumos.validarIdProveedores),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("relacionNPK", "La relacionNPK no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad debe ser numerica").isNumeric(),
    check("unidad", "La unidad no puede estar vacia").notEmpty(),
    check("respondable", "El respondable no puede estar vacio").notEmpty(),
    check("observaciones", "La observacion no puede estar vacia").notEmpty(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total debe ser numerico").isNumeric(),
    validarCampos
], httpInsumos.postInsumos);
router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersInsumos.validarId),
    check("proveedores_id", "El proveedor id no puede estar vacio").notEmpty(),
    check("proveedores_id", "Ingrese un mongo id valido").isMongoId(),
    check("proveedores_id").custom(helpersInsumos.validarIdProveedores),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("relacionNPK", "La relacionNPK no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad debe ser numerica").isNumeric(),
    check("unidad", "La unidad no puede estar vacia").notEmpty(),
    check("respondable", "El respondable no puede estar vacio").notEmpty(),
    check("observaciones", "La observacion no puede estar vacia").notEmpty(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total debe ser numerico").isNumeric(),
    validarCampos
], httpInsumos.putInsumos);

export default router;
