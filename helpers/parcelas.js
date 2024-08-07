import validator from 'validator';
import Finca from '../models/fincas.js';

const { isMongoId } = validator;

const helpersParcela = {

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

    validarIdFincas: async (id_fincas) => {
        if (id_fincas != undefined) {
            if (!isMongoId(id_fincas)) {
                throw new Error("El campo id_fincas debe ser un mongoId válido.");
            }
            try {
                const buscarFinca = await Finca.findById(id_fincas);
                if (buscarFinca == undefined) {
                    throw new Error("La finca no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la finca en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo id_fincas es obligatorio.");
        }
    }
};

export default helpersParcela;