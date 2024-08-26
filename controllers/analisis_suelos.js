import Suelo from "../models/analisis_suelos.js";

const httpSuelos = {
    getSuelos: async (req, res) => {
        try {
            const suelos = await Suelo.find().populate({ path: "id_parcela", select: "numero id_fincas", populate: { path: "id_fincas", select: "nombre"}}).populate("empleado_id", "nombre documento");
            res.json({ suelos });
        } catch (error) {
            res.json({ err: error.message });
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
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const suelos = await Suelo.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            }).populate({ path: "id_parcela", select: "numero id_fincas", populate: { path: "id_fincas", select: "nombre"}}).populate("empleado_id", "nombre documento");
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSuelosResponsables: async (req, res) => {
        try {
            const { empleado_id } = req.params;
            const suelos = await Suelo.find({ empleado_id }).populate({ path: "id_parcela", select: "numero id_fincas", populate: { path: "id_fincas", select: "nombre"}}).populate("empleado_id", "nombre documento");
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSuelosActivos: async (req, res) => {
        try {
            const suelos = await Suelo.find({ estado: 1 }).populate({ path: "id_parcela", select: "numero id_fincas", populate: { path: "id_fincas", select: "nombre"}}).populate("empleado_id", "nombre documento");
            res.json({ suelos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSuelosInactivos: async (req, res) => {
        try {
            const suelos = await Suelo.find({ estado: 0 }).populate({ path: "id_parcela", select: "numero id_fincas", populate: { path: "id_fincas", select: "nombre"}}).populate("empleado_id", "nombre documento");
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
