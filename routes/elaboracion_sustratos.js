import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpElaboracionSustrato from "../controllers/Elaboracion_sustratos.js";
import helpersSustratos from "../helpers/elaboracion_sustratos.js";

const router = Router();

router.get("/", [validarJWT], httpElaboracionSustrato.getSustratos);

router.get(
	"/id/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersSustratos.validarId),
		validarCampos,
		validarJWT,
	],
	httpElaboracionSustrato.getSustratosId
);

router.get(
	"/proceso/:id_proceso",
	[
		check("id_proceso", "Ingrese un mongo id valido").isMongoId(),
		check("id_proceso").custom(helpersSustratos.validarIdProceso),
		validarCampos,
		validarJWT,
	],
	httpElaboracionSustrato.getSustratosProceso
);

router.get(
	"/operario/:empleado_idOperario",
	[
		check("empleado_idOperario", "Ingrese un mongo id valido").isMongoId(),
		check("empleado_idOperario").custom(helpersSustratos.validarIdEmpleado),
		validarCampos,
		validarJWT,
	],
	httpElaboracionSustrato.getSustratosOperario
);

router.get(
	"/fecha/:fechaInicio/:fechaFin",
	[
		check("fechaInicio").custom(helpersSustratos.validarFecha),
		check("fechaFin").custom(helpersSustratos.validarFecha),
		check(["fechaInicio", "fechaFin"]).custom(
			helpersSustratos.validarFechas
		),
		validarCampos,
		validarJWT,
	],
	httpElaboracionSustrato.getSustratosFechas
);

router.get(
	"/responsable/:empleado_idResponsable",
	[
		check(
			"empleado_idResponsable",
			"Ingrese un mongo id valido"
		).isMongoId(),
		check("empleado_idResponsable").custom(
			helpersSustratos.validarIdEmpleado
		),
		validarCampos,
		validarJWT,
	],
	httpElaboracionSustrato.getSustratosResponsable
);

router.post(
	"/",
	[
		check("id_proceso", "El idProceso no puede estar vacio").notEmpty(),
		check("id_proceso", "Ingrese un mongo id valido").isMongoId(),
		check("id_proceso").custom(helpersSustratos.validarIdProceso),
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersSustratos.validarFecha),
		check(
			"productoComercial",
			"El producto comercial no puede estar vacio"
		).notEmpty(),
		check(
			"ingredienteActivo",
			"El ingrediente activo no puede estar vacio"
		).notEmpty(),
		check(
			"dosisUtilizada",
			"La dosis utilizada no puede estar vacia"
		).notEmpty(),
		check(
			"metodoAplicacion",
			"El metodo aplicacion no puede estar vacio"
		).notEmpty(),
		check(
			"empleado_idOperario",
			"El empleado operario no puede estar vacio"
		).notEmpty(),
		check("empleado_idOperario", "Ingrese un mongo id valido").isMongoId(),
		check("empleado_idOperario").custom(helpersSustratos.validarIdEmpleado),
		check(
			"empleado_idResponsable",
			"El empleado responsable no puede estar vacio"
		).notEmpty(),
		check(
			"empleado_idResponsable",
			"Ingrese un mongo id valido"
		).isMongoId(),
		check("empleado_idResponsable").custom(
			helpersSustratos.validarIdEmpleado
		),
		check(
			"observaciones",
			"La observacion no puede estar vacia"
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpElaboracionSustrato.postSustratos
);

router.put(
	"/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersSustratos.validarId),
		check("id_proceso", "El idProceso no puede estar vacio").notEmpty(),
		check("id_proceso", "Ingrese un mongo id valido").isMongoId(),
		check("id_proceso").custom(helpersSustratos.validarIdProceso),
		check("fecha", "La fecha no puede estar vacia").notEmpty(),
		check("fecha").custom(helpersSustratos.validarFecha),
		check(
			"productoComercial",
			"El producto comercial no puede estar vacio"
		).notEmpty(),
		check(
			"ingredienteActivo",
			"El ingrediente activo no puede estar vacio"
		).notEmpty(),
		check(
			"dosisUtilizada",
			"La dosis utilizada no puede estar vacia"
		).notEmpty(),
		check(
			"metodoAplicacion",
			"El metodo aplicacion no puede estar vacio"
		).notEmpty(),
		check(
			"empleado_idOperario",
			"El empleado operario no puede estar vacio"
		).notEmpty(),
		check("empleado_idOperario", "Ingrese un mongo id valido").isMongoId(),
		check("empleado_idOperario").custom(helpersSustratos.validarIdEmpleado),
		check(
			"empleado_idResponsable",
			"El empleado responsable no puede estar vacio"
		).notEmpty(),
		check(
			"empleado_idResponsable",
			"Ingrese un mongo id valido"
		).isMongoId(),
		check("empleado_idResponsable").custom(
			helpersSustratos.validarIdEmpleado
		),
		check(
			"observaciones",
			"La observacion no puede estar vacia"
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpElaboracionSustrato.putSustratos
);

export default router;
