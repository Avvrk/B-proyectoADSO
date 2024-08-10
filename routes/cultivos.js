import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-datos.js";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpCultivo from "../controllers/cultivos.js";
import helpersCultivos from "../helpers/cultivos.js";

const router = Router();

router.get("/", [], httpCultivo.getCultivos);
router.get("/id/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersCultivos.validarId),
    validarCampos
], httpCultivo.getCultivosId);
router.get("/parcelas/:id_parcela", [
    check("id_parcela", "Ingrese un mongo id valido").isMongoId(),
    check("id_parcela").custom(helpersCultivos.validarIdParcela),
    validarCampos
], httpCultivo.getCultivosParcela);
router.get("/tipo/:tipo", [], httpCultivo.getCultivosTipo);

router.post("/", [
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("id_parcela", "La idParcela no puede estar vacia").notEmpty(),
    check("id_parcela", "Ingrese un mongo id valido en la parcela").isMongoId(),
    validarCampos
], httpCultivo.postCultivos);

router.put("/:id", [
    check("id", "Ingrese un mongo id valido").isMongoId(),
    check("id").custom(helpersCultivos.validarId),
    check("nombre", "El nombre no puede estar vacio").notEmpty(),
    check("tipo", "El tipo no puede estar vacio").notEmpty(),
    check("id_parcela", "La idParcela no puede estar vacia").notEmpty(),
    check("id_parcela", "Ingrese un mongo id valido en la parcela").isMongoId(),
    validarCampos
], httpCultivo.putCultivos);

export default router;
