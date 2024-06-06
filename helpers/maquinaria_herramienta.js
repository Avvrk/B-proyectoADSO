import validator from "validator";
import Proveedor from '../models/Proveedor.js';

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

const helpersMaquinariaHerramienta = {
    // Valida que el ID del proveedor sea un MongoID válido y que exista en la base de datos
    validarIdProveedor: async (proveedores_id) => {
        if (proveedores_id !== undefined) {
            if (!isMongoId(proveedores_id)) {
                throw new Error("El campo proveedores_id debe ser un mongoId válido.");
            }
            try {
                const buscarProveedor = await Proveedor.findById(proveedores_id);
                if (!buscarProveedor) {
                    throw new Error("El proveedor no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el proveedor en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo proveedores_id es obligatorio.");
        }
    },
    // Valida que el campo nombre no esté vacío y sea una cadena de texto
    validarNombre: (nombre) => {
        if (nombre !== undefined) {
            if (typeof nombre !== 'string' || nombre.trim() === "") {
                throw new Error("El campo nombre no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo nombre es obligatorio.");
        }
    },
    // Valida que el campo tipo no esté vacío y sea una cadena de texto
    validarTipo: (tipo) => {
        if (tipo !== undefined) {
            if (typeof tipo !== 'string' || tipo.trim() === "") {
                throw new Error("El campo tipo no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            throw new Error("El campo tipo es obligatorio.");
        }
    },
    // Valida que el campo fecha de compra sea una fecha válida y no esté vacío
    validarFechaCompra: (fechaCompra) => {
        if (fechaCompra !== undefined) {
            if (!dateValido(fechaCompra)) {
                throw new Error("La fecha de compra debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("La fecha de compra es obligatoria.");
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
    // Valida que el campo cantidad sea un número positivo
    validarCantidad: (cantidad) => {
        if (cantidad !== undefined) {
            if (typeof cantidad !== 'number' || cantidad <= 0) {
                throw new Error("La cantidad debe ser un número positivo.");
            } else {
                return true;
            }
        } else {
            throw new Error("La cantidad es obligatoria.");
        }
    },
    // Valida que el campo total sea un número positivo
    validarTotal: (total) => {
        if (total !== undefined) {
            if (typeof total !== 'number' || total <= 0) {
                throw new Error("El total debe ser un número positivo.");
            } else {
                return true;
            }
        } else {
            throw new Error("El total es obligatorio.");
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

export default helpersMaquinariaHerramienta;