import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import httpParcelas from '../controllers/parcelas.js';
import helpersParcela from '../helpers/parcelas.js';

const router = Router();


router.get('/', httpParcelas.getParcelas);


router.get('/id/:id', [
    check('id', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpParcelas.getParcelaId);


router.get('/activos', httpParcelas.getParcelaActivos);


router.get('/inactivos', httpParcelas.getParcelaInactivos);


router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').not().isDate(),
    validarCampos
], httpParcelas.getParcelaFechas);


router.get('/cultivo/:id', [
    check('cultivo', 'El nombre del cultivo es requerido.').notEmpty(),
    validarCampos
], httpParcelas.getParcelaCultivoActual);


router.get('/asistente/:id', [
    check('asistente', 'El nombre del asistente técnico es requerido.').notEmpty(),
    validarCampos
], httpParcelas.getParcelaAsistente);


router.post('/', [
    check('numero', 'El número es requerido.').notEmpty(),
    check('ubicacionGeografica', 'La ubicación geográfica es requerida.').notEmpty(),
    check('cultivoActual', 'El cultivo actual es requerido.').notEmpty(),
    check('area', 'El área es requerida.').notEmpty(),
    check('area', 'El área debe ser un número positivo.').isNumeric().toFloat().isFloat({ min: 0 }),
    check('id_fincas', 'El ID de la finca es requerido.').notEmpty(),
    check('id_fincas', 'El ID de la finca debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpParcelas.postParcela);


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
    validarCampos
], httpParcelas.putParcela);


router.put('/activar/:id', [
    check('id', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpParcelas.putParcelaActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpParcelas.putParcelaInactivar);

export default router;