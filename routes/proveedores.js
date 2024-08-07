import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-datos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import httpProveedores from '../controllers/proveedores.js';
import helpersProveedores from '../helpers/proveedores.js';

const router = Router();


router.get('/', httpProveedores.getProveedores);


router.get('/activos', httpProveedores.getProveedorActivos);


router.get('/inactivos', httpProveedores.getProveedorInactivos);


router.get('/id/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.validarProveedorID),
    validarCampos
], httpProveedores.getProveedorId);


router.post('/', [
    check('nombre', 'El nombre es requerido y no puede estar vacío.').notEmpty().custom(helpersProveedores.validarNombre),
    check('direccion').optional().custom(helpersProveedores.validarDireccion),
    check('telefono').optional().custom(helpersProveedores.validarTelefono),
    check('email', 'El email debe ser válido.').isEmail().custom(helpersProveedores.validarEmail),
    validarCampos
], httpProveedores.postProveedor);


router.put('/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.validarProveedorID),
    check('nombre').optional().custom(helpersProveedores.validarNombre),
    check('direccion').optional().custom(helpersProveedores.validarDireccion),
    check('telefono').optional().custom(helpersProveedores.validarTelefono),
    check('email').optional().isEmail().custom(helpersProveedores.validarEmail),
    validarCampos
], httpProveedores.putProveedor);


router.put('/activar/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.validarProveedorID),
    validarCampos
], httpProveedores.putProveedorActivar);


router.put('/inactivar/:id', [
    check('id', 'El ID del proveedor debe ser un mongoId válido.').isMongoId(),
    check('id').custom(helpersProveedores.validarProveedorID),
    validarCampos
], httpProveedores.putProveedorInactivar);

export default router;