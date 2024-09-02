import Plagas from "../models/control_plagas.js";

const httpPlagas = {
    getPlagas: async (req, res) => {
        try {
            const plagas = await Plagas.find().populate("id_cultivo", "nombre tipo").populate("empleado_id", "nombre documento");
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasId: async (req, res) => {
        try {
            const { id } = req.params;
            const plagas = await Plagas.findById(id);
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const plagas = await Plagas.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            }).populate("id_cultivo", "nombre tipo").populate("empleado_id", "nombre documento");
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasTipo: async (req, res) => {
        try {
            const { tipo } = req.params;
            const plagas = await Plagas.find({ tipo }).populate("id_cultivo", "nombre tipo").populate("empleado_id", "nombre documento");
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasOperario: async (req, res) => {
        try {
            const { operario } = req.params;
            const plagas = await Plagas.find({ operario }).populate("id_cultivo", "nombre tipo").populate("empleado_id", "nombre documento");
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    postPlagas: async (req, res) => {
        try {
            const { id_cultivo, empleado_id, fecha, tipoCultivo, nombre, tipo, ingredientesActivo, dosis, operario, observaciones } = req.body;
            const plagas = new Plagas({
                id_cultivo,
                fecha,
                empleado_id,
                tipoCultivo,
                nombre,
                tipo,
                ingredientesActivo,
                dosis,
                operario,
                observaciones,
            });
            await plagas.save();
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    putPlagas: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const plagas = await Plagas.findByIdAndUpdate(id, info, { new: true });
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpPlagas;
