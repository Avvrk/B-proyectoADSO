import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpPreparacionSuelos from '../controllers/preparacion_suelos.js';
import helpersPreparacionSuelos from '../helpers/preparacion_suelos.js';

const router = Router();

// Obtener todas las preparaciones de suelos
router.get('/', validarJWT, httpPreparacionSuelos.getPreparacionSue);

// Obtener preparaciones de suelos activas
router.get('/activos', validarJWT, httpPreparacionSuelos.getPreparacionSueActivos);

// Obtener preparaciones de suelos inactivas
router.get('/inactivos', validarJWT, httpPreparacionSuelos.getPreparacionSueInactivos);

// Obtener preparaciones de suelos por fechas
router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').not().isDate(),
    validarJWT,
    validarCampos
], httpPreparacionSuelos.getPreparacionSueFechas);

// Obtener preparaciones de suelos por responsable
router.get('/responsable/:Responsable', [
    check('Responsable', 'El nombre del responsable es requerido.').notEmpty(),
    validarJWT,
    validarCampos
], httpPreparacionSuelos.getPreparacionSueResponsable);

// Obtener porcentaje de preparaciones de suelos
router.get('/porcentaje', validarJWT, httpPreparacionSuelos.getPreparacionSuePorcentaje);

// Crear una nueva preparación de suelos
router.post('/', [
    check('fecha', 'La fecha es requerida.').notEmpty(),
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
], httpPreparacionSuelos.postPreparacionSue);

// Actualizar una preparación de suelos existente
router.put('/:id', [
    check('id', 'El ID de la preparación de suelos es requerido.').notEmpty(),
    check('id', 'El ID de la preparación de suelos debe ser un mongoId válido.').isMongoId(),
    check('fecha').custom(helpersPreparacionSuelos.validarFecha),
    check('id_parcela').custom(helpersPreparacionSuelos.validarIdParcela),
    check('empleado_id').custom(helpersPreparacionSuelos.validarEmpleadoId),
    check('productos').custom(helpersPreparacionSuelos.validarProductos),
    check('ingredienteActivo').custom(helpersPreparacionSuelos.validarIngredienteActivo),
    check('dosis').custom(helpersPreparacionSuelos.validarDosis),
    check('metodoAplicacion').custom(helpersPreparacionSuelos.validarMetodoAplicacion),
    check('operario').custom(helpersPreparacionSuelos.validarOperario),
    check('responsable').custom(helpersPreparacionSuelos.validarResponsable),
    check('observaciones').custom(helpersPreparacionSuelos.validarObservaciones),
    check('estado').custom(helpersPreparacionSuelos.validarEstado),
    validarJWT,
    validarCampos
], httpPreparacionSuelos.putPreparacionSue);

// Activar una preparación de suelos
router.put('/activar/:id', [
    check('id', 'El ID de la preparación de suelos debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPreparacionSuelos.putPreparacionSueActivar);

// Inactivar una preparación de suelos
router.put('/inactivar/:id', [
    check('id', 'El ID de la preparación de suelos debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpPreparacionSuelos.putPreparacionSueInactivar);

export default router;