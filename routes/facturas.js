import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpFactura from "../controllers/facturas.js";
import helpersFacturas from "../helpers/facturas.js";

const router = Router();

router.get("/", httpFactura.getFacturas);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFacturas.validarId),
    validarCampos
], httpFactura.getFacturasId);
router.get("/total", httpFactura.getFacturasTotal);
router.get("/fecha/:fechaInicio/:fechaFin", [
    check("fechaInicio").custom(helpersFacturas.validarFecha),
    check("fechaFin").custom(helpersFacturas.validarFecha),
    check(["fechaInicio", "fechaFin"]).custom(helpersFacturas.validarFechas),
    validarCampos
], httpFactura.getFacturasFechas);

router.post("/", [
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(helpersFacturas.validarFecha),
    check("valor", "El valor no puede estar vacio").notEmpty(),
    check("valor", "El valor solo puede ser numerico").isNumeric(),
    check("detalles", "El detalle no puede estar vacio").notEmpty(),
    check("inventario_id", "El inventario id no puede estar vacio").notEmpty(),
    check("inventario_id", "Ingrese un mongo id valido").isMongoId(),
    check("inventario_id").custom(helpersFacturas.validarIdInventario),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad solo puede ser numerica").isNumeric(),
    check("nombreProducto", "El nombre producto no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal solo puede ser numerico").isNumeric(),
    check("iva", "El iva no puede estar vacio").notEmpty(),
    check("iva", "El iva solo puede ser numerico").isNumeric(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total solo puede ser numerico").isNumeric(),
    check("comprador_id", "El compradro id no pued estar vacio").notEmpty(),
    check("comprador_id", "Ingrese un mongo id valido").isMongoId(),
    check("comprador_id").custom(helpersFacturas.validarIdComprador),
    validarCampos
], httpFactura.postFacturas);
router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFacturas.validarId),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha").custom(helpersFacturas.validarFecha),
    check("valor", "El valor no puede estar vacio").notEmpty(),
    check("valor", "El valor solo puede ser numerico").isNumeric(),
    check("detalles", "El detalle no puede estar vacio").notEmpty(),
    check("inventario_id", "El inventario id no puede estar vacio").notEmpty(),
    check("inventario_id", "Ingrese un mongo id valido").isMongoId(),
    check("inventario_id").custom(helpersFacturas.validarIdInventario),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad solo puede ser numerica").isNumeric(),
    check("nombreProducto", "El nombre producto no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal solo puede ser numerico").isNumeric(),
    check("iva", "El iva no puede estar vacio").notEmpty(),
    check("iva", "El iva solo puede ser numerico").isNumeric(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total solo puede ser numerico").isNumeric(),
    check("comprador_id", "El compradro id no pued estar vacio").notEmpty(),
    check("comprador_id", "Ingrese un mongo id valido").isMongoId(),
    check("comprador_id").custom(helpersFacturas.validarIdComprador),
    validarCampos
], httpFactura.putFacturas);

export default router;
