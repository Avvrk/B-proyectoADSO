import MaquinariaH from '../models/maquinaria_herramientas.js';

const httpMaquinariaHerramientas = {
    getMaquinariaH: async (req, res) => {
        try {
            const maquinariaH = await MaquinariaH.find();
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    getMaquinariaHId: async (req, res) => {
        try {
            const { id } = req.params;
            const maquinariaH = await MaquinariaH.findById(id);
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    getMaquinariaHActivos: async (req, res) => {
        try {
            const maquinariaH = await MaquinariaH.find({ estado: 1 });
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    getMaquinariaHInactivos: async (req, res) => {
        try {
            const maquinariaH = await MaquinariaH.find({ estado: 0 });
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    getMaquinariaHFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const maquinariaH = await MaquinariaH.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    getMaquinariaHCantidad: async (req, res) => {
        try {
            const { tipo } = req.params;
            const cantidad = await MaquinariaH.countDocuments({ tipo: tipo });
            res.json({ cantidad });
        } catch (error) {
            res.json({ error });
        }
    },

    getMaquinariaHTotal: async (req, res) => {
        try {
            const maquinariaHTotal = await MaquinariaH.find();
            const total = maquinariaHTotal.reduce((acc, item) => { return acc + item.valor; }, 0);
            res.json({ total: total });
        } catch (error) {
            res.json({ error });
        }
    },

    postMaquinariaH: async (req, res) => {
        try {
            const { proveedores_id, nombre, tipo, fechaCompra, observaciones, cantidad, total, estado } = req.body;
            const maquinariaH = new MaquinariaH({
                proveedores_id,
                nombre,
                tipo,
                fechaCompra,
                observaciones,
                cantidad,
                total,
                estado
            });
            await maquinariaH.save();
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    putMaquinariaH: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const maquinariaH = await MaquinariaH.findByIdAndUpdate(id, ...info, { new: true });
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    putMaquinariaHActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const maquinariaH = await MaquinariaH.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    },

    putMaquinariaHInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const maquinariaH = await MaquinariaH.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ maquinariaH });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpMaquinariaHerramientas;