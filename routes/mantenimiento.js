import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpMantenimientos from '../controllers/mantenimiento.js';
import helpersMantenimiento from '../helpers/mantenimiento.js';

const router = Router();

// Obtener todos los mantenimientos
router.get('/', validarJWT, httpMantenimientos.getMantenimientos);

// Obtener un mantenimiento por su ID
router.get('/:id', [
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpMantenimientos.getMantenimientosId);

// Obtener mantenimientos activos
router.get('/activos', validarJWT, httpMantenimientos.getMantenimientosActivos);

// Obtener mantenimientos inactivos
router.get('/inactivos', validarJWT, httpMantenimientos.getMantenimientosInactivos);

// Obtener mantenimientos por fechas
router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').not().isDate(),
    validarJWT,
    validarCampos
], httpMantenimientos.getMantenimientosFechas);

// Obtener mantenimientos por herramienta
router.get('/herramienta/:id', [
    check('id', 'El ID de la herramienta debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpMantenimientos.getMantenimientosHerramientas);

// Obtener mantenimientos por responsable
router.get('/responsable/:persona', [
    check('persona', 'El nombre del responsable es requerido.').notEmpty(),
    validarJWT,
    validarCampos
], httpMantenimientos.getMantenimientosResponsable);

// Crear un nuevo mantenimiento
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
    validarJWT,
    validarCampos
], httpMantenimientos.postMantenimiento);

// Actualizar un mantenimiento existente
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
    validarJWT,
    validarCampos
], httpMantenimientos.putMantenimiento);

// Activar un mantenimiento
router.put('/activar/:id', [
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpMantenimientos.putMantenimientoActivar);

// Inactivar un mantenimiento
router.put('/inactivar/:id', [
    check('id', 'El ID del mantenimiento debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpMantenimientos.putMantenimientoInactivar);

export default router;