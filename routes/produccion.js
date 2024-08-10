import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProducciones from '../controllers/produccion.js';
import helpersProducciones from '../helpers/produccion.js';

const router = Router();


router.get('/', httpProducciones.getProducciones);


router.get('/activos', httpProducciones.getProduccionesActivas);


router.get('/inactivos', httpProducciones.getProduccionesInactivas);


router.get('/fechas/:fechaInicio/:fechaFin', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio').custom(helpersProducciones.validarFecha),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin').custom(helpersProducciones.validarFecha),
    validarCampos
], httpProducciones.getProduccionesFechas);


router.get('/cultivo/:cultivo_id', [
    check('cultivo_id', 'El ID del cultivo debe ser un MongoID válido.').isMongoId(),
    validarCampos
], httpProducciones.getProduccionesPorCultivo);


router.get('/total', httpProducciones.getProduccionesTotal);


router.post('/', [
    check('cultivo_id', 'El ID del cultivo es requerido.').notEmpty(),
    check('cultivo_id', 'El ID del cultivo debe ser un MongoID válido.').isMongoId(),
    check('fecha').custom(helpersProducciones.validarFecha),
    check('fecha').custom(helpersProducciones.validarFecha),
    check('numeroLote', 'El número de lote es requerido.').notEmpty(),
    check('cantidad', 'La cantidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad debe ser un número positivo.').isFloat({ min: 0 }),
    check('cantidadTrabajadores', 'La cantidad de trabajadores debe ser un número no negativo.').optional().isInt({ min: 0 }),
    validarCampos
], httpProducciones.postProduccion);


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
    validarCampos
], httpProducciones.putProduccion);


router.put('/activar/:id', [
    check('id', 'El ID de la producción debe ser un MongoID válido.').isMongoId(),
    validarCampos
], httpProducciones.putProduccionActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID de la producción debe ser un MongoID válido.').isMongoId(),
    validarCampos
], httpProducciones.putProduccionInactivar);

export default router;