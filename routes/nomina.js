import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import httpNominas from '../controllers/nomina.js';
import helpersNomina from '../helpers/nomina.js';

const router = Router();


router.get('/', httpNominas.getNomina);


router.get('/id/:id', [
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpNominas.getNominaId);


router.get('/activos', httpNominas.getNominaActivos);


router.get('/inactivos', httpNominas.getNominaInactivos);


router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').not().isDate(),
    validarCampos
], httpNominas.getNominaFechas);


router.get('/empleados/:id', [
    check('id', 'El ID del empleado debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpNominas.getNominaEmpleados);


router.get('/total', httpNominas.getNominaTotal);


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
    validarCampos
], httpNominas.postNomina);


router.put('/:id', [
    check('id', 'El ID de la nómina es requerido.').notEmpty(),
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    check('fecha').custom(helpersNomina.validarFecha),
    check('id_empleado').custom(helpersNomina.validarIdEmpleado),
    check('tipo').custom(helpersNomina.validarTipo),
    check('valor').custom(helpersNomina.validarValor),
    check('estado').custom(helpersNomina.validarEstado),
    validarCampos
], httpNominas.putNomina);


router.put('/activar/:id', [
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpNominas.putNominaActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID de la nómina debe ser un mongoId válido.').isMongoId(),
    validarCampos
], httpNominas.putNominaInactivar);

export default router;