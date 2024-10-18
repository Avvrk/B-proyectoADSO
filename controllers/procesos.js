import Proceso from "../models/procesos.js";

const httpProcesos = {
	getProcesos: async (req, res) => {
		try {
			const procesos = await Proceso.find()
				.populate("cultivo_id", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	getProcesoID: async (req, res) => {
		try {
			const { id } = req.params;
			const procesos = await Proceso.findById(id)
				.populate("cultivo_id", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	getProcesoEmpleadoID: async (req, res) => {
		try {
			const { id } = req.params;
			const empleado = await Proceso.find({ empleado_id: id })
				.populate("cultivo_id", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ empleado });
		} catch (error) {
			res.json({ error });
		}
	},
	getProcesosEntreFechas: async (req, res) => {
		try {
			const { fechaInicio, fechaFin } = req.params;
			const fechaInicioObj = new Date(fechaInicio);
			const fechaFinObj = new Date(fechaFin);
			const procesos = await Proceso.find({
				fecha_inicio: { $gte: fechaInicioObj, $lte: fechaFinObj },
			})
				.populate("cultivo_id", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	getProcesosTipo: async (req, res) => {
		try {
			const { tipo } = req.params;
			const procesos = await Proceso.find({ tipo: tipo })
				.populate("cultivo_id", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	getProcesosActivos: async (req, res) => {
		try {
			const procesos = await Proceso.find({ estado: 1 })
				.populate("cultivo_id", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	getProcesosInactivos: async (req, res) => {
		try {
			const procesos = await Proceso.find({ estado: 0 })
				.populate("cultivo_id", "nombre")
				.populate("empleado_id", "nombre");
			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	postProcesos: async (req, res) => {
		try {
			const {
				cultivo_id,
				empleado_id,
				tipo,
				descripcion,
				fecha_inicio,
				fecha_final,
				estado,
			} = req.body;
			const procesos = new Proceso({
				cultivo_id,
				empleado_id,
				tipo,
				descripcion,
				fecha_inicio,
				fecha_final,
				estado,
			});
			await procesos.save();
			res.json({ procesos });
		} catch (error) {
			res.json(error);
		}
	},
	putProcesos: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...info } = req.body;
			const procesos = await Proceso.findByIdAndUpdate(id, info, {
				new: true,
			});

			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	putProcesosActivar: async (req, res) => {
		try {
			const { id } = req.params;
			const procesos = await Proceso.findByIdAndUpdate(
				id,
				{ estado: 1 },
				{ new: true }
			);
			res.json({ procesos });
		} catch (error) {
			res.json({ error });
		}
	},
	putProcesoInactivar: async (req, res) => {
		try {
			const { id } = req.params;
			const proceso = await Proceso.findByIdAndUpdate(
				id,
				{ estado: 0 },
				{ new: true }
			);
			res.json({ proceso });
		} catch (error) {
			res.json({ error });
		}
	},
};

export default httpProcesos;
