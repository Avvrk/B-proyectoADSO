import Cultivo from "../models/cultivos.js";

const httpCultivos = {
	getCultivos: async (req, res) => {
		try {
			const cultivos = await Cultivo.find().populate({
				path: "id_parcela",
				select: "numero id_fincas",
				populate: { path: "id_fincas", select: "nombre rut" },
			});
			res.json({ cultivos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
	getCultivosId: async (req, res) => {
		try {
			const { id } = req.params;
			const cultivos = await Cultivo.findById(id);
			res.json({ cultivos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
	getCultivosTipo: async (req, res) => {
		try {
			const { tipo } = req.params;
			const cultivos = await Cultivo.find({ tipo }).populate({
				path: "id_parcela",
				select: "numero id_fincas",
				populate: { path: "id_fincas", select: "nombre rut" },
			});
			res.json({ cultivos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
	getCultivosParcela: async (req, res) => {
		try {
			const { id_parcela } = req.params;
			const cultivos = await Cultivo.find({ id_parcela }).populate({
				path: "id_parcela",
				select: "numero id_fincas",
				populate: { path: "id_fincas", select: "nombre rut" },
			});
			res.json({ cultivos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
	postCultivos: async (req, res) => {
		try {
			const { nombre, tipo, id_parcela } = req.body;
			const cultivos = new Cultivo({
				nombre,
				tipo,
				id_parcela,
			});
			await cultivos.save();
			res.json({ cultivos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
	putCultivos: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...info } = req.body;
			const cultivos = await Cultivo.findByIdAndUpdate(id, info, {
				new: true,
			});
			res.json({ cultivos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
};

export default httpCultivos;
