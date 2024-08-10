import Comprador from "../models/comprador.js";

const httpCompradores = {
    getCompradores: async (req, res) => {
        try {
            const compradores = await Comprador.find();
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    getCompradoresId: async (req, res) => {
        try {
            const { id } = req.params;
            const compradores = await Comprador.findById(id);
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    getCompradoresFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const compradores = await Comprador.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    getCompradoresCompras: async (req, res) => {
        try {
            const { documento } = req.params;
            const compradores = await Comprador.find({ documento });
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    getCompradoresActivos: async (req, res) => {
        try {
            const compradores = await Comprador.find({ estado: 1 });
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    getCompradoresInactivos: async (req, res) => {
        try {
            const compradores = await Comprador.find({ estado: 0 });
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    postCompradores: async (req, res) => {
        try {
            const { _id_produccion, fecha, especie, nombre, documento, telefono, cantidad, numeroGuiaTransporte, numeroLoteComercial, total, estado } = req.body;
            const compradores = new Comprador({
                _id_produccion,
                fecha,
                especie,
                nombre,
                documento,
                telefono,
                cantidad,
                numeroGuiaTransporte,
                numeroLoteComercial,
                total,
                estado
            });
            await compradores.save();
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    putCompradores: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const compradores = await Comprador.findByIdAndUpdate(id, info, { new: true });
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    putCompradoresActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const compradores = await Comprador.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
    putCompradoresInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const compradores = await Comprador.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ compradores });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpCompradores;
