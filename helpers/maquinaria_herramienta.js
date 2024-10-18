import validator from "validator";
import Proveedor from "../models/proveedores.js";

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

const helpersMaquinariaHerramienta = {
	validarIdProveedor: async (proveedores_id) => {
		if (proveedores_id !== undefined) {
			if (!isMongoId(proveedores_id)) {
				throw new Error(
					"El campo proveedores_id debe ser un mongoId válido."
				);
			}
			try {
				const buscarProveedor = await Proveedor.findById(
					proveedores_id
				);
				if (!buscarProveedor) {
					throw new Error("El proveedor no existe.");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error(
					"Error al buscar el proveedor en la base de datos: " +
						error.message
				);
			}
		} else {
			throw new Error("El campo proveedores_id es obligatorio.");
		}
	},

	validarNombre: (nombre) => {
		if (nombre !== undefined) {
			if (typeof nombre !== "string" || nombre.trim() === "") {
				throw new Error("El campo nombre no debe estar vacío.");
			} else {
				return true;
			}
		} else {
			throw new Error("El campo nombre es obligatorio.");
		}
	},

	validarTipo: (tipo) => {
		if (tipo !== undefined) {
			if (typeof tipo !== "string" || tipo.trim() === "") {
				throw new Error("El campo tipo no debe estar vacío.");
			} else {
				return true;
			}
		} else {
			throw new Error("El campo tipo es obligatorio.");
		}
	},

	validarFechaCompra: (fechaCompra) => {
		if (fechaCompra !== undefined) {
			// Intenta convertir el valor en una fechaCompra
			const fechaConvertida = new Date(fechaCompra);

			// Verifica si la conversión resultó en una fecha válida
			if (isNaN(fechaConvertida.getTime())) {
				throw new Error(
					"La fecha de compra debe ser una fecha válida."
				);
			} else {
				return true;
			}
		} else {
			throw new Error("La fecha de compra es obligatoria.");
		}
	},

	validarObservaciones: (observaciones) => {
		if (observaciones !== undefined) {
			if (
				typeof observaciones !== "string" ||
				observaciones.trim() === ""
			) {
				throw new Error("Las observaciones no deben estar vacías.");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	validarCantidad: (cantidad) => {
		if (cantidad !== undefined) {
			if (typeof cantidad !== "number" || cantidad <= 0) {
				throw new Error("La cantidad debe ser un número positivo.");
			} else {
				return true;
			}
		} else {
			throw new Error("La cantidad es obligatoria.");
		}
	},

	validarTotal: (total) => {
		if (total !== undefined) {
			if (typeof total !== "number" || total <= 0) {
				throw new Error("El total debe ser un número positivo.");
			} else {
				return true;
			}
		} else {
			throw new Error("El total es obligatorio.");
		}
	},

	validarEstado: (estado) => {
		if (estado !== undefined) {
			if (![0, 1].includes(Number(estado))) {
				throw new Error(
					"El estado debe ser 0 (inactivo) o 1 (activo)."
				);
			} else {
				return true;
			}
		} else {
			return true;
		}
	},
};

export default helpersMaquinariaHerramienta;
