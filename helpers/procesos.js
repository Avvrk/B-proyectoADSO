import validator from 'validator';
import Proceso from '../models/procesos.js';
import Empleado from '../models/empleados.js';
import Cultivo from '../models/cultivos.js';

const { isMongoId } = validator;


function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }
    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split("T")[0];
    return dateString === formatoFecha;
}

const helpersProcesos = {

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


    validarFechaFinal: (fecha_final) => {
        if (fecha_final !== undefined) {
            if (!dateValido(fecha_final)) {
                throw new Error("El campo fecha_final debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },


    validarEstado: (estado) => {
        if (estado !== undefined) {
            if (![0, 1].includes(Number(estado))) {
                throw new Error("El estado debe ser 0 (inactivo) o 1 (activo).");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },


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