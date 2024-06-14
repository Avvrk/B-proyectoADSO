import { Router } from "express";
// import { check } from "express-validator";
// import { validarCampos } from "../middlewares/validar-datos";
// import { validarJWT } from "../middlewares/validar-jwt";
import httpAdmin from "../controllers/admin.js";
// import helpersClimas from "../helpers/climas.js";

const router = Router();

router.get("/", httpAdmin.getAdmins);
router.get("/admin/:id", [], httpAdmin.getAdminsId);
router.get("/activos", httpAdmin.getAdminsActivos);
router.get("/desactivados", httpAdmin.getAdminsInactivos);

router.post("/", [], httpAdmin.postAdmins);

router.put("/", [], httpAdmin.putAdmins);
router.put("activar/:id", [], httpAdmin.putAdminsActivar);
router.put("desactivar/:id", [], httpAdmin.putAdminsInactivar);

export default router;
