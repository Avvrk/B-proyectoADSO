import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpInventarios from '../controllers/inventario.js';
import helpersInventario from '../helpers/inventario.js';

const router = Router();

// Obtener todos los inventarios
router.get('/', validarJWT, httpInventarios.getInventario);

// Obtener un inventario por su ID
router.get('/:id', [
    // Validar que el ID sea un MongoID válido
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpInventarios.getInventarioId);

// Obtener inventarios activos
router.get('/activos', validarJWT, httpInventarios.getInventarioActivos);

// Obtener inventarios inactivos
router.get('/inactivos', validarJWT, httpInventarios.getInventarioInactivos);

// Obtener la cantidad de un inventario por su ID
router.get('/cantidad/:id', [
    // Validar que el ID sea un MongoID válido
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpInventarios.getInventarioCantidades);

// Crear un nuevo inventario
router.post('/', [
    // Validar campos requeridos y tipos de datos
    check('tipo', 'El tipo es requerido.').notEmpty(),
    check('observacion', 'La observación es requerida.').notEmpty(),
    check('unidad', 'La unidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad debe ser un valor numérico.').isNumeric(),
    // Validar IDs relacionados
    check('semillas_id').custom(helpersInventario.validarIdSemillas),
    check('insumos_id').custom(helpersInventario.validarIdInsumos),
    check('maquinaria_id').custom(helpersInventario.validarIdMaquinaria),
    validarJWT,
    validarCampos
], httpInventarios.postInventario);

// Actualizar un inventario por su ID
router.put('/:id', [
    // Validar ID y otros campos
    check('id', 'El ID del inventario es requerido.').notEmpty(),
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    check('tipo').custom(helpersInventario.validarTipo),
    check('cantidad').custom(helpersInventario.validarCantidad),
    check('unidad').custom(helpersInventario.validarUnidad),
    check('estado').custom(helpersInventario.validarEstado),
    // Validar IDs relacionados
    check('semillas_id').custom(helpersInventario.validarIdSemillas),
    check('insumos_id').custom(helpersInventario.validarIdInsumos),
    check('maquinaria_id').custom(helpersInventario.validarIdMaquinaria),
    validarJWT,
    validarCampos
], httpInventarios.putInventario);

// Activar un inventario por su ID
router.put('/activar/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpInventarios.putInventarioActivar);

// Inactivar un inventario por su ID
router.put('/inactivar/:id', [
    check('id', 'El ID del inventario debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpInventarios.putInventarioInactivar);

export default router;