import Empleado from "../models/empleados.js";

const httpEmpleados = {
	getEmpleados: async (req, res) => {
		try {
			const empleados = await Empleado.find();
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	getEmpleadosId: async (req, res) => {
		try {
			const { id } = req.params;
			const empleados = await Empleado.findById(id);
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	getEmpleadosDescripcion: async (req, res) => {
		try {
			const { id } = req.params;
			const empleados = await Empleado.find(
				{ _id: id },
				{ descripcion: 1 }
			);
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	getEmpleadosActivos: async (req, res) => {
		try {
			const empleados = await Empleado.find({ estado: 1 });
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	getEmpleadosInactivos: async (req, res) => {
		try {
			const empleados = await Empleado.find({ estado: 0 });
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	postEmpleados: async (req, res) => {
		try {
			const { nombre, documento, direccion, telefono, estudios, descripcion } =
				req.body;
			const empleados = new Empleado({
				nombre,
				documento,
				direccion,
				telefono,
				estudios,
				descripcion,
			});
			await empleados.save();
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	putEmpleados: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...info } = req.body;
			const empleados = await Empleado.findByIdAndUpdate(id, info, {
				new: true,
			});
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	putEmpleadosActivar: async (req, res) => {
		try {
			const { id } = req.params;
			const empleados = await Empleado.findByIdAndUpdate(
				id,
				{ estado: 1 },
				{ new: true }
			);
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
	putEmpleadosInactivar: async (req, res) => {
		try {
			const { id } = req.params;
			const empleados = await Empleado.findByIdAndUpdate(
				id,
				{ estado: 0 },
				{ new: true }
			);
			res.json({ empleados });
		} catch (error) {
			res.json({ error });
		}
	},
};

export default httpEmpleados;
