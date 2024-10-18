import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpFertilizacion from "../controllers/fertilizaciones.js";
import helpersFertilizaciones from "../helpers/fertilizaciones.js";

const router = Router();

router.get("/", [validarJWT], httpFertilizacion.getFertilizaciones);

router.get(
	"/id/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersFertilizaciones.validarId),
		validarCampos,
		validarJWT,
	],
	httpFertilizacion.getFertilizacionesId
);

router.get(
	"/empleado/:empleado_id",
	[
		check("empleado_id", "Ingrese un mongo id valido").isMongoId(),
		check("empleado_id").custom(helpersFertilizaciones.validarIdEmpleado),
		validarCampos,
		validarJWT,
	],
	httpFertilizacion.getFertilizacionesEmpleado
);

router.get(
	"/fecha/:fechaInicio/:fechaFin",
	[
		check("fechaInicio").custom(helpersFertilizaciones.validarFecha),
		check("fechaFin").custom(helpersFertilizaciones.validarFecha),
		check(["fechaInicio", "fechaFin"]).custom(
			helpersFertilizaciones.validarFechas
		),
		validarCampos,
		validarJWT,
	],
	httpFertilizacion.getFertilizacionesFechas
);

router.post(
	"/",
	[
		check("id_cultivo", "El id cultivo no puede estar vacio").notEmpty(),
		check("id_cultivo", "Ingrese un mongo id valido").isMongoId(),
		check("id_cultivo").custom(helpersFertilizaciones.validarIdCultivo),
		check("empleado_id", "El empleado id no puede estar vacio").notEmpty(),
		check("empleado_id", "Ingrese un mongo id valido").isMongoId(),
		check("empleado_id").custom(helpersFertilizaciones.validarIdEmpleado),
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersFertilizaciones.validarFecha),
		check(
			"estadoFenologico",
			"El estado fenologico no puede estar vacio"
		).notEmpty(),
		check("tipo", "El tipo no puede estar vacio").notEmpty(),
		check(
			"nombreFertilizante",
			"El nombre fertilizante no puede estar vacio"
		).notEmpty(),
		check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
		check("cantidad", "La cantidad solo puede ser numerica").isNumeric(),
		validarCampos,
		validarJWT,
	],
	httpFertilizacion.postFertilizaciones
);

router.put(
	"/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersFertilizaciones.validarId),
		check("id_cultivo", "El id cultivo no puede estar vacio").notEmpty(),
		check("id_cultivo", "Ingrese un mongo id valido").isMongoId(),
		check("id_cultivo").custom(helpersFertilizaciones.validarIdCultivo),
		check("empleado_id", "El empleado id no puede estar vacio").notEmpty(),
		check("empleado_id", "Ingrese un mongo id valido").isMongoId(),
		check("empleado_id").custom(helpersFertilizaciones.validarIdEmpleado),
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersFertilizaciones.validarFecha),
		check(
			"estadoFenologico",
			"El estado fenologico no puede estar vacio"
		).notEmpty(),
		check("tipo", "El tipo no puede estar vacio").notEmpty(),
		check(
			"nombreFertilizante",
			"El nombre fertilizante no puede estar vacio"
		).notEmpty(),
		check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
		check("cantidad", "La cantidad solo puede ser numerica").isNumeric(),
		validarCampos,
		validarJWT,
	],
	httpFertilizacion.putFertilizaciones
);

export default router;
