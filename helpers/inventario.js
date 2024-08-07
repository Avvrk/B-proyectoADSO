import validator from "validator";
import Inventario from "../models/inventario.js";

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

const helpersInventario = {

    validarTipo: (tipo) => {
        if (tipo != undefined) {
            if (typeof tipo !== 'string' || tipo.trim() === "") {
                throw new Error("El campo tipo no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarCantidad: (cantidad) => {
        if (cantidad != undefined) {
            if (isNaN(Number(cantidad))) {
                throw new Error("La cantidad debe ser un valor numérico.");
            } else if (cantidad < 0) {
                throw new Error("La cantidad debe ser un número positivo.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarUnidad: (unidad) => {
        if (unidad != undefined) {
            if (typeof unidad !== 'string' || unidad.trim() === "") {
                throw new Error("El campo unidad debe ser válido.");
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
                throw new Error("El campo estado debe ser 0 (inactivo) o 1 (activo).");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarIdSemillas: async (semillas_id) => {
        if (semillas_id != undefined) {
            if (!isMongoId(semillas_id)) {
                throw new Error("El campo semillas_id debe ser un mongoId válido.");
            }
            try {
                const buscarSemilla = await Inventario.findById(semillas_id);
                if (buscarSemilla == undefined) {
                    throw new Error("La semilla no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la semilla en la base de datos: " + error.message);
            }
        } else {
            return true;
        }
    },

    validarIdInsumos: async (insumos_id) => {
        if (insumos_id != undefined) {
            if (!isMongoId(insumos_id)) {
                throw new Error("El campo insumos_id debe ser un mongoId válido");
            }
            try {
                const buscarInsumo = await Inventario.findById(insumos_id);
                if (buscarInsumo == undefined) {
                    throw new Error("El insumo no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el insumo en la base de datos: " + error.message);
            }
        } else {
            return true;
        }
    },

    validarIdMaquinaria: async (maquinaria_id) => {
        if (maquinaria_id != undefined) {
            if (!isMongoId(maquinaria_id)) {
                throw new Error("El campo maquinaria_id debe ser un mongoId válido");
            }
            try {
                const buscarMaquinaria = await Inventario.findById(maquinaria_id);
                if (buscarMaquinaria == undefined) {
                    throw new Error("La maquinaria no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la maquinaria en la base de datos: " + error.message);
            }
        } else {
            return true;
        }
    }
};

export default helpersInventario;