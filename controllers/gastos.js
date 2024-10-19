import Gasto from "../models/gastos.js";

const httpGastos = {
	getGastos: async (req, res) => {
		try {
			const gastos = await Gasto.find()
				.populate("fincas_id", "nombre") // Poblar fincas_id con el campo 'nombre' (opcional, si lo quieres)
				.populate("insumos.id_proveedor", "nombre") // Poblar 'insumos.id_proveedor' con el campo 'nombre'
				.populate("insumos.id_insumos", "nombre") // Poblar 'insumos.id_insumos' con el campo 'nombre'
				.populate("semillas.id_proveedor", "nombre") // Poblar 'semillas.id_proveedor' con el campo 'nombre'
				.populate("semillas.id_semilla", "especieVariedad origen") // Poblar 'semillas.id_semilla' con 'especieVariedad' y 'origen'
				.exec();

			res.json({ gastos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
	getGastosId: async (req, res) => {
		try {
			const { id } = req.params;
			const gastos = await Gasto.findById(id);
			res.json({ gastos });
		} catch (error) {
			res.json({ err: error.message });
		}
	},
	getGastosFechas: async (req, res) => {
		try {
			const { fechaInicio, fechaFin } = req.params;
			const fechaInicioObj = new Date(fechaInicio);
			const fechaFinObj = new Date(fechaFin);
			const gastos = await Gasto.find({
				fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
			})
				.populate("fincas_id", "nombre") // Poblar fincas_id con el campo 'nombre' (opcional, si lo quieres)
				.populate("insumos.id_proveedor", "nombre") // Poblar 'insumos.id_proveedor' con el campo 'nombre'
				.populate("insumos.id_insumos", "nombre") // Poblar 'insumos.id_insumos' con el campo 'nombre'
				.populate("semillas.id_proveedor", "nombre") // Poblar 'semillas.id_proveedor' con el campo 'nombre'
				.populate("semillas.id_semilla", "especieVariedad origen") // Poblar 'semillas.id_semilla' con 'especieVariedad' y 'origen'
				.exec();

            res.json({ gastos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    postGastos: async (req, res) => {
        try {
            const {
                nombre,
                fincas_id,
                fecha,
                codigo,
                descripcion,
                total,
                insumos,
                semillas,
            } = req.body;
            const gastos = new Gasto({
                nombre,
                fincas_id,
                fecha,
                codigo,
                descripcion,
                total,
                insumos,
                semillas,
            });
            await gastos.save();
            res.json({ gastos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    putGastos: async (req, res) => {
        try {
            const { id } = req.params;
            const { insumos, semillas, ...info } = req.body;
            if (insumos && insumos.id_proveedor != null) {
                info.total = insumos.total;
                info.insumos = insumos;
            }
            if (semillas && semillas.id_proveedor != null) {
                info.total = semillas.total;
                info.semillas = semillas;
            }
            
            const gastos = await Gasto.findByIdAndUpdate(id, info, {
                new: true,
            });

            res.json({ gastos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
};

export default httpGastos;
