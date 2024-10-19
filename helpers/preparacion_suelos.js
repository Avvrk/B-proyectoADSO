import validator from "validator";
import Parcela from "../models/parcelas.js";
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

const helpersPreparacionSuelos = {
	validarFecha: (fecha) => {
		if (fecha != undefined) {
			if (!dateValido(fecha)) {
				throw new Error("El campo fecha debe ser una fecha válida.");
			} else {
				return true;
			}
		} else {
			throw new Error("La fecha es un campo obligatoria.");
		}
	},

	validarIdParcela: async (id_parcela) => {
		if (id_parcela != undefined) {
			if (!isMongoId(id_parcela)) {
				throw new Error("El id_parcela debe ser un mongoId válido.");
			}
			try {
				const buscarParcela = await Parcela.findById(id_parcela);
				if (buscarParcela == undefined) {
					throw new Error("La parcela no existe.");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error(
					"Error al buscar la parcela en la base de datos: " +
						error.message
				);
			}
		} else {
			throw new Error("El id_parcela es un campo obligatorio.");
		}
	},

	validarEmpleadoId: async (empleado_id) => {
		if (empleado_id != undefined) {
			if (!isMongoId(empleado_id)) {
				throw new Error("El empleado_id debe ser un mongoId válido.");
			}
			try {
				const buscarEmpleado = await Empleado.findById(empleado_id);
				if (buscarEmpleado == undefined) {
					throw new Error("El empleado no existe.");
				} else {
					return true;
				}
			} catch (error) {
				throw new Error(
					"Error al buscar el empleado en la base de datos: " +
						error.message
				);
			}
		} else {
			throw new Error("El empleado_id es un campo obligatorio.");
		}
	},

	validarProductos: (productos) => {
		if (productos != undefined) {
			if (typeof productos !== "string" || productos.trim() === "") {
				throw new Error("El campo productos no debe estar vacío.");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	validarIngredienteActivo: (ingredienteActivo) => {
		if (ingredienteActivo != undefined) {
			if (
				typeof ingredienteActivo !== "string" ||
				ingredienteActivo.trim() === ""
			) {
				throw new Error("El ingrediente activo no debe estar vacío.");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	validarDosis: (dosis) => {
		if (dosis != undefined) {
			if (typeof dosis !== "number" || dosis <= 0) {
				throw new Error("La dosis debe ser un número positivo.");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	validarMetodoAplicacion: (metodoAplicacion) => {
		if (metodoAplicacion != undefined) {
			if (
				typeof metodoAplicacion !== "string" ||
				metodoAplicacion.trim() === ""
			) {
				throw new Error("El método de aplicación no debe estar vacío.");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	validarOperario: (operario) => {
		if (operario != undefined) {
			if (typeof operario !== "string" || operario.trim() === "") {
				throw new Error("El operario no debe estar vacío.");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	validarResponsable: (responsable) => {
		if (responsable != undefined) {
			if (typeof responsable !== "string" || responsable.trim() === "") {
				throw new Error("El responsable no debe estar vacío.");
			} else {
				return true;
			}
		} else {
			return true;
		}
	},

	validarObservaciones: (observaciones) => {
		if (observaciones != undefined) {
			if (
				typeof observaciones !== "string" ||
				observaciones.trim() === ""
			) {
				throw new Error("Las observaciones no debe estar vacías.");
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

export default helpersPreparacionSuelos;
