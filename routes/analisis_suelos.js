import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpAnalisisSuelo from "../controllers/analisis_suelos.js";
import helpersAnalisisSuelos from "../helpers/analisis_suelo.js";

const router = Router();

router.get("/", [validarJWT], httpAnalisisSuelo.getSuelos);

router.get(
	"/id/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersAnalisisSuelos.validarId),
		validarCampos,
		validarJWT,
	],
	httpAnalisisSuelo.getSuelosId
);

router.get("/activos", [validarJWT], httpAnalisisSuelo.getSuelosActivos);

router.get("/desactivados", [validarJWT], httpAnalisisSuelo.getSuelosInactivos);

router.get(
	"/fecha/:fechaInicio/:fechaFin",
	[
		check("fechaInicio").custom(helpersAnalisisSuelos.validarFecha),
		check("fechaFin").custom(helpersAnalisisSuelos.validarFecha),
		check(["fechaInicio", "fechaFin"]).custom(
			helpersAnalisisSuelos.validarFechas
		),
		validarCampos,
		validarJWT,
	],
	httpAnalisisSuelo.getSualosFechas
);

router.get(
	"/responsable/:empleado_id",
	[
		check("empleado_id", "Ingrese un mongo id valido").isMongoId(),
		check("empleado_id").custom(helpersAnalisisSuelos.validarIdEmpleado),
		validarCampos,
		validarJWT,
	],
	httpAnalisisSuelo.getSuelosResponsables
);

router.post(
	"/",
	[
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersAnalisisSuelos.validarFecha),
		check(
			"id_parcela",
			"El id de la parcela no puede estar vacia"
		).notEmpty(),
		check(
			"id_parcela",
			"Ingrese un mongo id valido en parcela"
		).isMongoId(),
		check("id_parcela").custom(helpersAnalisisSuelos.validarIdParcela),
		check(
			"empleado_id",
			"El id de empleado no puede estar vacio"
		).notEmpty(),
		check(
			"empleado_id",
			"Ingrese un mongo id valido en empleado"
		).isMongoId(),
		check("empleado_id").custom(helpersAnalisisSuelos.validarIdEmpleado),
		check("muestra", "La muestra no puede estar vacia").notEmpty(),
		check("cultivo", "El cultivo no puede estar vacio").notEmpty(),
		check("laboratorio", "El laboratorio no puede estar vacio").notEmpty(),
		check("resultados", "Los resultados no pueden estar vacias").notEmpty(),
		check(
			"recomendaciones",
			"Las recomendaciones no pueden estar vacias"
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpAnalisisSuelo.postSuelos
);

router.put(
	"/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersAnalisisSuelos.validarId),
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersAnalisisSuelos.validarFecha),
		check(
			"id_parcela",
			"El id de la parcela no puede estar vacia"
		).notEmpty(),
		check(
			"id_parcela",
			"Ingrese un mongo id valido en parcela"
		).isMongoId(),
		check("id_parcela").custom(helpersAnalisisSuelos.validarIdParcela),
		check(
			"empleado_id",
			"El id de empleado no puede estar vacio"
		).notEmpty(),
		check(
			"empleado_id",
			"Ingrese un mongo id valido en empleado"
		).isMongoId(),
		check("empleado_id").custom(helpersAnalisisSuelos.validarIdEmpleado),
		check("muestra", "La muestra no puede estar vacia").notEmpty(),
		check("cultivo", "El cultivo no puede estar vacio").notEmpty(),
		check("laboratorio", "El laboratorio no puede estar vacio").notEmpty(),
		check("resultados", "Los resultados no pueden estar vacias").notEmpty(),
		check(
			"recomendaciones",
			"Las recomendaciones no pueden estar vacias"
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpAnalisisSuelo.putSuelos
);

router.put(
	"/activar/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersAnalisisSuelos.validarId),
		validarCampos,
		validarJWT,
	],
	httpAnalisisSuelo.putSuelosActivar
);

router.put(
	"/desactivar/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersAnalisisSuelos.validarId),
		validarCampos,
		validarJWT,
	],
	httpAnalisisSuelo.putSuelosInactivar
);

export default router;
