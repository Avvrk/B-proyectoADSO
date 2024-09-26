import validator from "validator";
import Empleado from '../models/empleados.js';

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

const helpersNomina = {

    validarFecha: (fecha) => {
    if (fecha !== undefined) {
        // Intenta convertir el valor en una fecha
        const fechaConvertida = new Date(fecha);

        // Verifica si la conversión resultó en una fecha válida
        if (isNaN(fechaConvertida.getTime())) {
                throw new Error("La fecha debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("La fecha es obligatoria.");
        }
    },

    validarIdEmpleado: async (id_empleado) => {
        if (id_empleado !== undefined) {
            if (!isMongoId(id_empleado)) {
                throw new Error("El campo id_empleado debe ser un mongoId válido.");
            }
            try {
                const buscarEmpleado = await Empleado.findById(id_empleado);
                if (!buscarEmpleado) {
                    throw new Error("El empleado no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el empleado en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo id_empleado es obligatorio.");
        }
    },

    validarTipo: (tipo) => {
        if (tipo !== undefined) {
            if (typeof tipo !== 'string' || tipo.trim() === "") {
                throw new Error("El tipo no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            throw new Error("El tipo es obligatorio.");
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
    }
};

export default helpersNomina;