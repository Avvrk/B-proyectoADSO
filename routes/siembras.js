import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpSiembras from '../controllers/siembra.js';
import helpersSiembras from '../helpers/siembras.js';

const router = Router();

// Obtener todas las siembras
router.get('/', validarJWT, httpSiembras.getSiembras);

// Obtener una siembra por su ID
router.get('/:id', [
    // Validar que el ID sea un MongoID válido
    check('id', 'El ID de la siembra debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpSiembras.getSiembraId);

// Obtener siembras en un rango de fechas
router.post('/fechas', [
    // Validar fechas
    check('fechaInicio', 'La fecha de inicio es requerida y debe ser válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida y debe ser válida.').isISO8601().toDate(),
    validarJWT,
    validarCampos
], httpSiembras.getSiembrasFechas);

// Obtener siembras por empleado
router.get('/empleado/:empleadoId', [
    // Validar que el ID del empleado sea un MongoID válido
    check('empleadoId', 'El ID del empleado debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpSiembras.getSiembraEmpleado);

// Obtener siembras por cultivo anterior
router.get('/cultivo-anterior/:cultivoAnterior', [
    // Validar cultivo anterior
    check('cultivoAnterior', 'El nombre del cultivo anterior es requerido.').notEmpty(),
    validarJWT,
    validarCampos
], httpSiembras.getSiembraCultivoAnterior);

// Obtener siembras activas
router.get('/activas', validarJWT, httpSiembras.getSiembrasActivas);

// Obtener siembras inactivas
router.get('/inactivas', validarJWT, httpSiembras.getSiembrasInactivas);

// Crear una nueva siembra
router.post('/', [
    // Validar campos requeridos y tipos de datos
    check('id_cultivo', 'El ID del cultivo es requerido y debe ser un mongoId válido.').isMongoId(),
    check('empleado_id', 'El ID del empleado es requerido y debe ser un mongoId válido.').isMongoId(),
    check('fechaSiembra', 'La fecha de siembra es requerida y debe ser válida.').isISO8601().toDate(),
    check('fechaCosecha', 'La fecha de cosecha debe ser válida.').optional({ nullable: true }).isISO8601().toDate(),
    check('transplante', 'El campo transplante debe ser un booleano.').optional().isBoolean(),
    // Validar IDs relacionados
    check('id_cultivo').custom(helpersSiembras.validarIdCultivo),
    check('empleado_id').custom(helpersSiembras.validarIdEmpleado),
    check('inventario_id').optional().custom(helpersSiembras.validarIdInventario),
    validarJWT,
    validarCampos
], httpSiembras.postSiembra);

// Modificar una siembra por su ID
router.put('/:id', [
    // Validar ID y otros campos
    check('id', 'El ID de la siembra es requerido y debe ser un mongoId válido.').isMongoId(),
    check('id_cultivo').optional().custom(helpersSiembras.validarIdCultivo),
    check('empleado_id').optional().custom(helpersSiembras.validarIdEmpleado),
    check('inventario_id').optional().custom(helpersSiembras.validarIdInventario),
    validarJWT,
    validarCampos
], httpSiembras.putSiembra);

// Activar una siembra por su ID
router.put('/activar/:id', [
    check('id', 'El ID de la siembra debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpSiembras.putSiembraActivar);

// Inactivar una siembra por su ID
router.put('/inactivar/:id', [
    check('id', 'El ID de la siembra debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpSiembras.putSiembraInactivar);

export default router;