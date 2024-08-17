import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProcesos from '../controllers/procesos.js';
import helpersProcesos from '../helpers/procesos.js';

const router = express.Router();


router.get('/', [
    validarJWT
], httpProcesos.getProcesos);


router.get('/activos', [
    validarJWT
], httpProcesos.getProcesosActivos);


router.get('/inactivos', [
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


// router.get('/porcentaje', httpProcesos.getProcesosPorcentaje);


router.post('/', [
    check('fecha').custom(helpersProcesos.validarFecha),
    check('fecha').custom(helpersProcesos.validarFecha),
    check('id_parcela', 'El ID de la parcela es requerido.').notEmpty(),
    check('id_parcela', 'El ID de la parcela debe ser un mongoId válido.').isMongoId(),
    check('empleado_id', 'El ID del empleado es requerido.').notEmpty(),
    check('empleado_id', 'El ID del empleado debe ser un mongoId válido.').isMongoId(),
    check('productos', 'El campo productos es requerido.').notEmpty(),
    check('ingredienteActivo', 'El ingrediente activo es requerido.').notEmpty(),
    check('dosis', 'La dosis es requerida.').notEmpty(),
    check('dosis', 'La dosis debe ser un número positivo.').isNumeric().toFloat().isFloat({ min: 0 }),
    check('metodoAplicacion', 'El método de aplicación es requerido.').notEmpty(),
    check('operario', 'El operario es requerido.').notEmpty(),
    check('responsable', 'El responsable es requerido.').notEmpty(),
    check('observaciones', 'Las observaciones son requeridas.').notEmpty(),
    check('estado', 'El estado es requerido.').notEmpty(),
    check('estado', 'El estado debe ser 0 (inactivo) o 1 (activo).').isIn(['0', '1']),
    validarCampos,
    validarJWT
], httpProcesos.postProcesos);


router.put('/:id', [
    check('id', 'El ID del proceso es requerido.').notEmpty(),
    check('id', 'El ID del proceso debe ser un mongoId válido.').isMongoId(),
    check('fecha').custom(helpersProcesos.validarFecha),
    check('id_parcela').optional().custom(helpersProcesos.validarIdParcela),
    check('empleado_id').optional().custom(helpersProcesos.validarEmpleadoID),
    check('productos').optional().custom(helpersProcesos.validarProductos),
    check('ingredienteActivo').optional().custom(helpersProcesos.validarIngredienteActivo),
    check('dosis').optional().custom(helpersProcesos.validarDosis),
    check('metodoAplicacion').optional().custom(helpersProcesos.validarMetodoAplicacion),
    check('operario').optional().custom(helpersProcesos.validarOperario),
    check('responsable').optional().custom(helpersProcesos.validarResponsable),
    check('observaciones').optional().custom(helpersProcesos.validarObservaciones),
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