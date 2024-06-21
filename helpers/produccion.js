import validator from 'validator';
import Produccion from '../Models/Produccion.js';
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

const helpersProducciones = {
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

    // Valida que el campo fecha sea una fecha válida y no esté vacío
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("El campo fecha debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo fecha es obligatorio.");
        }
    },

    // Valida que el campo numeroLote no esté vacío y sea una cadena de texto
    validarNumeroLote: (numeroLote) => {
        if (numeroLote !== undefined) {
            if (typeof numeroLote !== 'string' || numeroLote.trim() === "") {
                throw new Error("El campo numeroLote no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo numeroLote es obligatorio.");
        }
    },

    // Valida que el campo cantidad sea un número positivo
    validarCantidad: (cantidad) => {
        if (cantidad !== undefined) {
            if (typeof cantidad !== 'number' || cantidad <= 0) {
                throw new Error("El campo cantidad debe ser un número positivo.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo cantidad es obligatorio.");
        }
    },

    // Valida que el campo cantidadTrabajadores sea un número no negativo
    validarCantidadTrabajadores: (cantidadTrabajadores) => {
        if (cantidadTrabajadores !== undefined) {
            if (typeof cantidadTrabajadores !== 'number' || cantidadTrabajadores < 0) {
                throw new Error("El campo cantidadTrabajadores debe ser un número no negativo.");
            } else {
                return true;
            }
        } else {
            return true; // No es obligatorio
        }
    },

    // Valida que el campo observaciones sea una cadena de texto (opcional)
    validarObservaciones: (observaciones) => {
        if (observaciones !== undefined) {
            if (typeof observaciones !== 'string') {
                throw new Error("El campo observaciones debe ser una cadena de texto.");
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

    // Valida que el ID de producción sea un MongoID válido y que exista en la base de datos
    validarProduccionID: async (id) => {
        if (id !== undefined) {
            if (!isMongoId(id)) {
                throw new Error("El ID de producción debe ser un MongoID válido.");
            }
            try {
                const produccion = await Produccion.findById(id);
                if (!produccion) {
                    throw new Error("La producción no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la producción en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El ID de producción es obligatorio.");
        }
    }
};

export default helpersProducciones;