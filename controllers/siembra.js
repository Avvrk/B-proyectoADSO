import Siembra from "../models/siembra.js";

const httpSiembras = {
	getSiembras: async (req, res) => {
		try {
			const siembras = await Siembra.find()
				.populate("id_cultivo", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ siembras });
		} catch (error) {
			res.json({ error });
		}
	},
	getSiembraId: async (req, res) => {
		try {
			const { id } = req.params;
			const siembra = await Siembra.findById(id)
				.populate("id_cultivo", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ siembra });
		} catch (error) {
			res.json({ error });
		}
	},
	getSiembrasFechas: async (req, res) => {
		try {
			const { fechaInicio, fechaFin } = req.body;
			const siembras = await Siembra.find({
				fechaSiembra: { $gte: fechaInicio, $lte: fechaFin },
			})
				.populate("id_cultivo", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ siembras });
		} catch (error) {
			res.json({ error });
		}
	},
	getSiembraEmpleado: async (req, res) => {
		try {
			const { empleadoId } = req.params;
			const siembras = await Siembra.find({ empleado_id: empleadoId })
				.populate("id_cultivo", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ siembras });
		} catch (error) {
			res.json({ error });
		}
	},
	getSiembraCultivoAnterior: async (req, res) => {
		try {
			const { id } = req.params;
			const siembras = await Siembra.findById(id, { cultivoAnterior: 1 })
				.populate("id_cultivo", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ siembras });
		} catch (error) {
			res.json({ error });
		}
	},
	getSiembrasActivas: async (req, res) => {
		try {
			const siembras = await Siembra.find({ estado: 1 })
				.populate("id_cultivo", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ siembras });
		} catch (error) {
			res.json({ error });
		}
	},
	getSiembrasInactivas: async (req, res) => {
		try {
			const siembras = await Siembra.find({ estado: 0 })
				.populate("id_cultivo", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ siembras });
		} catch (error) {
			res.json({ error });
		}
	},
	postSiembra: async (req, res) => {
		try {
			const { ...info } = req.body;
			const siembra = new Siembra(info);
			await siembra.save();
			res.json({ siembra });
		} catch (error) {
			res.json({ error });
		}
	},
	putSiembra: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...info } = req.body;
			const siembra = await Siembra.findByIdAndUpdate(id, info, {
				new: true,
			});
			res.json({ siembra });
		} catch (error) {
			res.json({ error });
		}
	},
	putSiembraActivar: async (req, res) => {
		try {
			const { id } = req.params;
			const siembraActivada = await Siembra.findByIdAndUpdate(
				id,
				{ estado: 1 },
				{ new: true }
			);
			res.json({ siembraActivada });
		} catch (error) {
			res.json({ error });
		}
	},
	putSiembraInactivar: async (req, res) => {
		try {
			const { id } = req.params;
			const siembraInactivada = await Siembra.findByIdAndUpdate(
				id,
				{ estado: 0 },
				{ new: true }
			);
			res.json({ siembraInactivada });
		} catch (error) {
			res.json({ error });
		}
	},
};

export default httpSiembras;
