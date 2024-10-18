import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpEmpleado from "../controllers/empleados.js";
import helpersEmpleados from "../helpers/empleados.js";

const router = Router();

router.get("/", [validarJWT], httpEmpleado.getEmpleados);

router.get(
	"/id/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersEmpleados.validarId),
		validarCampos,
		validarJWT,
	],
	httpEmpleado.getEmpleadosId
);

router.get(
	"/descripcion/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersEmpleados.validarId),
		validarCampos,
		validarJWT,
	],
	httpEmpleado.getEmpleadosDescripcion
);

router.get("/activos", [validarJWT], httpEmpleado.getEmpleadosActivos);

router.get("/inactivos", [validarJWT], httpEmpleado.getEmpleadosInactivos);

router.post(
	"/",
	[
		check("nombre", "El nombre no puede estar vacio").notEmpty(),
		check("direccion", "La direccion no puede estar vacia").notEmpty(),
		check("telefono", "El telefono no puede estar vacio").notEmpty(),
		check(
			"telefono",
			"El telefono debe tener minimo 8 caracteres"
		).isLength({ min: 8 }),
		check("estudios", "El estudio no puede estar vacio").notEmpty(),
		check("descripcion", "La descripcion no puede estar vacia").notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpEmpleado.postEmpleados
);

router.put(
	"/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersEmpleados.validarId),
		check("nombre", "El nombre no puede estar vacio").notEmpty(),
		check("direccion", "La direccion no puede estar vacia").notEmpty(),
		check("telefono", "El telefono no puede estar vacio").notEmpty(),
		check(
			"telefono",
			"El telefono debe tener minimo 8 caracteres"
		).isLength({ min: 8 }),
		check("estudios", "El estudio no puede estar vacio").notEmpty(),
		check("descripcion", "La descripcion no puede estar vacia").notEmpty(),
		validarCampos,
		validarJWT,
	],
	httpEmpleado.putEmpleados
);

router.put(
	"/activar/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersEmpleados.validarId),
		validarCampos,
		validarJWT,
	],
	httpEmpleado.putEmpleadosActivar
);

router.put(
	"/inactivar/:id",
	[
		check("id", "Ingrese un mongo id valido").isMongoId(),
		check("id").custom(helpersEmpleados.validarId),
		validarCampos,
		validarJWT,
	],
	httpEmpleado.putEmpleadosInactivar
);

export default router;
