import Finca from "../models/fincas.js";
import Admin from "../models/admin.js";

const helpersFincas = {
	validarId: async (id) => {
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
	validarIdAdmin: async (id) => {
		if (id !== undefined) {
			try {
				const res = await Admin.findById(id);
				if (!res) {
					throw new Error("El admin no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
};

export default helpersFincas;
