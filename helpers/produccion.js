import validator from 'validator';
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
    return dateString === formatoFecha;
}

const helpersProduccion = {
    // Valida que el ID del cultivo sea un MongoID valida y que exista en la base de datos.
    validarCultivo: async (cultivo_id) => {
        if (cultivo_id !== undefined) {
            if (!isMongoId(cultivo_id)) {
                throw new Error("El campo cultivo_id debe ser una MongoID válido.");
            }
            try {
                const buscarCultivo = await Cultivo.findById(cultivo_id);
                if (!buscarCultivo) {
                    throw new Error("El cultivo no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error en buscar el cultivo en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo cultivo_id es obligatorio.")
        }
    },
    //Valida que el campo fecha sea una fecha válida y no esté vacía.
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("El campo fecha debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("La fecha es obligatoria.")
        }
    },

    //Valida que el campo numeroLote no esté vacío y sea una cadena de texto.
    validarNroLote: (numeroLote) => {
        if (numeroLote !== undefined) {
            if (typeof numeroLote !== 'number' && numeroLote > 0) {
                throw new Error("El número Lote debe ser un valor valor válido.")
            } else {
                return true;
            }
        } else {
            throw new Error("El numero Lote es un campo obligatorio.")
        }
    },

    //Valida que el campo especie no esté vacío.
    validarEspecie: (especie) => {
        if (especie != undefined) {
            if (typeof especie !== 'string') {
                throw new Error("La especie no debe estar vacío.")
            }
        }
    },

    //Valida que el campo cantidad no esté vacío y sea una cadena númerica.
    validarCantidad: (cantidad) => {
        if (cantidad != undefined) {
            if (typeof cantidad !== 'number') {
                throw new Error("La cantidad debe ser un número válido.");
            } else {
                return true;
            }
        } else {
            throw new Error("La cantidad es un campo obligatorio.")
        }
    },

    //Valida que la cantidad de trabajadores no esté vacía.
    validarCantidadTrabajadores: (cantidadTrabajadores) => {
        if (cantidadTrabajadores != undefined) {
            if (typeof cantidadTrabajadores !== 'number') {
                throw new Error("La cantidad de trabajadores debe ser un número válido.");
            } else {
                return true
            }
        } else {
            throw new Error("La cantidad de trabajadores es un campo obligatorio.")
        }
    },

    //Valida que las observaciones no estén vacías.
    validarObservaciones: (observaciones) => {
        if (observaciones !== undefined) {
            if (typeof observaciones !== 'string') {
                throw new Error("Las observaciones deben ser formato en string.")
            } else {
                return true
            }
        } else {

        }
    },

};






export default helpersProduccion;