import Fertilizacion from "../models/fertilizacion.js";
import Empleado from "../models/empleados.js";
import Cultivo from "../models/cultivos.js";

function dateValido(dateString) {
	const registroTiempo = Date.parse(dateString);
	if (isNaN(registroTiempo)) {
		return false;
	}

	const fecha = new Date(dateString);
	const formatoFecha = fecha.toISOString().split("T")[0];
	return dateString === formatoFecha;
}

const helpersFertilizaciones = {
	validarId: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Fertilizacion.findById(id);
				if (!res) {
					throw new Error("La fertilizacion no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
	validarIdEmpleado: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Empleado.findById(id);
				if (!res) {
					throw new Error("El empleado no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
	validarIdCultivo: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Cultivo.findById(id);
				if (!res) {
					throw new Error("El cultivo no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
	validarFecha: (fecha) => {
		if (fecha !== undefined) {
			if (!dateValido(fecha)) {
				throw new Error("Ingrese una fecha válida.");
			}
		}
		return true;
	},
	validarFechas: (fechas) => {
		if (
			Array.isArray(fechas) &&
			fechas.length >= 2 &&
			fechas[0] != undefined &&
			fechas[1] != undefined
		) {
			const inicio = new Date(fechas[0]);
			const final = new Date(fechas[1]);
			if (inicio > final) {
				throw new Error(
					"La fecha de inicio no puede ser mayor que la fecha final"
				);
			}
			return true;
		}
		return true;
	},
};

export default helpersFertilizaciones;
