import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import httpInventarios from '../controllers/inventario.js';
import helpersInventario from '../helpers/inventario.js';

const router = Router();


router.get('/', httpInventarios.getInventario);


router.get('/id/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpInventarios.getInventarioId);

router.get('/activos', httpInventarios.getInventarioActivos);
router.get('/inactivos', httpInventarios.getInventarioInactivos);

router.get('/cantidad/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpInventarios.getInventarioCantidades);

router.post('/', [
    check('tipo', 'El tipo es requerido.').notEmpty(),
    check('observacion', 'La observación es requerida.').notEmpty(),
    check('unidad', 'La unidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad debe ser un valor numérico.').isNumeric(),
    check('semillas_id').custom(helpersInventario.validarIdSemillas),
    check('insumos_id').custom(helpersInventario.validarIdInsumos),
    check('maquinaria_id').custom(helpersInventario.validarIdMaquinaria),
    validarCampos
], httpInventarios.postInventario);

router.put('/:id', [
    check('id', 'El ID del inventario es requerido.').notEmpty(),
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    check('tipo').custom(helpersInventario.validarTipo),
    check('cantidad').custom(helpersInventario.validarCantidad),
    check('unidad').custom(helpersInventario.validarUnidad),
    check('estado').custom(helpersInventario.validarEstado),
    check('semillas_id').custom(helpersInventario.validarIdSemillas),
    check('insumos_id').custom(helpersInventario.validarIdInsumos),
    check('maquinaria_id').custom(helpersInventario.validarIdMaquinaria),
    validarCampos
], httpInventarios.putInventario);


router.put('/activar/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpInventarios.putInventarioActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpInventarios.putInventarioInactivar);

export default router;