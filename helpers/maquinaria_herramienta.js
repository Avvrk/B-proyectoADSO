import validator from "validator";
import Proveedor from "../models/proveedores.js";
import Insumo from  "../models/insumos.js";
import Empleado from "../models/empleados.js";

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
	validarIdInsumo: async (id) => {
		if (id != undefined) {
			try {
				const res = await Insumo.findById(id);
				if (!res) {
					throw new Error("El insumo no existe");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error(error.message);
			}
		} else {
			return true;
		}
	},
	validarIdEmpleado: async (id) => {
		if (id != undefined) {
			try {
				const res = await Empleado.findById(id);
				if (!res) {
					throw new Error("El empleado no existe");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error(error.message);
			}
		} else {
			return true;
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
	validarFecha: (fecha) => {
		if (fecha !== undefined) {
			if (!dateValido(fecha)) {
				throw new Error("Ingrese una fecha válida.");
			}
		}
		return true;
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
};

export default helpersMaquinariaHerramienta;
