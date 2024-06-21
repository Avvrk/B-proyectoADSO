import Proveedor from '../Models/Proveedores.js';

// Helper para validar el ID del proveedor
const existeProveedorPorId = async (id) => {
    const existe = await Proveedor.findById(id);
    if (!existe) {
        throw new Error(`El proveedor con ID ${id} no existe.`);
    }
};

// Helper para validar que el nombre no esté vacío y que no esté duplicado
const validarNombre = async (nombre = '') => {
    if (!nombre.trim()) {
        throw new Error('El nombre no puede estar vacío.');
    }
    const nombreExistente = await Proveedor.findOne({ nombre });
    if (nombreExistente) {
        throw new Error(`El nombre ${nombre} ya está registrado.`);
    }
};

// Helper para validar el email del proveedor
const validarEmail = async (email = '') => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('El email no es válido.');
    }
    const emailExistente = await Proveedor.findOne({ email });
    if (emailExistente) {
        throw new Error(`El email ${email} ya está registrado.`);
    }
};

// Helper para validar la dirección del proveedor
const validarDireccion = (direccion = '') => {
    if (direccion && direccion.length < 10) {
        throw new Error('La dirección debe tener al menos 10 caracteres.');
    }
};

// Helper para validar el teléfono del proveedor
const validarTelefono = (telefono = '') => {
    const telefonoRegex = /^[0-9]{10}$/;
    if (telefono && !telefonoRegex.test(telefono)) {
        throw new Error('El teléfono debe tener 10 dígitos.');
    }
};

// Helper para validar el estado del proveedor
const validarEstado = async (estado) => {
    if (![0, 1].includes(estado)) {
        throw new Error('El estado debe ser 0 (inactivo) o 1 (activo).');
    }
};

export default {
    existeProveedorPorId,
    validarNombre,
    validarEmail,
    validarDireccion,
    validarTelefono,
    validarEstado
};