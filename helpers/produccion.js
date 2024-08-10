import validator from 'validator';
import Produccion from '../models/produccion.js';
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

const helpersProducciones = {

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

    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("Ingrese una fecha válida.");
            }
        }
        return true;
    },


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


    validarCantidadTrabajadores: (cantidadTrabajadores) => {
        if (cantidadTrabajadores !== undefined) {
            if (typeof cantidadTrabajadores !== 'number' || cantidadTrabajadores < 0) {
                throw new Error("El campo cantidadTrabajadores debe ser un número no negativo.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },


    validarObservaciones: (observaciones) => {
        if (observaciones !== undefined) {
            if (typeof observaciones !== 'string') {
                throw new Error("El campo observaciones debe ser una cadena de texto.");
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