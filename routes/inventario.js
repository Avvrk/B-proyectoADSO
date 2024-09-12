import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpInventarios from '../controllers/inventario.js';
import helpersInventario from '../helpers/inventario.js';

const router = Router();


router.get('/', [
    validarJWT
], httpInventarios.getInventario);


router.get('/id/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpInventarios.getInventarioId);

router.get('/activos', [
    validarJWT
], httpInventarios.getInventarioActivos);

router.get('/inactivos', [
    validarJWT
], httpInventarios.getInventarioInactivos);

router.get('/cantidad/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpInventarios.getInventarioCantidades);

router.get('/fechas/:fechaInicio/:fechaFin', [
    validarJWT,  // Middleware para validar JWT si es necesario
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isDate(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').isDate(),
    validarCampos
], httpInventarios.getInventarioFechas);

router.post('/', [
    check('tipo', 'El tipo es requerido.').notEmpty(),
    check('observacion', 'La observación es requerida.').notEmpty(),
    check('unidad', 'La unidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad debe ser un valor numérico.').isNumeric(),
    check('semillas_id').custom(helpersInventario.validarIdSemillas),
    check('insumos_id').custom(helpersInventario.validarIdInsumos),
    check('maquinaria_id').custom(helpersInventario.validarIdMaquinaria),
    validarCampos,
    validarJWT
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
    validarCampos,
    validarJWT
], httpInventarios.putInventario);


router.put('/activar/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpInventarios.putInventarioActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpInventarios.putInventarioInactivar);

export default router;
