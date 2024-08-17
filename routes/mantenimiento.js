import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpMantenimientos from '../controllers/mantenimiento.js';
import helpersMantenimiento from '../helpers/mantenimiento.js';

const router = Router();


router.get('/', [
    validarJWT
], httpMantenimientos.getMantenimientos);


router.get('/id/:id', [
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpMantenimientos.getMantenimientosId);

router.get('/activos', [
    validarJWT
], httpMantenimientos.getMantenimientosActivos);

router.get('/inactivos', [
    validarJWT
], httpMantenimientos.getMantenimientosInactivos);

router.get("/fechas/:fechaInicio/:fechaFin", [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').isISO8601().toDate(),
    validarCampos,
    validarJWT
], httpMantenimientos.getMantenimientosFechas);

router.get('/herramienta/:id', [
    check('id', 'El ID de la herramienta debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpMantenimientos.getMantenimientosHerramientas);


router.get('/responsable/:persona', [
    check('persona', 'El nombre del responsable es requerido.').notEmpty(),
    validarCampos,
    validarJWT
], httpMantenimientos.getMantenimientosResponsable);


router.post('/', [
    check('gastos_id', 'El ID del gasto es requerido.').notEmpty(),
    check('gastos_id', 'El ID del gasto debe ser un mongoId válido.').isMongoId(),
    check('id_herramienta', 'El ID de la herramienta es requerido.').notEmpty(),
    check('id_herramienta', 'El ID de la herramienta debe ser un mongoId válido.').isMongoId(),
    check('fecha', 'La fecha es requerida.').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida.').isISO8601().toDate(),
    check('verificacionRealizada', 'La verificación realizada es requerida.').notEmpty(),
    check('calibracion', 'La calibración es requerida.').notEmpty(),
    check('responsable', 'El responsable es requerido.').notEmpty(),
    check('observaciones', 'Las observaciones son requeridas.').notEmpty(),
    check('estado', 'El estado es requerido.').notEmpty(),
    check('estado', 'El estado debe ser un número válido.').isNumeric(),
    validarCampos,
    validarJWT
], httpMantenimientos.postMantenimiento);


router.put('/:id', [
    check('id', 'El ID del mantenimiento es requerido.').notEmpty(),
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    check('fecha').custom(helpersMantenimiento.validarFecha),
    check('verificacionRealizada').custom(helpersMantenimiento.validarVerificacionRealizada),
    check('calibracion').custom(helpersMantenimiento.validarCalibracion),
    check('responsable').custom(helpersMantenimiento.validarResponsable),
    check('observaciones').custom(helpersMantenimiento.validarObservaciones),
    check('estado').custom(helpersMantenimiento.validarEstado),
    check('gastos_id').custom(helpersMantenimiento.validarIdGastos),
    check('id_herramienta').custom(helpersMantenimiento.validarIdHerramienta),
    validarCampos,
    validarJWT
], httpMantenimientos.putMantenimiento);


router.put('/activar/:id', [
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpMantenimientos.putMantenimientoActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    validarCampos,
    validarJWT
], httpMantenimientos.putMantenimientoInactivar);

export default router;