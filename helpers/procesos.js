import validator from 'validator';
import Proceso from '../Models/Procesos.js';
import Empleado from '../Models/Empleados.js';
import Cultivo from '../Models/Cultivos.js';

const { isMongoId } = validator;

// Función para validar si una cadena de texto es una fecha válida
function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }
    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split("T")[0];
    return dateString === formatoFecha; // Verifica si el formato de la fecha coincide con la fecha en formato ISO
}

const helpersProcesos = {
    // Valida que el campo cultivo_id sea un MongoID válido y que exista en la base de datos
    validarCultivoID: async (cultivo_id) => {
        if (cultivo_id !== undefined) {
            if (!isMongoId(cultivo_id)) {
                throw new Error("El campo cultivo_id debe ser un MongoID válido.");
            }
            try {
                const cultivo = await Cultivo.findById(cultivo_id);
                if (!cultivo) {
                    throw new Error("El cultivo no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el cultivo en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo cultivo_id es obligatorio.");
        }
    },
    
    // Valida que el campo empleado_id sea un MongoID válido y que exista en la base de datos
    validarEmpleadoID: async (empleado_id) => {
        if (empleado_id !== undefined) {
            if (!isMongoId(empleado_id)) {
                throw new Error("El campo empleado_id debe ser un MongoID válido.");
            }
            try {
                const empleado = await Empleado.findById(empleado_id);
                if (!empleado) {
                    throw new Error("El empleado no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el empleado en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo empleado_id es obligatorio.");
        }
    },
    
    // Valida que el campo tipo no esté vacío y sea una cadena de texto
    validarTipo: (tipo) => {
        if (tipo !== undefined) {
            if (typeof tipo !== 'string' || tipo.trim() === "") {
                throw new Error("El campo tipo no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo tipo es obligatorio.");
        }
    },

    // Valida que el campo fecha_inicio sea una fecha válida y no esté vacío
    validarFechaInicio: (fecha_inicio) => {
        if (fecha_inicio !== undefined) {
            if (!dateValido(fecha_inicio)) {
                throw new Error("El campo fecha_inicio debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo fecha_inicio es obligatorio.");
        }
    },

    // Valida que el campo fecha_final sea una fecha válida
    validarFechaFinal: (fecha_final) => {
        if (fecha_final !== undefined) {
            if (!dateValido(fecha_final)) {
                throw new Error("El campo fecha_final debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            return true; // No es obligatorio
        }
    },

    // Valida que el campo estado sea 0 (inactivo) o 1 (activo)
    validarEstado: (estado) => {
        if (estado !== undefined) {
            if (![0, 1].includes(Number(estado))) {
                throw new Error("El estado debe ser 0 (inactivo) o 1 (activo).");
            } else {
                return true;
            }
        } else {
            return true; // No es obligatorio
        }
    },

    // Valida que el ID del proceso sea un MongoID válido y que exista en la base de datos
    validarProcesoID: async (id) => {
        if (id !== undefined) {
            if (!isMongoId(id)) {
                throw new Error("El ID del proceso debe ser un MongoID válido.");
            }
            try {
                const proceso = await Proceso.findById(id);
                if (!proceso) {
                    throw new Error("El proceso no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el proceso en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El ID del proceso es obligatorio.");
        }
    }
};

export default helpersProcesos;