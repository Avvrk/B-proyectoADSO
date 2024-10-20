import Insumo from "../models/insumos.js";
import Finca from "../models/fincas.js";

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
	validarIdFinca: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Finca.findById(id);
				if (!res) {
					throw new Error("La finca no existe");
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
