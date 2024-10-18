import Semilla from "../models/semillas.js";
import Proveedor from "../models/proveedores.js";

const helpersSemillas = {
	existeSemillaPorId: async (id) => {
		const existe = await Semilla.findById(id);
		if (!existe) {
			throw new Error(`La semilla con ID ${id} no existe.`);
		}
	},
	validarProveedorId: async (proveedor_id) => {
		const existe = await Proveedor.findById(proveedor_id);
		if (!existe) {
			throw new Error(`El proveedor con ID ${proveedor_id} no existe.`);
		}
	},
	validarFecha: (fecha) => {
		if (fecha && isNaN(Date.parse(fecha))) {
			throw new Error("La fecha no es válida.");
		}
	},
	validarEstado: (estado) => {
		if (![0, 1].includes(estado)) {
			throw new Error("El estado debe ser 0 (inactivo) o 1 (activo).");
		}
	},
};

export default helpersSemillas;
