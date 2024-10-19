import Cultivos from "../models/cultivos.js";
import Parcela from "../models/parcelas.js";

const helpersCultivos = {
	validarId: async (id) => {
		if (id != undefined) {
			try {
				const res = await Cultivos.findById(id);
				if (!res) {
					throw new Error("El cultivos no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
	validarIdParcela: async (id) => {
		if (id != undefined) {
			try {
				const res = await Parcela.findById(id);
				if (!res) {
					throw new Error("La parcela no existe");
				}
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}
		return true;
	},
};

export default helpersCultivos;
