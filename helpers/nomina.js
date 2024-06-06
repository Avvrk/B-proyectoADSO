import validator from "validator";
import Empleado from '../models/Empleados.js';

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

const helpersNomina = {
    // Valida que el campo fecha sea una fecha válida y no esté vacío
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("La fecha debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("La fecha es obligatoria.");
        }
    },
    // Valida que el ID del empleado sea un MongoID válido y que exista en la base de datos
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
    // Valida que el campo tipo no esté vacío y sea una cadena de texto
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
    // Valida que el campo valor sea un número positivo
    validarValor: (valor) => {
        if (valor !== undefined) {
            if (typeof valor !== 'number' || valor <= 0) {
                throw new Error("El campo valor debe ser un número positivo.");
            } else {
                return true;
            }
        } else {
            throw new Error("El valor es obligatorio.");
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
            return true;
        }
    }
};

export default helpersNomina;