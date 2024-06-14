import Suelo from "../models/Analisis_suelos.js";

const httpSuelos = {
    getSuelos: async (req, res) => {
        try {
            const suelos = await Suelo.find();
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSuelosId: async (req, res) => {
        try {
            const { id } = req.params;
            const suelos = await Suelo.findById(id);
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSualosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const suelos = await Suelo.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    }, //incognito
    getSuelosPorcentajes: async (req, res) => {
        try {
            const suelos = await Suelo.countDocuments();
            const suelosActivos = await Suelo.countDocuments({ estado: 1 });
            const porcentaje = (suelosActivos / suelos) * 100;
            res.json({ porcentaje });
        } catch (error) {
            res.json({ error });
        }
    },
    getSuelosActivos: async (req, res) => {
        try {
            const suelos = await Suelo.find({ estado: 1 });
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSuelosInactivos: async (req, res) => {
        try {
            const suelos = await Suelo.find({ estado: 0 });
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    postSuelos: async (req, res) => {
        try {
            const { fecha, id_parcela, empleado_id, muestra, cultivo, laboratorio, resultados, recomendaciones } = req.body;
            const suelos = new Suelo({
                fecha,
                id_parcela,
                empleado_id,
                muestra,
                cultivo,
                laboratorio,
                resultados,
                recomendaciones,
            });
            await suelos.save();
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    putSuelos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const suelos = await Suelo.findByIdAndUpdate(id, info, { new: true });
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    putSuelosActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const suelos = await Suelo.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    putSuelosInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const suelos = await Suelo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpSuelos;
