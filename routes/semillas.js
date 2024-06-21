import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpSemillas from '../controllers/semillas.js';
import helpersSemillas from '../helpers/semillas.js';

const router = Router();

// Obtener todas las semillas
router.get('/', validarJWT, httpSemillas.getSemillas);

// Obtener una semilla por su ID
router.get('/:id', [
    // Validar que el ID sea un MongoID válido
    check('id', 'El ID de la semilla debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpSemillas.getSemillaId);

// Obtener semillas activas
router.get('/activas', validarJWT, httpSemillas.getSemillasActivas);

// Obtener semillas inactivas
router.get('/inactivas', validarJWT, httpSemillas.getSemillasInactivas);

// Crear una nueva semilla
router.post('/', [
    check('proveedor_id', 'El ID del proveedor es requerido y debe ser un mongoId válido.').notEmpty().isMongoId(),
    check('numFactura', 'El número de factura es requerido.').optional().notEmpty(),
    check('fechaCompra', 'La fecha de compra es requerida y debe estar en formato ISO8601.').optional().isISO8601(),
    check('fechaVencimiento', 'La fecha de vencimiento debe estar en formato ISO8601.').optional().isISO8601(),
    check('especieVariedad', 'La especie/variedad es requerida.').optional().notEmpty(),
    check('proveedorSemilla', 'El proveedor de la semilla es requerido.').optional().notEmpty(),
    check('numeroLote', 'El número de lote es requerido.').optional().notEmpty(),
    check('origen', 'El origen de la semilla es requerido.').optional().notEmpty(),
    check('poderGerminativo', 'El poder germinativo es requerido.').optional().notEmpty(),
    check('observaciones', 'Las observaciones son requeridas.').optional().notEmpty(),
    check('unidad', 'La unidad es requerida.').optional().notEmpty(),
    check('total', 'El total es requerido y debe ser un número válido.').optional().isNumeric(),
    check('estado', 'El estado es requerido y debe ser un número válido.').optional().isNumeric().custom(helpersSemillas.validarEstado),
    validarJWT,
    validarCampos
], httpSemillas.postSemilla);

// Actualizar una semilla por su ID
router.put('/:id', [
    check('id', 'El ID de la semilla es requerido y debe ser un mongoId válido.').notEmpty().isMongoId(),
    check('proveedor_id', 'El ID del proveedor debe ser un mongoId válido.').optional().isMongoId().custom(helpersSemillas.validarProveedorId),
    check('numFactura', 'El número de factura debe ser un valor válido.').optional(),
    check('fechaCompra', 'La fecha de compra debe estar en formato ISO8601.').optional().isISO8601(),
    check('fechaVencimiento', 'La fecha de vencimiento debe estar en formato ISO8601.').optional().isISO8601(),
    check('especieVariedad', 'La especie/variedad debe ser un valor válido.').optional(),
    check('proveedorSemilla', 'El proveedor de la semilla debe ser un valor válido.').optional(),
    check('numeroLote', 'El número de lote debe ser un valor válido.').optional(),
    check('origen', 'El origen de la semilla debe ser un valor válido.').optional(),
    check('poderGerminativo', 'El poder germinativo debe ser un valor válido.').optional(),
    check('observaciones', 'Las observaciones deben ser un valor válido.').optional(),
    check('unidad', 'La unidad debe ser un valor válido.').optional(),
    check('total', 'El total debe ser un número válido.').optional().isNumeric(),
    check('estado', 'El estado debe ser un número válido.').optional().isNumeric().custom(helpersSemillas.validarEstado),
    validarJWT,
    validarCampos
], httpSemillas.putSemilla);

// Activar una semilla por su ID
router.put('/activar/:id', [
    check('id', 'El ID de la semilla debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpSemillas.putSemillaActivar);

// Inactivar una semilla por su ID
router.put('/inactivar/:id', [
    check('id', 'El ID de la semilla debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpSemillas.putSemillaInactivar);

export default router;