import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpPreparacionSuelos from "../controllers/preparacion_suelos.js";
import helpersPreparacionSuelos from "../helpers/preparacion_suelos.js";

const router = Router();

router.get("/", [validarJWT], httpPreparacionSuelos.getPreparacionSue);

router.get(
	"/activos",
	[validarJWT],
	httpPreparacionSuelos.getPreparacionSueActivos
);

router.get(
	"/inactivos",
	[validarJWT],
	httpPreparacionSuelos.getPreparacionSueInactivos
);

router.get(
	"/fechas",
	[
		check("fechaInicio", "La fecha de inicio es requerida.").notEmpty(),
		check("fechaInicio", "La fecha de inicio debe ser una fecha válida.")
			.isISO8601()
			.toDate(),
		check("fechaFin", "La fecha de fin es requerida.").notEmpty(),
		check("fechaFin", "La fecha de fin debe ser una fecha válida.")
			.not()
			.isDate(),
		validarCampos,
		validarJWT,
	],
	httpPreparacionSuelos.getPreparacionSueFechas
);

router.get(
	"/responsable/:responsable",
	[
		check(
			"responsable",
			"El nombre del responsable es requerido."
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpPreparacionSuelos.getPreparacionSueResponsable
);

/* router.get('/porcentaje', httpPreparacionSuelos.getPreparacionSuePorcentaje);
 */

router.post(
	"/",
	[
		check("fecha").custom(helpersPreparacionSuelos.validarFecha),
		check("id_parcela", "El ID de la parcela es requerido.").notEmpty(),
		check(
			"id_parcela",
			"El ID de la parcela debe ser un mongoId válido."
		).isMongoId(),
		check("empleado_id", "El ID del empleado es requerido.").notEmpty(),
		check(
			"empleado_id",
			"El ID del empleado debe ser un mongoId válido."
		).isMongoId(),
		check("productos", "El campo productos es requerido.").notEmpty(),
		check(
			"ingredienteActivo",
			"El ingrediente activo es requerido."
		).notEmpty(),
		check("dosis", "La dosis es requerida.").notEmpty(),
		check("dosis", "La dosis debe ser un número positivo.")
			.isNumeric()
			.toFloat()
			.isFloat({ min: 0 }),
		check(
			"metodoAplicacion",
			"El método de aplicación es requerido."
		).notEmpty(),
		check("responsable", "El responsable es requerido.").notEmpty(),
		check("observaciones", "Las observaciones son requeridas.").notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpPreparacionSuelos.postPreparacionSue
);

router.put(
	"/:id",
	[
		check(
			"id",
			"El ID de la preparación de suelos es requerido."
		).notEmpty(),
		check(
			"id",
			"El ID de la preparación de suelos debe ser un mongoId válido."
		).isMongoId(),
		check("fecha").custom(helpersPreparacionSuelos.validarFecha),
		check("id_parcela").custom(helpersPreparacionSuelos.validarIdParcela),
		check("empleado_id").custom(helpersPreparacionSuelos.validarEmpleadoId),
		check("productos").custom(helpersPreparacionSuelos.validarProductos),
		check("ingredienteActivo").custom(
			helpersPreparacionSuelos.validarIngredienteActivo
		),
		check("dosis").custom(helpersPreparacionSuelos.validarDosis),
		check("metodoAplicacion").custom(
			helpersPreparacionSuelos.validarMetodoAplicacion
		),
		check("operario").custom(helpersPreparacionSuelos.validarOperario),
		check("responsable").custom(
			helpersPreparacionSuelos.validarResponsable
		),
		check("observaciones").custom(
			helpersPreparacionSuelos.validarObservaciones
		),
		check("estado").custom(helpersPreparacionSuelos.validarEstado),
		validarCampos,
		validarJWT,
	],
	httpPreparacionSuelos.putPreparacionSue
);

router.put(
	"/activar/:id",
	[
		check(
			"id",
			"El ID de la preparación de suelos debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpPreparacionSuelos.putPreparacionSueActivar
);

router.put(
	"/inactivar/:id",
	[
		check(
			"id",
			"El ID de la preparación de suelos debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpPreparacionSuelos.putPreparacionSueInactivar
);

export default router;
