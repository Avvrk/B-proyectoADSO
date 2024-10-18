import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpRiegos from "../controllers/riego.js";
import helpersRiegos from "../helpers/riego.js";

const router = Router();

router.get("/", [validarCampos, validarJWT], httpRiegos.getRiegos);

router.get(
	"/id/:id",
	[
		check("id", "El ID del riego debe ser un mongoId válido.").isMongoId(),
		check("id").custom(helpersRiegos.existeRiegoPorId),
		validarCampos,
		validarJWT,
	],
	httpRiegos.getRiegoId
);

router.get(
	"/fechas",
	[
		check("fechaInicio", "La fecha de inicio es requerida.").notEmpty(),
		check(
			"fechaInicio",
			"La fecha de inicio debe ser una fecha válida."
		).isISO8601(),
		check("fechaFin", "La fecha de fin es requerida.").notEmpty(),
		check(
			"fechaFin",
			"La fecha de fin debe ser una fecha válida."
		).isISO8601(),
		validarCampos,
		validarJWT,
	],
	httpRiegos.getRiegosFechas
);

router.get(
	"/empleado/:empleado_id",
	[
		check(
			"empleado_id",
			"El ID del empleado debe ser un mongoId válido."
		).isMongoId(),
		check("empleado_id").custom(helpersRiegos.validarEmpleadoId),
		validarCampos,
		validarJWT,
	],
	httpRiegos.getRiegosEmpleado
);

router.get(
	"/cultivo/:cultivo_id",
	[
		check(
			"cultivo_id",
			"El ID del cultivo debe ser un mongoId válido."
		).isMongoId(),
		check("cultivo_id").custom(helpersRiegos.validarCultivoId),
		validarCampos,
		validarJWT,
	],
	httpRiegos.getRiegosPorCultivo
);

router.get(
	"/cantidadAgua/:cultivo_id",
	[
		check(
			"cultivo_id",
			"El ID del cultivo debe ser un mongoId válido."
		).isMongoId(),
		check("cultivo_id").custom(helpersRiegos.validarCultivoId),
		validarCampos,
		validarJWT,
	],
	httpRiegos.getCantidadAguaPorCultivo
);

router.get(
	"/activos",
	[validarCampos, validarJWT],
	httpRiegos.getRiegosActivos
);

router.get(
	"/inactivos",
	[validarCampos, validarJWT],
	httpRiegos.getRiegosInactivos
);

router.post(
	"/",
	[
		check("cultivo_id", "El ID del cultivo es requerido.").notEmpty(),
		check(
			"cultivo_id",
			"El ID del cultivo debe ser un mongoId válido."
		).isMongoId(),
		check("cultivo_id").custom(helpersRiegos.validarCultivoId),
		check("empleado_id", "El ID del empleado es requerido.").notEmpty(),
		check(
			"empleado_id",
			"El ID del empleado debe ser un mongoId válido."
		).isMongoId(),
		check("empleado_id").custom(helpersRiegos.validarEmpleadoId),
		check("fecha", "La fecha es requerida.").notEmpty(),
		// check('fecha').custom(helpersRiegos.validarFecha),
		check("dias_transplante").optional().isInt({ min: 0 }),
		// check('estado_fenologico').optional().custom(helpersRiegos.validarEstadoFenologico),
		// check('hora_inicio').optional().custom(helpersRiegos.validarHora),
		// check('hora_fin').optional().custom(helpersRiegos.validarHora),
		// check('dosis').optional().custom(helpersRiegos.validarDosis),
		// check('cantidad_agua').optional().custom(helpersRiegos.validarCantidadAgua),
		// check('estado').optional().custom(helpersRiegos.validarEstado),
		validarCampos,
		validarJWT,
	],
	httpRiegos.postRiego
);

router.put(
	"/:id",
	[
		check("id", "El ID del riego debe ser un mongoId válido.").isMongoId(),
		// check('id').custom(helpersRiegos.existeRiegoPorId),
		check("cultivo_id")
			.optional()
			.isMongoId()
			.custom(helpersRiegos.validarCultivoId),
		check("empleado_id")
			.optional()
			.isMongoId()
			.custom(helpersRiegos.validarEmpleadoId),
		// check('fecha').optional().custom(helpersRiegos.validarFecha),
		check("dias_transplante").optional().isInt({ min: 0 }),
		check("estado_fenologico")
			.optional()
			.custom(helpersRiegos.validarEstadoFenologico),
		// check('hora_inicio').optional().custom(helpersRiegos.validarHora),
		// check('hora_fin').optional().custom(helpersRiegos.validarHora),
		check("dosis").optional().custom(helpersRiegos.validarDosis),
		check("cantidad_agua")
			.optional()
			.custom(helpersRiegos.validarCantidadAgua),
		validarCampos,
		validarJWT,
	],
	httpRiegos.putRiego
);

router.put(
	"/activar/:id",
	[
		check("id", "El ID del riego debe ser un mongoId válido.").isMongoId(),
		// check('id').custom(helpersRiegos.existeRiegoPorId),
		validarCampos,
		validarJWT,
	],
	httpRiegos.putRiegoActivar
);

router.put(
	"/inactivar/:id",
	[
		check("id", "El ID del riego debe ser un mongoId válido.").isMongoId(),
		// check('id').custom(helpersRiegos.existeRiegoPorId),
		validarCampos,
		validarJWT,
	],
	httpRiegos.putRiegoInactivar
);

export default router;
