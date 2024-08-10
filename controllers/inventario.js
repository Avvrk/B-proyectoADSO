import Inventario from "../models/inventario.js";

const httpInventarios = {
    getInventario: async (req, res) => {
        try {
            const inventario = await Inventario.find();
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    getInventarioId: async (req, res) => {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findById(id);
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },
    getInventarioFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const inventarios = await Inventario.find({ fecha: { $gte: fechaInicioObj, $lte: fechaFinObj } });
            res.json({ inventarios })
        } catch (error) {
            res.json({ error });
        }
    },
    getInventarioTotal: async (req, res) => {
        try {
            const inventarioTotal = await Inventario.find();
            const total = inventarioTotal.reduce((acc, item) => { return acc + item.valor }, 0);
            res.json({ total: total });
        } catch (error) {
            res.json({ error });
        }
    },

    getInventarioActivos: async (req, res) => {
        try {
            const inventario = await Inventario.find({ estado: 1 });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    getInventarioInactivos: async (req, res) => {
        try {
            const inventario = await Inventario.find({ estado: 0 });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    getInventarioCantidades: async (req, res) => {
        try {
            const { id } = req.params;
            const cantidad = await Inventario.findById(id);
            const r = cantidad.cantidad;
            res.json({ r });
        } catch (error) {
            res.json({ error });
        }
    },

    postInventario: async (req, res) => {
        try {
            const { tipo, observacion, unidad, cantidad, fecha, semillas_id, insumos_id, maquinaria_id } = req.body;
            const inventario = new Inventario({
                tipo,
                observacion,
                unidad,
                cantidad,
                fecha,
                semillas_id,
                insumos_id,
                maquinaria_id
            });
            await inventario.save();
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    putInventario: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const inventario = await Inventario.findByIdAndUpdate(id, info, { new: true });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    putInventarioActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    putInventarioInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpInventarios;