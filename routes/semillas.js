import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpSemillas from "../controllers/semillas.js";
import helpersSemillas from "../helpers/semillas.js";

const router = Router();

router.get("/", [validarCampos, validarJWT], httpSemillas.getSemillas);

router.get(
	"/id/:id",
	[
		check(
			"id",
			"El ID de la semilla debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpSemillas.getSemillaId
);

router.get(
	"/activos",
	[validarCampos, validarJWT],
	httpSemillas.getSemillasActivas
);

router.get(
	"/inactivos",
	[validarCampos, validarJWT],
	httpSemillas.getSemillasInactivas
);

router.post(
	"/",
	[
		check(
			"id_finca",
			"El ID del proveedor es requerido y debe ser un mongoId válido."
		)
			.notEmpty()
			.isMongoId(),
		check("id_finca").custom(helpersSemillas.validarFincaId),
		check("nombre", "El nombre es requerido").notEmpty(),
		check("registro_ica", "El registro ica es requerido").notEmpty(),
		check("registro_invima", "El registro invima es requerido").notEmpty(),
		check(
			"fechaVencimiento",
			"La fecha de vencimiento es requerida"
		).notEmpty(),
		check("fechaVencimiento").custom(helpersSemillas.validarFecha),
		check(
			"especieYVariedad",
			"La especie y variedad es requerido"
		).notEmpty(),
		check("numLote", "El numero del lote es requerido").notEmpty(),
		check(
			"numLote",
			"El numero del lote debe ser un numero valido"
		).isFloat({ min: 0 }),
		check("origen", "El origen es requerido").notEmpty(),
		check(
			"poderGerminativo",
			"El porder germinativo es requerido"
		).notEmpty(),
		check("observaciones", "La obervacion es requerida").notEmpty(),
		check("unidad", "La unidad es requerida").notEmpty(),
		check("cantidad", "La cantidad es requerida").notEmpty(),
		check("cantidad", "La cantidad debe ser un numero valido").isFloat({
			min: 0,
		}),
		validarCampos,
		validarJWT,
	],
	httpSemillas.postSemilla
);

router.put(
	"/:id",
	[
		check(
			"id",
			"El ID de la semilla es requerido y debe ser un mongoId válido."
		)
			.notEmpty()
			.isMongoId(),
		check(
			"id_finca",
			"El ID del proveedor es requerido y debe ser un mongoId válido."
		)
			.notEmpty()
			.isMongoId(),
		check("id_finca").custom(helpersSemillas.validarFincaId),
		check("nombre", "El nombre es requerido").notEmpty(),
		check("registro_ica", "El registro ica es requerido").notEmpty(),
		check("registro_invima", "El registro invima es requerido").notEmpty(),
		check(
			"fechaVencimiento",
			"La fecha de vencimiento es requerida"
		).notEmpty(),
		check("fechaVencimiento").custom(helpersSemillas.validarFecha),
		check(
			"especieYVariedad",
			"La especie y variedad es requerido"
		).notEmpty(),
		check("numLote", "El numero del lote es requerido").notEmpty(),
		check(
			"numLote",
			"El numero del lote debe ser un numero valido"
		).isFloat({ min: 0 }),
		check("origen", "El origen es requerido").notEmpty(),
		check(
			"poderGerminativo",
			"El porder germinativo es requerido"
		).notEmpty(),
		check("observaciones", "La obervacion es requerida").notEmpty(),
		check("unidad", "La unidad es requerida").notEmpty(),
		check("cantidad", "La cantidad es requerida").notEmpty(),
		check("cantidad", "La cantidad debe ser un numero valido").isFloat({
			min: 0,
		}),
		validarCampos,
		validarJWT,
	],
	httpSemillas.putSemilla
);

router.put(
	"/activar/:id",
	[
		check(
			"id",
			"El ID de la semilla debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpSemillas.putSemillaActivar
);

router.put(
	"/inactivar/:id",
	[
		check(
			"id",
			"El ID de la semilla debe ser un mongoId válido."
		).isMongoId(),
		validarCampos,
		validarJWT,
	],
	httpSemillas.putSemillaInactivar
);

export default router;
