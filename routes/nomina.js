import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpNominas from '../controllers/nomina.js';
import helpersNomina from '../helpers/nomina.js';

const router = Router();

// Obtener todas las nóminas
router.get('/', validarJWT, httpNominas.getNomina);

// Obtener una nómina por su ID
router.get('/:id', [
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpNominas.getNominaId);

// Obtener nóminas activas
router.get('/activos', validarJWT, httpNominas.getNominaActivos);

// Obtener nóminas inactivas
router.get('/inactivos', validarJWT, httpNominas.getNominaInactivos);

// Obtener nóminas por fechas
router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').not().isDate(),
    validarJWT,
    validarCampos
], httpNominas.getNominaFechas);

// Obtener nóminas de un empleado por su ID
router.get('/empleados/:id', [
    check('id', 'El ID del empleado debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpNominas.getNominaEmpleados);

// Obtener el total de las nóminas
router.get('/total', validarJWT, httpNominas.getNominaTotal);

// Crear una nueva nómina
router.post('/', [
    check('fecha', 'La fecha es requerida.').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida.').isISO8601().toDate(),
    check('id_empleado', 'El ID del empleado es requerido.').notEmpty(),
    check('id_empleado', 'El ID del empleado debe ser un mongoId válido.').isMongoId(),
    check('tipo', 'El tipo es requerido.').notEmpty(),
    check('valor', 'El valor es requerido.').notEmpty(),
    check('valor', 'El valor debe ser un número positivo.').isNumeric().toFloat().isFloat({ min: 0 }),
    check('estado', 'El estado es requerido.').notEmpty(),
    check('estado', 'El estado debe ser un número válido.').isNumeric(),
    validarJWT,
    validarCampos
], httpNominas.postNomina);

// Actualizar una nómina existente
router.put('/:id', [
    check('id', 'El ID de la nómina es requerido.').notEmpty(),
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    check('fecha').custom(helpersNomina.validarFecha),
    check('id_empleado').custom(helpersNomina.validarIdEmpleado),
    check('tipo').custom(helpersNomina.validarTipo),
    check('valor').custom(helpersNomina.validarValor),
    check('estado').custom(helpersNomina.validarEstado),
    validarJWT,
    validarCampos
], httpNominas.putNomina);

// Activar una nómina
router.put('/activar/:id', [
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpNominas.putNominaActivar);

// Inactivar una nómina
router.put('/inactivar/:id', [
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpNominas.putNominaInactivar);

export default router;