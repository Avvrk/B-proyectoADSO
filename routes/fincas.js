import { Router } from "express";
// import { check } from "express-validator";
// import { validarCampos } from "../middlewares/validar-datos";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpFinca from "../controllers/fincas.js";
// import helpersClimas from "../helpers/climas.js";

const router = Router();

router.get("/", httpFinca.getFincas);
router.get("/fincas/:id", [], httpFinca.getFincasId);
router.get("/activos", httpFinca.getFincasActivos);
router.get("/inactivos", httpFinca.getFincasInactivos);

router.post("/", [], httpFinca.postFincas);

router.put("/", [], httpFinca.putFincas);
router.put("activar/:id", [], httpFinca.putFincasActivar);
router.put("desactivar/:id", [], httpFinca.putFincasInactivar);

export default router;
