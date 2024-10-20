import Insumo from "../models/insumos.js";

const httpInsumos = {
	getInsumos: async (req, res) => {
		try {
			const insumos = await Insumo.find().populate(
				"id_finca",
				"nombre rut"
			);
			res.json({ insumos });
		} catch (error) {
			res.json({ error });
		}
	},
	getInsumosId: async (req, res) => {
		try {
			const { id } = req.params;
			const insumos = await Insumo.findById(id);
			res.json({ insumos });
		} catch (error) {
			res.json({ error });
		}
	},
	postInsumos: async (req, res) => {
		try {
			const {
				id_finca,
				nombre,
				registro_ica,
				registro_invima,
				relacionNPK,
				cantidad,
				unidad,
				observaciones,
			} = req.body;
			const insumos = new Insumo({
				id_finca,
				nombre,
				registro_ica,
				registro_invima,
				relacionNPK,
				cantidad,
				unidad,
				observaciones,
			});
			await insumos.save();
			res.json({ insumos });
		} catch (error) {
			res.json({ error });
		}
	},
	putInsumos: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...info } = req.body;
			const insumos = await Insumo.findByIdAndUpdate(id, info, {
				new: true,
			});
			res.json({ insumos });
		} catch (error) {
			res.json({ error });
		}
	},
};

export default httpInsumos;
