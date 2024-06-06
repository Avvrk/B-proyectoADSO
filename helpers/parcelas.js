import validator from 'validator';
import Finca from '../models/Fincas.js';

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

const helpersParcela = {
    // Valida que el número de parcela sea un número positivo y esté definido
    validarNumero: (numero) => {
        if (numero != undefined) {
            if (typeof numero !== 'number' || numero <= 0) {
                throw new Error("El número debe ser un número positivo.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo número es obligatorio.");
        }
    },
    // Valida que la ubicación geográfica no esté vacía y esté definida
    validarUbicacionGeografica: (ubicacionGeografica) => {
        if (ubicacionGeografica != undefined) {
            if (typeof ubicacionGeografica !== 'string' || ubicacionGeografica.trim() === "") {
                throw new Error("La ubicación geográfica no debe estar vacía.");
            } else {
                return true;
            }
        } else {
            throw new Error("La ubicación geográfica es un campo obligatorio.");
        }
    },
    // Valida que el cultivo actual no esté vacío y esté definido
    validarCultivoActual: (cultivoActual) => {
        if (cultivoActual != undefined) {
            if (typeof cultivoActual !== 'string' || cultivoActual.trim() === "") {
                throw new Error("El cultivo actual no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            throw new Error("El cultivo actual es un campo obligatorio.");
        }
    },
    // Valida que el detalle no esté vacío
    validarDetalle: (detalle) => {
        if (detalle != undefined) {
            if (typeof detalle !== 'string' || detalle.trim() === "") {
                throw new Error("El detalle no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    // Valida que el estado sea 0 (inactivo) o 1 (activo)
    validarEstado: (estado) => {
        if (estado != undefined) {
            if (![0, 1].includes(Number(estado))) {
                throw new Error("El estado debe ser 0 (inactivo) o 1 (activo).");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    // Valida que el área sea un número positivo y esté definido
    validarArea: (area) => {
        if (area != undefined) {
            if (typeof area !== 'number' || area <= 0) {
                throw new Error("El área debe ser un número positivo.");
            } else {
                return true;
            }
        } else {
            throw new Error("El área es un campo obligatorio.");
        }
    },
    // Valida que el asistente técnico no esté vacío
    validarAsistenteTecnico: (asistenteTecnico) => {
        if (asistenteTecnico != undefined) {
            if (typeof asistenteTecnico !== 'string' || asistenteTecnico.trim() === "") {
                throw new Error("El campo asistente técnico no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    // Valida que el ID de la finca sea un MongoID válido y que exista en la base de datos
    validarIdFincas: async (id_fincas) => {
        if (id_fincas != undefined) {
            if (!isMongoId(id_fincas)) {
                throw new Error("El campo id_fincas debe ser un mongoId válido.");
            }
            try {
                const buscarFinca = await Finca.findById(id_fincas); // Busca la finca en la base de datos
                if (buscarFinca == undefined) {
                    throw new Error("La finca no existe."); // Lanza un error si la finca no existe
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la finca en la base de datos: " + error.message); // Manejo de errores
            }
        } else {
            throw new Error("El campo id_fincas es obligatorio."); // Lanza un error si el campo no está definido
        }
    }
};

export default helpersParcela;