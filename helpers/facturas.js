import Factura from "../models/factura.js";
import Produccion from "../models/produccion.js";
import Comprador from "../models/comprador.js";

function dateValido(dateString) {
	const registroTiempo = Date.parse(dateString);
	if (isNaN(registroTiempo)) {
		return false;
	}

	const fecha = new Date(dateString);
	const formatoFecha = fecha.toISOString().split("T")[0];
	return dateString === formatoFecha;
}

const helpersFacturas = {
	validarId: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Factura.findById(id);
				if (!res) {
					throw new Error("La factura no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
	validarIdProduccion: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Produccion.findById(id);
				if (!res) {
					throw new Error("La produccion no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
	validarIdComprador: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Comprador.findById(id);
				if (!res) {
					throw new Error("El comprador no existe");
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

export default helpersFacturas;
