import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpInsumos from "../controllers/insumos.js";
import helpersInsumos from "../helpers/insumos.js";

const router = Router();

router.get("/", [validarJWT], httpInsumos.getInsumos);

router.get(
	"/id/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersInsumos.validarId),
		validarCampos,
		validarJWT,
	],
	httpInsumos.getInsumos
);

router.post(
	"/",
	[
		check("id_finca", "El id finca no puede estar vacio").notEmpty(),
		check("id_finca", "Ingrese un mongo id valido").isMongoId(),
		check("id_finca").custom(helpersInsumos.validarIdFinca),
		check("nombre", "El nombre no puede estar vacio").notEmpty(),
		check(
			"registro_ica",
			"El registro ica no puede estar vacia"
		).notEmpty(),
		check(
			"registro_invima",
			"El registro invima no puede estar vacia"
		).notEmpty(),
		check("relacionNPK", "La relacionNPK no puede estar vacia").notEmpty(),
		check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
		check("cantidad", "La cantidad debe ser numerica").isNumeric(),
		check("unidad", "La unidad no puede estar vacia").notEmpty(),
		check(
			"observaciones",
			"La observacion no puede estar vacia"
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpInsumos.postInsumos
);

router.put(
	"/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersInsumos.validarId),
		check("id_finca", "El id finca no puede estar vacio").notEmpty(),
		check("id_finca", "Ingrese un mongo id valido").isMongoId(),
		check("id_finca").custom(helpersInsumos.validarIdFinca),
		check("nombre", "El nombre no puede estar vacio").notEmpty(),
		check(
			"registro_ica",
			"El registro ica no puede estar vacia"
		).notEmpty(),
		check(
			"registro_invima",
			"El registro invima no puede estar vacia"
		).notEmpty(),
		check("relacionNPK", "La relacionNPK no puede estar vacia").notEmpty(),
		check("cantidad", "La cantidad no puede estar vacia").notEmpty(),
		check("cantidad", "La cantidad debe ser numerica").isNumeric(),
		check("unidad", "La unidad no puede estar vacia").notEmpty(),
		check(
			"observaciones",
			"La observacion no puede estar vacia"
		).notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpInsumos.putInsumos
);

export default router;
