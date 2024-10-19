import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpMaquinariaHerramientas from "../controllers/maquinaria_herramientas.js";
import helpersMaquinariaHerramienta from "../helpers/maquinaria_herramienta.js";

const router = Router();

router.get("/", [validarJWT], httpMaquinariaHerramientas.getMaquinariaH);

router.get(
	"/id/:id",
	[
		check(
			"id",
			"El ID de la maquinaria o herramienta debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpMaquinariaHerramientas.getMaquinariaHId
);

router.get(
	"/activos",
	[validarJWT],
	httpMaquinariaHerramientas.getMaquinariaHActivos
);

router.get(
	"/inactivos",
	[validarJWT],
	httpMaquinariaHerramientas.getMaquinariaHInactivos
);

router.get(
	"/fechas/:fechaInicio/:fechaFin",
	[
		check("fechaInicio", "La fecha de inicio es requerida.").notEmpty(),
		check("fechaInicio", "La fecha de inicio debe ser una fecha válida.")
			.isISO8601()
			.toDate(),
		check("fechaFin", "La fecha de fin es requerida.").notEmpty(),
		check("fechaFin", "La fecha de fin debe ser una fecha válida.")
			.isISO8601()
			.toDate(),
		validarCampos,
		validarJWT,
	],
	httpMaquinariaHerramientas.getMaquinariaHFechas
);

router.get(
	"/cantidad/:tipo",
	[
		check(
			"tipo",
			"El tipo de maquinaria o herramienta es requerido."
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpMaquinariaHerramientas.getMaquinariaHCantidad
);

router.get(
	"/total",
	[validarJWT],
	httpMaquinariaHerramientas.getMaquinariaHTotal
);

router.post(
	"/",
	[
		check("proveedores_id", "El ID del proveedor es requerido.").notEmpty(),
		check(
			"proveedores_id",
			"El ID del proveedor debe ser un mongoId válido."
		).isMongoId(),
		check("nombre", "El nombre es requerido.").notEmpty(),
		check("tipo", "El tipo es requerido.").notEmpty(),
		check("fechaCompra", "La fecha de compra es requerida.").notEmpty(),
		check("fechaCompra", "La fecha de compra debe ser una fecha válida.")
			.isISO8601()
			.toDate(),
		check("observaciones").custom(
			helpersMaquinariaHerramienta.validarObservaciones
		),
		check("cantidad", "La cantidad es requerida.").notEmpty(),
		check("cantidad", "La cantidad debe ser un número positivo.")
			.isNumeric()
			.toFloat()
			.isFloat({ min: 0 }),
		check("total", "El total es requerido.").notEmpty(),
		check("total", "El total debe ser un número positivo.")
			.isNumeric()
			.toFloat()
			.isFloat({ min: 0 }),
		check("estado", "El estado es requerido.").notEmpty(),
		check("estado", "El estado debe ser un número válido.").isNumeric(),
		validarCampos,
		validarJWT,
	],
	httpMaquinariaHerramientas.postMaquinariaH
);

router.put(
	"/:id",
	[
		check(
			"id",
			"El ID de la maquinaria o herramienta es requerido."
		).notEmpty(),
		check(
			"id",
			"El ID de la maquinaria o herramienta debe ser un mongoId válido."
		).isMongoId(),
		check("proveedores_id").custom(
			helpersMaquinariaHerramienta.validarIdProveedor
		),
		check("nombre").custom(helpersMaquinariaHerramienta.validarNombre),
		check("tipo").custom(helpersMaquinariaHerramienta.validarTipo),
		check("fechaCompra").custom(
			helpersMaquinariaHerramienta.validarFechaCompra
		),
		check("observaciones").custom(
			helpersMaquinariaHerramienta.validarObservaciones
		),
		check("cantidad").custom(helpersMaquinariaHerramienta.validarCantidad),
		check("total").custom(helpersMaquinariaHerramienta.validarTotal),
		check("estado").custom(helpersMaquinariaHerramienta.validarEstado),
		validarCampos,
		validarJWT,
	],
	httpMaquinariaHerramientas.putMaquinariaH
);

router.put(
	"/activar/:id",
	[
		check(
			"id",
			"El ID de la maquinaria o herramienta debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpMaquinariaHerramientas.putMaquinariaHActivar
);

router.put(
	"/inactivar/:id",
	[
		check(
			"id",
			"El ID de la maquinaria o herramienta debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpMaquinariaHerramientas.putMaquinariaHInactivar
);

export default router;
