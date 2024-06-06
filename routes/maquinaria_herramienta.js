import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpMaquinariaHerramientas from '../controllers/maquinaria_herramientas.js';
import helpersMaquinariaHerramienta from '../helpers/maquinaria_herramienta.js';

const router = Router();

// Obtener todas las maquinarias y herramientas
router.get('/', validarJWT, httpMaquinariaHerramientas.getMaquinariaH);

// Obtener una maquinaria o herramienta por su ID
router.get('/:id', [
    check('id', 'El ID de la maquinaria o herramienta debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpMaquinariaHerramientas.getMaquinariaHId);

// Obtener maquinarias y herramientas activas
router.get('/activos', validarJWT, httpMaquinariaHerramientas.getMaquinariaHActivos);

// Obtener maquinarias y herramientas inactivas
router.get('/inactivos', validarJWT, httpMaquinariaHerramientas.getMaquinariaHInactivos);

// Obtener maquinarias y herramientas por fechas
router.get('/fechas', [
    check('fechaInicio', 'La fecha de inicio es requerida.').notEmpty(),
    check('fechaInicio', 'La fecha de inicio debe ser una fecha válida.').isISO8601().toDate(),
    check('fechaFin', 'La fecha de fin es requerida.').notEmpty(),
    check('fechaFin', 'La fecha de fin debe ser una fecha válida.').not().isDate(),
    validarJWT,
    validarCampos
], httpMaquinariaHerramientas.getMaquinariaHFechas);

// Obtener cantidad de maquinarias y herramientas por tipo
router.get('/cantidad/:tipo', [
    check('tipo', 'El tipo de maquinaria o herramienta es requerido.').notEmpty(),
    validarJWT,
    validarCampos
], httpMaquinariaHerramientas.getMaquinariaHCantidad);

// Obtener el total de maquinarias y herramientas
router.get('/total', validarJWT, httpMaquinariaHerramientas.getMaquinariaHTotal);

// Crear una nueva maquinaria o herramienta
router.post('/', [
    check('proveedores_id', 'El ID del proveedor es requerido.').notEmpty(),
    check('proveedores_id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('nombre', 'El nombre es requerido.').notEmpty(),
    check('tipo', 'El tipo es requerido.').notEmpty(),
    check('fechaCompra', 'La fecha de compra es requerida.').notEmpty(),
    check('fechaCompra', 'La fecha de compra debe ser una fecha válida.').isISO8601().toDate(),
    check('observaciones').custom(helpersMaquinariaHerramienta.validarObservaciones),
    check('cantidad', 'La cantidad es requerida.').notEmpty(),
    check('cantidad', 'La cantidad debe ser un número positivo.').isNumeric().toFloat().isFloat({ min: 0 }),
    check('total', 'El total es requerido.').notEmpty(),
    check('total', 'El total debe ser un número positivo.').isNumeric().toFloat().isFloat({ min: 0 }),
    check('estado', 'El estado es requerido.').notEmpty(),
    check('estado', 'El estado debe ser un número válido.').isNumeric(),
    validarJWT,
    validarCampos
], httpMaquinariaHerramientas.postMaquinariaH);

// Actualizar una maquinaria o herramienta existente
router.put('/:id', [
    check('id', 'El ID de la maquinaria o herramienta es requerido.').notEmpty(),
    check('id', 'El ID de la maquinaria o herramienta debe ser un mongoId válido.').isMongoId(),
    check('proveedores_id').custom(helpersMaquinariaHerramienta.validarIdProveedor),
    check('nombre').custom(helpersMaquinariaHerramienta.validarNombre),
    check('tipo').custom(helpersMaquinariaHerramienta.validarTipo),
    check('fechaCompra').custom(helpersMaquinariaHerramienta.validarFechaCompra),
    check('observaciones').custom(helpersMaquinariaHerramienta.validarObservaciones),
    check('cantidad').custom(helpersMaquinariaHerramienta.validarCantidad),
    check('total').custom(helpersMaquinariaHerramienta.validarTotal),
    check('estado').custom(helpersMaquinariaHerramienta.validarEstado),
    validarJWT,
    validarCampos
], httpMaquinariaHerramientas.putMaquinariaH);

// Activar una maquinaria o herramienta
router.put('/activar/:id', [
    check('id', 'El ID de la maquinaria o herramienta debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpMaquinariaHerramientas.putMaquinariaHActivar);

// Inactivar una maquinaria o herramienta
router.put('/inactivar/:id', [
    check('id', 'El ID de la maquinaria o herramienta debe ser un mongoId válido.').isMongoId(),
    validarJWT,
    validarCampos
], httpMaquinariaHerramientas.putMaquinariaHInactivar);

export default router;