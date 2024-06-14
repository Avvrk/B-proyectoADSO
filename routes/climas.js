import { Router } from "express";
// import { check } from "express-validator";
// import { validarCampos } from "../middlewares/validar-datos";
// import { validarJWT } from "../middlewares/validar-jwt";
// import httpClimas from "../controllers/climas.js";
// import helpersClimas from "../helpers/climas.js";

const router = Router();

router.get("/", httpClimas.getClimas);
router.get("/climas/:id", [], httpClimas.getClimas);
router.get("/activos", httpClimas.getClimas);
router.get("/desactivados", httpClimas.getClimas);
router.get("/fechas/", [], httpClimas.getClimas);
router.get("/temperatura/", [], httpClimas.getClimas);
router.get("/duracion/", [], httpClimas.getClimas);
router.get("/tipoclima/", [], httpClimas.getClimas);

router.post("/agregar", [], httpClimas.postClimas);

router.put("/actualizar", [], httpClimas.putClimas);
router.put("activar/:id", [], httpClimas.putClimas);
router.put("desactivar/:id", [], httpClimas.putClimas);

export default router;
