import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpControlPlagas from "../controllers/control_plagas.js";
import herlpersControlPlagas from "../helpers/control_plagas.js";

const router = Router();

router.get("/", [], httpControlPlagas.getPlagas);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(herlpersControlPlagas.validarId),
    validarCampos
], httpControlPlagas.getPlagasId);
router.get("/activos", [], httpControlPlagas.getPlagasActivos);
router.get("/inactivos", [], httpControlPlagas.getPlagasInactivos);
router.get("/fecha/:fechaInicio/:fechaFin", [
    check("fechaInicio", "Ingrese una fecha inicial valida").isISO8601().toDate(),
    check("fechaFin", "Ingrese una fecha final valida").isISO8601().toDate(),
    check(["fechaInicio", "fechaFin"]).custom(herlpersControlPlagas.validarFechas),
    validarCampos
], httpControlPlagas.getPlagasFechas);
router.get("/operario/:operario", [], httpControlPlagas.getPlagasOperario);
router.get("/tipo/:tipo", [], httpControlPlagas.getPlagasTipo);

router.post("/", [
    check("id_cultivo", "El id cultivo no puede estar vacio").notEmpty(),
    check("id_cultivo", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("id_cultivo").custom(herlpersControlPlagas.validarIdCultivo),
    check("empleado_id", "El id empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("empleado_id").custom(herlpersControlPlagas.validarIdEmpleado),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "ingrese una fecha valida").matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    check("tipoCultivo", "El tipo cultivo no puede estar vacio").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("ingredientesActivo", "El ingrediente activo no puede estar vacio").notEmpty(),
    check("dosis", "La dosis no puede estar vacia").notEmpty(),
    check("operario", "El operario no puede estar vacio").notEmpty(),
    check("observaciones", "La observaciones no puede estar vacia").notEmpty(),
    validarCampos
], httpControlPlagas.postPlagas);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(herlpersControlPlagas.validarId),
    check("id_cultivo", "El id cultivo no puede estar vacio").notEmpty(),
    check("id_cultivo", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("id_cultivo").custom(herlpersControlPlagas.validarIdCultivo),
    check("empleado_id", "El id empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en el id cultivo").isMongoId(),
    check("empleado_id").custom(herlpersControlPlagas.validarIdEmpleado),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "ingrese una fecha valida").matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
    check("tipoCultivo", "El tipo cultivo no puede estar vacio").notEmpty(),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("ingredientesActivo", "El ingrediente activo no puede estar vacio").notEmpty(),
    check("dosis", "La dosis no puede estar vacia").notEmpty(),
    check("operario", "El operario no puede estar vacio").notEmpty(),
    check("observaciones", "La observaciones no puede estar vacia").notEmpty(),
    validarCampos
], httpControlPlagas.putPlagas);
router.put("/activar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(herlpersControlPlagas.validarId),
    validarCampos
], httpControlPlagas.putPlagasActivar);
router.put("/desactivar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(herlpersControlPlagas.validarId),
    validarCampos
], httpControlPlagas.putPlagasInactivar);

export default router;
