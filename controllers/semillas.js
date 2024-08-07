import Semilla from '../models/semillas.js';

const httpSemillas = {
    getSemillas: async (req, res) => {
        try {
            const semillas = await Semilla.find();
            res.json({ semillas });
        } catch (error) {
            res.json({ error });
        }
    },
    getSemillaId: async (req, res) => {
        try {
            const { id } = req.params;
            const semilla = await Semilla.findById(id);
            res.json({ semilla });
        } catch (error) {
            res.json({ error });
        }
    },
    getSemillasFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const semillas = await Semilla.find({
                fechaCompra: { $gte: fechaInicio, $lte: fechaFin }
            });
            res.json({ semillas });
        } catch (error) {
            res.json({ error });
        }
    },
    getSemillasProveedor: async (req, res) => {
        try {
            const { proveedor_id } = req.params;
            const semillas = await Semilla.find({ proveedor_id });
            res.json({ semillas });
        } catch (error) {
            res.json({ error });
        }
    },
    getSemillasActivas: async (req, res) => {
        try {
            const semillas = await Semilla.find({ estado: 1 });
            res.json({ semillas });
        } catch (error) {
            res.json({ error });
        }
    },
    getSemillasInactivas: async (req, res) => {
        try {
            const semillas = await Semilla.find({ estado: 0 });
            res.json({ semillas });
        } catch (error) {
            res.json({ error });
        }
    },
    postSemilla: async (req, res) => {
        try {
            const { proveedor_id, numFactura, fechaCompra, fechaVencimiento, especieVariedad, proveedorSemilla, numeroLote, origen, poderGerminativo, observaciones, unidad, total, estado } = req.body;
            const semilla = new Semilla({
                proveedor_id,
                numFactura,
                fechaCompra,
                fechaVencimiento,
                especieVariedad,
                proveedorSemilla,
                numeroLote,
                origen,
                poderGerminativo,
                observaciones,
                unidad,
                total,
                estado
            });
            await Semilla.save();
            res.json({ semilla })
        } catch (error) {
            res.json({ error });
        }
    },
    putSemilla: async (req, res) => {
        try {
            const { id } = req.params;
            const info = req.body;
            const semilla = await Semilla.findByIdAndUpdate(id, info, { new: true });
            res.json({ semilla });
        } catch (error) {
            res.json({ error });
        }
    },
    putSemillaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const semillaActivada = await Semilla.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ semillaActivada });
        } catch (error) {
            res.json({ error });
        }
    },
    putSemillaInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const semillaInactivada = await Semilla.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ semillaInactivada });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpSemillas;