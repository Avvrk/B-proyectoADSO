import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpAnalisisSuelo from "../controllers/analisis_suelos.js";
import helpersAnalisisSuelos from "../helpers/analisis_suelo.js";

const router = Router();

router.get("/", [], httpAnalisisSuelo.getSuelos);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelos.validarId),
    validarCampos
], httpAnalisisSuelo.getSuelosId);
router.get("/activos", [], httpAnalisisSuelo.getSuelosActivos);
router.get("/desactivados", [], httpAnalisisSuelo.getSuelosInactivos);
router.get("/fecha/:fechaInicio/:fechaFin", [
    // check("fechaInicio", "Ingrese una fecha inicial valida").isISO8601().toDate(),
    // check("fechaFin", "Ingrese una fecha final valida").isISO8601().toDate(),
    // check(["fechaInicio", "fechaFin"]).custom(helpersAnalisisSuelos.validarFechas),
    validarCampos
], httpAnalisisSuelo.getSualosFechas);
router.get("/responsable/:empleado_id", [
    check("empleado_id", "Ingrese un mongo id valido").isMongoId(),
    check("empleado_id").custom(helpersAnalisisSuelos.validarIdEmpleado),
    validarCampos
], httpAnalisisSuelo.getSuelosResponsables);

router.post("/", [
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "Ingrese una fecha valida").isISO8601().toDate(),
    check("id_parcela", "El id de la parcela no puede estar vacia").notEmpty(),
    check("id_parcela", "Ingrese un mongo id valido en parcela").isMongoId(),
    check("id_parcela").custom(helpersAnalisisSuelos.validarIdParcela),
    check("empleado_id", "El id de empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en empleado").isMongoId(),
    check("empleado_id").custom(helpersAnalisisSuelos.validarIdEmpleado),
    check("muestra", "La muestra no puede estar vacia").notEmpty(),
    check("cultivo", "El cultivo no puede estar vacio").notEmpty(),
    check("laboratorio", "El laboratorio no puede estar vacio").notEmpty(),
    check("resultados", "Los resultados no pueden estar vacias").notEmpty(),
    check("recomendaciones", "Las recomendaciones no pueden estar vacias").notEmpty(),
    validarCampos
], httpAnalisisSuelo.postSuelos);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelos.validarId),
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("fecha", "Ingrese una fecha valida").isISO8601().toDate(),
    check("id_parcela", "El id de la parcela no puede estar vacia").notEmpty(),
    check("id_parcela", "Ingrese un mongo id valido en parcela").isMongoId(),
    check("id_parcela").custom(helpersAnalisisSuelos.validarIdParcela),
    check("empleado_id", "El id de empleado no puede estar vacio").notEmpty(),
    check("empleado_id", "Ingrese un mongo id valido en empleado").isMongoId(),
    check("empleado_id").custom(helpersAnalisisSuelos.validarIdEmpleado),
    check("muestra", "La muestra no puede estar vacia").notEmpty(),
    check("cultivo", "El cultivo no puede estar vacio").notEmpty(),
    check("laboratorio", "El laboratorio no puede estar vacio").notEmpty(),
    check("resultados", "Los resultados no pueden estar vacias").notEmpty(),
    check("recomendaciones", "Las recomendaciones no pueden estar vacias").notEmpty(),
    validarCampos
], httpAnalisisSuelo.putSuelos);
router.put("/activar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelos.validarId),
    validarCampos
], httpAnalisisSuelo.putSuelosActivar);
router.put("/desactivar/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersAnalisisSuelos.validarId),
    validarCampos
], httpAnalisisSuelo.putSuelosInactivar);

export default router;
