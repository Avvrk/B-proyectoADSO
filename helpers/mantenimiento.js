import validator from "validator";
import Gasto from '../models/Gastos.js';
import Herramienta from '../Models/Maquinaria_herramientas.js';

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

const helpersMantenimiento = {
    // Valida que el campo fecha sea una fecha válida y no esté vacío
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("El campo fecha debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("La fecha es obligatoria.");
        }
    },
    // Valida que el campo verificación realizada no esté vacío y sea una cadena de texto
    validarVerificacionRealizada: (verificacionRealizada) => {
        if (verificacionRealizada !== undefined) {
            if (typeof verificacionRealizada !== 'string' || verificacionRealizada.trim() === "") {
                throw new Error("El campo verificación realizada no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    // Valida que el campo calibración no esté vacío y sea una cadena de texto
    validarCalibracion: (calibracion) => {
        if (calibracion !== undefined) {
            if (typeof calibracion !== 'string' || calibracion.trim() === "") {
                throw new Error("El campo calibración no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    // Valida que el campo responsable no esté vacío y sea una cadena de texto
    validarResponsable: (responsable) => {
        if (responsable !== undefined) {
            if (typeof responsable !== 'string' || responsable.trim() === "") {
                throw new Error("El campo responsable no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    // Valida que el campo observaciones no esté vacío y sea una cadena de texto
    validarObservaciones: (observaciones) => {
        if (observaciones !== undefined) {
            if (typeof observaciones !== 'string' || observaciones.trim() === "") {
                throw new Error("Las observaciones no deben estar vacías.");
            } else {
                return true;
            }
        } else {
            return true;
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
    },
    // Valida que el ID de gastos sea un MongoID válido y que exista en la base de datos
    validarIdGastos: async (gastos_id) => {
        if (gastos_id !== undefined) {
            if (!isMongoId(gastos_id)) {
                throw new Error("El campo gastos_id debe ser un mongoId válido.");
            }
            try {
                const buscarGasto = await Gasto.findById(gastos_id);
                if (!buscarGasto) {
                    throw new Error("El gasto no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el gasto en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo gastos_id es obligatorio.");
        }
    },
    // Valida que el ID de herramienta sea un MongoID válido y que exista en la base de datos
    validarIdHerramienta: async (id_herramienta) => {
        if (id_herramienta !== undefined) {
            if (!isMongoId(id_herramienta)) {
                throw new Error("El campo id_herramienta debe ser un mongoId válido.");
            }
            try {
                const buscarHerramienta = await Herramienta.findById(id_herramienta);
                if (!buscarHerramienta) {
                    throw new Error("La herramienta no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la herramienta en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo id_herramienta es obligatorio.");
        }
    }
};

export default helpersMantenimiento;