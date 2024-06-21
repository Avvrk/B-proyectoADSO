import Semilla from '../Models/Semillas.js';
import Proveedor from '../Models/Semillas.js';

// Helper para validar el ID de la semilla
const existeSemillaPorId = async (id) => {
    const existe = await Semilla.findById(id);
    if (!existe) {
        throw new Error(`La semilla con ID ${id} no existe.`);
    }
};

// Helper para validar el ID del proveedor
const validarProveedorId = async (proveedor_id) => {
    const existe = await Proveedor.findById(proveedor_id);
    if (!existe) {
        throw new Error(`El proveedor con ID ${proveedor_id} no existe.`);
    }
};

// Helper para validar la fecha
const validarFecha = (fecha) => {
    if (fecha && isNaN(Date.parse(fecha))) {
        throw new Error('La fecha no es válida.');
    }
};

// Helper para validar el estado
const validarEstado = (estado) => {
    if (![0, 1].includes(estado)) {
        throw new Error('El estado debe ser 0 (inactivo) o 1 (activo).');
    }
};

export default {
    existeSemillaPorId,
    validarProveedorId,
    validarFecha,
    validarEstado
};