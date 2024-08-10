import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import httpSiembras from '../controllers/siembra.js';
import helpersSiembras from '../helpers/siembras.js';

const router = Router();


router.get('/', httpSiembras.getSiembras);


router.get('/id/:id', [
    check('id', 'El ID de la siembra debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpSiembras.getSiembraId);


router.post('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida y debe ser válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida y debe ser válida.').isISO8601().toDate(),
    validarCampos
], httpSiembras.getSiembrasFechas);


router.get('/empleado/:empleadoId', [
    check('empleadoId', 'El ID del empleado debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpSiembras.getSiembraEmpleado);


router.get('/cultivoAnterior/:id', [
    check('id', 'Ingrese un mongoId valido').isMongoId(),
    
    validarCampos
], httpSiembras.getSiembraCultivoAnterior);


router.get('/activos', httpSiembras.getSiembrasActivas);


router.get('/inactivos', httpSiembras.getSiembrasInactivas);


router.post('/', [
    check('id_cultivo', 'El ID del cultivo es requerido y debe ser un mongoId válido.').isMongoId(),
    check('empleado_id', 'El ID del empleado es requerido y debe ser un mongoId válido.').isMongoId(),
    check('fechaSiembra').custom(helpersSiembras.validarFecha),
    check('fechaCosecha').custom(helpersSiembras.validarFecha),
    check('transplante', 'El campo transplante debe ser un booleano.').optional().isBoolean(),
    check('id_cultivo').custom(helpersSiembras.validarIdCultivo),
    check('empleado_id').custom(helpersSiembras.validarIdEmpleado),
    check('inventario_id').optional().custom(helpersSiembras.validarIdInventario),
    validarCampos
], httpSiembras.postSiembra);


router.put('/:id', [
    check('id', 'El ID de la siembra es requerido y debe ser un mongoId válido.').isMongoId(),
    check('id_cultivo').optional().custom(helpersSiembras.validarIdCultivo),
    check('empleado_id').optional().custom(helpersSiembras.validarIdEmpleado),
    check('inventario_id').optional().custom(helpersSiembras.validarIdInventario),
    validarCampos
], httpSiembras.putSiembra);


router.put('/activar/:id', [
    check('id', 'El ID de la siembra debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpSiembras.putSiembraActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID de la siembra debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpSiembras.putSiembraInactivar);

export default router;