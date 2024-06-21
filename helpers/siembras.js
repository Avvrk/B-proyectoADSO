import Cultivo from '../Models/Cultivos.js';
import Empleado from '../Models/Empleados.js';
// import Inventario from '../Models/Inventario.js'; 

//Falta corregir unas cosas

const validarEstado = (estado) => {
    if (estado !== 0 && estado !== 1) {
        throw new Error('El estado debe ser 0 o 1.');
    }
    return true;
};

const validarIdCultivo = async (id) => {
    const cultivo = await Cultivo.findById(id);
    if (!cultivo) {
        throw new Error('El ID del cultivo no existe.');
    }
    return true;
};

const validarIdEmpleado = async (id) => {
    const empleado = await Empleado.findById(id);
    if (!empleado) {
        throw new Error('El ID del empleado no existe.');
    }
    return true;
};

const validarIdInventario = async (id) => {
    const inventario = await Inventario.findById(id);
    if (!inventario) {
        throw new Error('El ID del inventario no existe.');
    }
    return true;
};

export default {
    validarEstado,
    validarIdCultivo,
    validarIdEmpleado,
    validarIdInventario
};