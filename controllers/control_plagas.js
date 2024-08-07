import Plagas from "../models/control_plagas.js";

const httpPlagas = {
    getPlagas: async (req, res) => {
        try {
            const plagas = await Plagas.find();
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
            });
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasTipo: async (req, res) => {
        try {
            const { tipo } = req.params;
            const plagas = await Plagas.find({ tipo });
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasOperario: async (req, res) => {
        try {
            const { operario_id } = req.params;
            const plagas = await Plagas.find({ operario_id });
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasActivos: async (req, res) => {
        try {
            const plagas = await Plagas.find({ estado: 1 });
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    getPlagasInactivos: async (req, res) => {
        try {
            const plagas = await Plagas.find({ estado: 0 });
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
    putPlagasActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const plagas = await Plagas.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
    putPlagasInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const plagas = await Plagas.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ plagas });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpPlagas;
