import Insumo from "../models/insumos.js";

const httpInsumos = {
	getInsumos: async (req, res) => {
		try {
			const insumos = await Insumo.find().populate(
				"proveedores_id",
				"nombre telefono email"
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
				proveedores_id,
				nombre,
				relacionNPK,
				cantidad,
				unidad,
				responsable,
				observaciones,
				total,
			} = req.body;
			const insumos = new Insumo({
				proveedores_id,
				nombre,
				relacionNPK,
				cantidad,
				unidad,
				responsable,
				observaciones,
				total,
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
