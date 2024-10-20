import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProcesos from '../controllers/procesos.js';
import helpersProcesos from '../helpers/procesos.js';

const router = express.Router();

router.get('/', [
    validarCampos,
    validarJWT
], httpProcesos.getProcesos);

router.get('/activos', [
    validarCampos,
    validarJWT
], httpProcesos.getProcesosActivos);

router.get('/inactivos', [
    validarCampos,
    validarJWT
], httpProcesos.getProcesosInactivos);

router.get('/fechas/:fechaInicio/:fechaFin', [
    check('fechaInicio').custom(helpersProcesos.validarFecha),
    check('fechaFin').custom(helpersProcesos.validarFecha),
    validarCampos,
    validarJWT
], httpProcesos.getProcesosEntreFechas);

router.get('/empleado/:id', [
    check('id', 'Ingrese un mongo id valido').isMongoId(),
    validarCampos,
    validarJWT
], httpProcesos.getProcesoEmpleadoID);

router.get("/fechas/:fechaInicio/:fechaFin", [
    validarCampos,
    validarJWT
], httpProcesos.getProcesosEntreFechas);

router.get("/tipo/:tipo", [
    validarJWT
], httpProcesos.getProcesosTipo);

// router.get('/porcentaje', httpProcesos.getProcesosPorcentaje);

router.post('/', [
    check('fecha').custom(helpersProcesos.validarFecha),
    check('fecha').custom(helpersProcesos.validarFecha),
    check('cultivo_id', 'El ID del cultivo es requerido.').notEmpty(),
    check('cultivo_id', 'El ID del cultivo debe ser un mongoId válido.').isMongoId(),
    check('empleado_id', 'El ID del empleado es requerido.').notEmpty(),
    check('empleado_id', 'El ID del empleado debe ser un mongoId válido.').isMongoId(),
    check('estado', 'El estado es requerido.').optional().notEmpty(),
    check('estado', 'El estado debe ser 0 (inactivo) o 1 (activo).').optional().isIn(['0', '1']),
    validarCampos,
    validarJWT
], httpProcesos.postProcesos);

router.put('/:id', [
    check('id', 'El ID del proceso es requerido.').notEmpty(),
    check('id', 'El ID del proceso debe ser un mongoId válido.').isMongoId(),
    check('fecha').custom(helpersProcesos.validarFecha),
    check('id_parcela').optional().custom(helpersProcesos.validarIdParcela),
    check('empleado_id').optional().custom(helpersProcesos.validarEmpleadoID),
    check('estado').optional().custom(helpersProcesos.validarEstado),
    validarCampos,
    validarJWT
], httpProcesos.putProcesos);

router.put('/activar/:id', [
    check('id', 'El ID del proceso debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpProcesos.putProcesosActivar);

router.put('/inactivar/:id', [
    check('id', 'El ID del proceso debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpProcesos.putProcesoInactivar);

export default router;