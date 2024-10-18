import Cultivo from "../models/cultivos.js";
import Empleado from "../models/empleados.js";
import Inventario from "../models/inventario.js";

//Falta terminar unas cosas

const helpersSiembras = {
	validarEstado: (estado) => {
		if (estado !== 0 && estado !== 1) {
			throw new Error("El estado debe ser 0 o 1.");
		}
		return true;
	},
	validarIdCultivo: async (id) => {
		const cultivo = await Cultivo.findById(id);
		if (!cultivo) {
			throw new Error("El ID del cultivo no existe.");
		}
		return true;
	},
	validarIdEmpleado: async (id) => {
		const empleado = await Empleado.findById(id);
		if (!empleado) {
			throw new Error("El ID del empleado no existe.");
		}
		return true;
	},
	validarIdInventario: async (id) => {
		const inventario = await Inventario.findById(id);
		if (!inventario) {
			throw new Error("El ID del inventario no existe.");
		}
		return true;
	},
};

export default helpersSiembras;
