import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProcesos from '../controllers/procesos.js';
import helpersProcesos from '../helpers/procesos.js';

const router = Router();

// Obtener todos los procesos
router.get('/', validarJWT, httpProcesos.getProcesos);

// Obtener procesos activos
router.get('/activos', validarJWT, httpProcesos.getProcesosActivos);

// Obtener procesos inactivos
router.get('/inactivos', validarJWT, httpProcesos.getProcesosInactivos);

// Obtener procesos por fechas
router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').isISO8601(),
    validarJWT,
    validarCampos
], httpProcesos.getProcesosFechas);

// Obtener procesos por responsable
router.get('/responsable/:responsable', [
    check('responsable', 'El nombre del responsable es requerido.').notEmpty(),
    validarJWT,
    validarCampos
], httpProcesos.getProcesosResponsable);

// Obtener porcentaje de procesos
router.get('/porcentaje', validarJWT, httpProcesos.getProcesosPorcentaje);

// Crear un nuevo proceso
router.post('/', [
    check('fecha', 'La fecha es requerida.').notEmpty(),
    check('fecha', 'La fecha debe ser una fecha válida.').isISO8601(),
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
    validarJWT,
    validarCampos
], httpProcesos.postProceso);

// Actualizar un proceso existente
router.put('/:id', [
    check('id', 'El ID del proceso es requerido.').notEmpty(),
    check('id', 'El ID del proceso debe ser un mongoId válido.').isMongoId(),
    check('fecha').optional().custom(helpersProcesos.validarFecha),
    check('id_parcela').optional().custom(helpersProcesos.validarIdParcela),
    check('empleado_id').optional().custom(helpersProcesos.validarEmpleadoId),
    check('productos').optional().custom(helpersProcesos.validarProductos),
    check('ingredienteActivo').optional().custom(helpersProcesos.validarIngredienteActivo),
    check('dosis').optional().custom(helpersProcesos.validarDosis),
    check('metodoAplicacion').optional().custom(helpersProcesos.validarMetodoAplicacion),
    check('operario').optional().custom(helpersProcesos.validarOperario),
    check('responsable').optional().custom(helpersProcesos.validarResponsable),
    check('observaciones').optional().custom(helpersProcesos.validarObservaciones),
    check('estado').optional().custom(helpersProcesos.validarEstado),
    validarJWT,
    validarCampos
], httpProcesos.putProceso);

// Activar un proceso
router.put('/activar/:id', [
    check('id', 'El ID del proceso debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpProcesos.putProcesoActivar);

// Inactivar un proceso
router.put('/inactivar/:id', [
    check('id', 'El ID del proceso debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpProcesos.putProcesoInactivar);

export default router;