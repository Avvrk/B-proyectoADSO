import Gasto from "../models/gastos.js";

const httpGastos = {
    getGastos: async (req, res) => {
        try {
            const gastos = await Gasto.find();
            res.json({ gastos });
        } catch (error) {
            res.json({ error });
        }
    },
    getGastosId: async (req, res) => {
        try {
            const { id } = req.params;
            const gastos = await Gasto.findById(id);
            res.json({ gastos });
        } catch (error) {
            res.json({ error });
        }
    },
    getGastosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const gastos = await Gasto.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ gastos });
        } catch (error) {
            res.json({ error });
        }
    },
    postGastos: async (req, res) => {
        try {
            const { nombre, fecha, numeroFactura, descripcion, total, insumos_id, semillas_id, mantenimiento_id } = req.body;
            const gastos = new Gasto({
                nombre,
                fecha,
                numeroFactura,
                descripcion,
                total,
                insumos_id,
                semillas_id,
                mantenimiento_id,
            });
            await gastos.save();
            res.json({ gastos });
        } catch (error) {
            res.json({ error });
        }
    },
    putGastos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const gastos = await Gasto.findByIdAndUpdate(id, info, { new: true });
            res.json({ gastos });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpGastos;
