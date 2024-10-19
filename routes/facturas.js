import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpFactura from "../controllers/facturas.js";
import helpersFacturas from "../helpers/facturas.js";
import httpFacturas from "../controllers/facturas.js";

const router = Router();

router.get("/", [validarJWT], httpFactura.getFacturas);

router.get(
	"/id/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersFacturas.validarId),
		validarCampos,
		validarJWT,
	],
	httpFactura.getFacturasId
);

router.get("/total", [validarJWT], httpFactura.getFacturasTotal);

router.get(
	"/fecha/:fechaInicio/:fechaFin",
	[
		check("fechaInicio").custom(helpersFacturas.validarFecha),
		check("fechaFin").custom(helpersFacturas.validarFecha),
		check(["fechaInicio", "fechaFin"]).custom(
			helpersFacturas.validarFechas
		),
		validarCampos,
		validarJWT,
	],
	httpFactura.getFacturasFechas
);

router.post(
	"/",
	[
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersFacturas.validarFecha),
		check(
			"numFactura",
			"El numero de factura no puede estar vacio"
		).notEmpty(),
		check(
			"numFactura",
			"El numero de factura solo puede ser numerico"
		).isNumeric(),
		check("comprador_id", "El compradro id no pued estar vacio").notEmpty(),
		check("comprador_id", "Ingrese un mongo id valido").isMongoId(),
		check("comprador_id").custom(helpersFacturas.validarIdComprador),
		validarCampos,
		validarJWT,
	],
	httpFactura.postFacturas
);

/* router.post("/detalles/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersFacturas.validarId),
    check("id_produccion", "Ingrese un mongo id valido").isMongoId(),
    check("id_produccion").custom(helpersFacturas.validarIdProduccion),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad solo puede ser numerica").isNumeric(),
    check("nombreProducto", "El nombre producto no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal solo puede ser numerico").isNumeric(),
    check("iva", "El iva no puede estar vacio").notEmpty(),
    check("iva", "El iva solo puede ser numerico").isNumeric(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total solo puede ser numerico").isNumeric(),
    validarCampos,
    validarJWT
], httpFactura.postFacturasDetalles); */

router.put(
	"/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersFacturas.validarId),
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersFacturas.validarFecha),
		check(
			"numFactura",
			"El numero de factura no puede estar vacio"
		).notEmpty(),
		check(
			"numFactura",
			"El numero de factura solo puede ser numerico"
		).isNumeric(),
		check("total", "El total no puede estar vacio").notEmpty(),
		check("total", "El total solo puede ser numerico").isNumeric(),
		check("comprador_id", "El compradro id no pued estar vacio").notEmpty(),
		check("comprador_id", "Ingrese un mongo id valido").isMongoId(),
		check("comprador_id").custom(helpersFacturas.validarIdComprador),
		check("detalles.*.codigo", "El código no puede estar vacío").notEmpty(),
		check(
			"detalles.*.id_produccion",
			"Ingrese un mongo id valido"
		).isMongoId(),
		check("detalles.*.id_produccion").custom(
			helpersFacturas.validarIdProduccion
		),
		check(
			"detalles.*.cantidad",
			"La cantidad no puede estar vacía"
		).notEmpty(),
		check(
			"detalles.*.cantidad",
			"La cantidad solo puede ser numérica"
		).isNumeric(),
		check(
			"detalles.*.nombreProducto",
			"El nombre del producto no puede estar vacío"
		).notEmpty(),
		check(
			"detalles.*.subtotal",
			"El subtotal no puede estar vacío"
		).notEmpty(),
		check(
			"detalles.*.subtotal",
			"El subtotal solo puede ser numérico"
		).isNumeric(),
		check("detalles.*.iva", "El IVA no puede estar vacío").notEmpty(),
		check("detalles.*.iva", "El IVA solo puede ser numérico").isNumeric(),
		validarCampos,
		validarJWT,
	],
	httpFactura.putFacturas
);

/* router.put("/detalles/:id", [
    check("id_produccion", "Ingrese un mongo id valido").isMongoId(),
    check("id_produccion").custom(helpersFacturas.validarIdProduccion),
    check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
    check("cantidad", "La cantidad solo puede ser numerica").isNumeric(),
    check("nombreProducto", "El nombre producto no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal no puede estar vacio").notEmpty(),
    check("subtotal", "El subtotal solo puede ser numerico").isNumeric(),
    check("iva", "El iva no puede estar vacio").notEmpty(),
    check("iva", "El iva solo puede ser numerico").isNumeric(),
    check("total", "El total no puede estar vacio").notEmpty(),
    check("total", "El total solo puede ser numerico").isNumeric(),
    validarCampos,
    validarJWT
], httpFacturas.putFacturasDetalles) */

export default router;
