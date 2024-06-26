import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpParcelas from '../controllers/parcelas.js';
import helpersParcela from '../helpers/parcelas.js';

const router = Router();

// Obtener todas las parcelas
router.get('/', validarJWT, httpParcelas.getParcelas);

// Obtener una parcela por su ID
router.get('/:id', [
    check('id', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpParcelas.getParcelaId);

// Obtener parcelas activas
router.get('/activos', validarJWT, httpParcelas.getParcelaActivos);

// Obtener parcelas inactivas
router.get('/inactivos', validarJWT, httpParcelas.getParcelaInactivos);

// Obtener parcelas por fechas
router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').not().isDate(),
    validarJWT,
    validarCampos
], httpParcelas.getParcelaFechas);

// Obtener parcelas por cultivo actual
router.get('/cultivo/:cultivo', [
    check('cultivo', 'El nombre del cultivo es requerido.').notEmpty(),
    validarJWT,
    validarCampos
], httpParcelas.getParcelaCultivoActual);

// Obtener parcelas por asistente técnico
router.get('/asistente/:asistente', [
    check('asistente', 'El nombre del asistente técnico es requerido.').notEmpty(),
    validarJWT,
    validarCampos
], httpParcelas.getParcelaAsistente);

// Crear una nueva parcela
router.post('/', [
    check('numero', 'El número es requerido.').notEmpty(),
    check('ubicacionGeografica', 'La ubicación geográfica es requerida.').notEmpty(),
    check('cultivoActual', 'El cultivo actual es requerido.').notEmpty(),
    check('area', 'El área es requerida.').notEmpty(),
    check('area', 'El área debe ser un número positivo.').isNumeric().toFloat().isFloat({ min: 0 }),
    check('id_fincas', 'El ID de la finca es requerido.').notEmpty(),
    check('id_fincas', 'El ID de la finca debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpParcelas.postParcela);

// Actualizar una parcela existente
router.put('/:id', [
    check('id', 'El ID de la parcela es requerido.').notEmpty(),
    check('id', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    check('numero').custom(helpersParcela.validarNumero),
    check('ubicacionGeografica').custom(helpersParcela.validarUbicacionGeografica),
    check('cultivoActual').custom(helpersParcela.validarCultivoActual),
    check('detalle').custom(helpersParcela.validarDetalle),
    check('estado').custom(helpersParcela.validarEstado),
    check('area').custom(helpersParcela.validarArea),
    check('asistenteTecnico').custom(helpersParcela.validarAsistenteTecnico),
    check('id_fincas').custom(helpersParcela.validarIdFincas),
    validarJWT,
    validarCampos
], httpParcelas.putParcela);

// Activar una parcela
router.put('/activar/:id', [
    check('id', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpParcelas.putParcelaActivar);

// Inactivar una parcela
router.put('/inactivar/:id', [
    check('id', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpParcelas.putParcelaInactivar);

export default router;