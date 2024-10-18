import Finca from "../models/fincas.js";

const httpFincas = {
	getFincas: async (req, res) => {
		try {
			const fincas = await Finca.find().populate("_idUsuario", "nombre");
			res.json({ fincas });
		} catch (error) {
			res.json({ error });
		}
	},
	getFincasId: async (req, res) => {
		try {
			const { id } = req.params;
			const fincas = await Finca.findById(id);
			res.json({ fincas });
		} catch (error) {
			res.json({ error });
		}
	},
	getFincasActivos: async (req, res) => {
		try {
			const fincas = await Finca.find({ estado: 1 });
			res.json({ fincas });
		} catch (error) {
			req.json({ error });
		}
	},
	getFincasInactivos: async (req, res) => {
		try {
			const fincas = await Finca.find({ estado: 0 });
			res.json({ fincas });
		} catch (error) {
			req.json({ error });
		}
	},
	postFincas: async (req, res) => {
		console.log("here");

		try {
			const {
				_idUsuario,
				nombre,
				rut,
				direccion,
				ubicacionGeografica,
				departamento,
				ciudad,
				area,
				documentos,
				limites,
			} = req.body;
			const fincas = new Finca({
				_idUsuario,
				nombre,
				rut,
				direccion,
				ubicacionGeografica,
				departamento,
				ciudad,
				area,
				documentos,
				limites,
			});
			await fincas.save();
			res.json({ fincas });
		} catch (error) {
			res.json({ error: error.message });
		}
	},
	putFincas: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...info } = req.body;
			const fincas = await Finca.findByIdAndUpdate(id, info, {
				new: true,
			});
			res.json({ fincas });
		} catch (error) {
			res.json({ error });
		}
	},
	putFincasActivar: async (req, res) => {
		try {
			const { id } = req.params;
			const fincas = await Finca.findByIdAndUpdate(
				id,
				{ estado: 1 },
				{ new: true }
			);
			res.json({ fincas });
		} catch (error) {
			req.json({ error });
		}
	},
	putFincasInactivar: async (req, res) => {
		try {
			const { id } = req.params;
			const fincas = await Finca.findByIdAndUpdate(
				id,
				{ estado: 0 },
				{ new: true }
			);
			res.json({ fincas });
		} catch (error) {
			req.json({ error });
		}
	},
};

export default httpFincas;
