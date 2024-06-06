import validator from "validator";
import Inventario from "../models/Inventario.js";

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

const helpersInventario = {
    // Valida que el campo tipo no esté vacío y sea una cadena de texto
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
    // Valida que la cantidad sea un número positivo
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
    // Valida que el campo unidad no esté vacío y sea una cadena de texto
    validarUnidad: (unidad) => {
        if (unidad != undefined) {
            if (typeof unidad !== 'string' || unidad.trim() === "") {
                throw new Error("El campo unidad no debe estar vacío.");
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
                throw new Error("El campo estado debe ser 0 (inactivo) o 1 (activo).");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    // Valida que el ID de semillas sea un MongoID válido y que exista en la base de datos
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
    // Valida que el ID de insumos sea un MongoID válido y que exista en la base de datos
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
    // Valida que el ID de maquinaria sea un MongoID válido y que exista en la base de datos
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