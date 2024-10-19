import Insumo from "../models/insumos.js";
import Proveedor from "../models/proveedores.js";

const helpersInsumos = {
	validarId: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Insumo.findById(id);
				if (!res) {
					throw new Error("El insumo no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
	validarIdProveedores: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Proveedor.findById(id);
				if (!res) {
					throw new Error("El proveedor no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
};

export default helpersInsumos;
