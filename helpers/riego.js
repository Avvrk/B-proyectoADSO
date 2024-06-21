import Riego from '../Models/Riego.js';
import Cultivo from '../Models/Cultivos.js';
import Empleado from '../Models/Empleados.js';

// Helper para validar el ID del riego
const existeRiegoPorId = async (id) => {
    const existe = await Riego.findById(id);
    if (!existe) {
        throw new Error(`El riego con ID ${id} no existe.`);
    }
};

// Helper para validar el ID del cultivo
const validarCultivoId = async (cultivo_id) => {
    const existe = await Cultivo.findById(cultivo_id);
    if (!existe) {
        throw new Error(`El cultivo con ID ${cultivo_id} no existe.`);
    }
};

// Helper para validar el ID del empleado
const validarEmpleadoId = async (empleado_id) => {
    const existe = await Empleado.findById(empleado_id);
    if (!existe) {
        throw new Error(`El empleado con ID ${empleado_id} no existe.`);
    }
};

// Helper para validar la fecha del riego
const validarFecha = (fecha) => {
    if (!fecha) {
        throw new Error('La fecha es requerida.');
    }
    if (isNaN(Date.parse(fecha))) {
        throw new Error('La fecha no es válida.');
    }
};

// Helper para validar el estado fenológico
const validarEstadoFenologico = (estado_fenologico) => {
    const estadosValidos = ['inicial', 'floracion', 'cosecha'];
    if (!estadosValidos.includes(estado_fenologico)) {
        throw new Error(`El estado fenológico debe ser uno de los siguientes: ${estadosValidos.join(', ')}.`);
    }
};

// Helper para validar las horas
const validarHora = (hora) => {
    const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!horaRegex.test(hora)) {
        throw new Error('La hora no es válida. Debe estar en el formato HH:MM.');
    }
};

// Helper para validar la dosis
const validarDosis = (dosis) => {
    if (dosis < 0) {
        throw new Error('La dosis debe ser un número positivo.');
    }
};

// Helper para validar la cantidad de agua
const validarCantidadAgua = (cantidad_agua) => {
    if (cantidad_agua < 0) {
        throw new Error('La cantidad de agua debe ser un número positivo.');
    }
};

// Helper para validar el estado del riego
const validarEstado = (estado) => {
    if (![0, 1].includes(estado)) {
        throw new Error('El estado debe ser 0 (inactivo) o 1 (activo).');
    }
};

export default {
    existeRiegoPorId,
    validarCultivoId,
    validarEmpleadoId,
    validarFecha,
    validarEstadoFenologico,
    validarHora,
    validarDosis,
    validarCantidadAgua,
    validarEstado
};