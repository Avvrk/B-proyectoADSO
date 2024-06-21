import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProveedores from '../controllers/proveedores.js';
import helpersProveedores from '../helpers/proveedores.js';

const router = Router();

// Obtener todos los proveedores
router.get('/', validarJWT, httpProveedores.getProveedores);

// Obtener proveedores activos
router.get('/activos', validarJWT, httpProveedores.getProveedorActivos);

// Obtener proveedores inactivos
router.get('/inactivos', validarJWT, httpProveedores.getProveedorInactivos);

// Obtener proveedor por ID
router.get('/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.existeProveedorPorId),
    validarJWT,
    validarCampos
], httpProveedores.getProveedorId);

// Crear un nuevo proveedor
router.post('/', [
    check('nombre', 'El nombre es requerido y no puede estar vacío.').notEmpty().custom(helpersProveedores.validarNombre),
    check('direccion').optional().custom(helpersProveedores.validarDireccion),
    check('telefono').optional().custom(helpersProveedores.validarTelefono),
    check('email', 'El email debe ser válido.').isEmail().custom(helpersProveedores.validarEmail),
    validarJWT,
    validarCampos
], httpProveedores.postProveedor);

// Modificar un proveedor existente
router.put('/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.existeProveedorPorId),
    check('nombre').optional().custom(helpersProveedores.validarNombre),
    check('direccion').optional().custom(helpersProveedores.validarDireccion),
    check('telefono').optional().custom(helpersProveedores.validarTelefono),
    check('email').optional().isEmail().custom(helpersProveedores.validarEmail),
    validarJWT,
    validarCampos
], httpProveedores.putProveedor);

// Activar un proveedor
router.put('/activar/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.existeProveedorPorId),
    validarJWT,
    validarCampos
], httpProveedores.putProveedorActivar);

// Inactivar un proveedor
router.put('/inactivar/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.existeProveedorPorId),
    validarJWT,
    validarCampos
], httpProveedores.putProveedorInactivar);

export default router;