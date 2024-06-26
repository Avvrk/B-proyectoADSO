import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProducciones from '../controllers/produccion.js';
import helpersProducciones from '../helpers/produccion.js';

const router = Router();

// Obtener todas las producciones
router.get('/', validarJWT, httpProducciones.getProducciones);

// Obtener producciones activas
router.get('/activas', validarJWT, httpProducciones.getProduccionesActivas);

// Obtener producciones inactivas
router.get('/inactivas', validarJWT, httpProducciones.getProduccionesInactivas);

// Obtener producciones por fechas
router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').isISO8601(),
    validarJWT,
    validarCampos
], httpProducciones.getProduccionesFechas);

// Obtener producciones por cultivo
router.get('/cultivo/:cultivo_id', [
    check('cultivo_id', 'El ID del cultivo debe ser un MongoID válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpProducciones.getProduccionesPorCultivo);

// Obtener total de producciones
router.get('/total', validarJWT, httpProducciones.getProduccionesTotal);

// Crear una nueva producción
router.post('/', [
    check('cultivo_id', 'El ID del cultivo es requerido.').notEmpty(),
    check('cultivo_id', 'El ID del cultivo debe ser un MongoID válido.').isMongoId(),
    check('fecha', 'La fecha es requerida.').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida.').isISO8601(),
    check('numeroLote', 'El número de lote es requerido.').notEmpty(),
    check('cantidad', 'La cantidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad debe ser un número positivo.').isFloat({ min: 0 }),
    check('cantidadTrabajadores', 'La cantidad de trabajadores debe ser un número no negativo.').optional().isInt({ min: 0 }),
    validarJWT,
    validarCampos
], httpProducciones.postProduccion);

// Actualizar una producción existente
router.put('/:id', [
    check('id', 'El ID de la producción es requerido.').notEmpty(),
    check('id', 'El ID de la producción debe ser un MongoID válido.').isMongoId(),
    check('cultivo_id').optional().custom(helpersProducciones.validarCultivoID),
    check('fecha').optional().custom(helpersProducciones.validarFecha),
    check('numeroLote').optional().custom(helpersProducciones.validarNumeroLote),
    check('cantidad').optional().custom(helpersProducciones.validarCantidad),
    check('cantidadTrabajadores').optional().custom(helpersProducciones.validarCantidadTrabajadores),
    check('observaciones').optional().custom(helpersProducciones.validarObservaciones),
    check('estado').optional().custom(helpersProducciones.validarEstado),
    validarJWT,
    validarCampos
], httpProducciones.putProduccion);

// Activar una producción
router.put('/activar/:id', [
    check('id', 'El ID de la producción debe ser un MongoID válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpProducciones.putProduccionActivar);

// Inactivar una producción
router.put('/inactivar/:id', [
    check('id', 'El ID de la producción debe ser un MongoID válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpProducciones.putProduccionInactivar);

export default router;