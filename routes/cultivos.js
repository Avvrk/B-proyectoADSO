import { Router } from "express";
// import { check } from "express-validator";
// import { validarCampos } from "../middlewares/validar-datos";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpCultivo from "../controllers/cultivos.js";
// import helpersClimas from "../helpers/climas.js";

const router = Router();

router.get("/", httpCultivo.getCultivos);
router.get("/cultivos/:id", [], httpCultivo.getCultivosId);
router.get("/parcelas", [], httpCultivo.getCultivosParcela);
router.get("/tipo", [], httpCultivo.getCultivosTipo);

router.post("/", [], httpCultivo.postCultivos);

router.put("/", [], httpCultivo.putCultivos);
router.put("activar/:id", [], httpCultivo.putCultivos);
router.put("desactivar/:id", [], httpCultivo.putCultivos);

export default router;
