import Sustrato from "../models/elaboracion_sustratos.js";

const httpSustratos = {
    getSustratos: async (req, res) => {
        try {
            const sustratos = await Sustrato.find().populate("id_proceso", "tipo").populate("empleado_idOperario", "nombre correo").populate("empleado_idResponsable", "nombre correo");
            res.json({ sustratos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getSustratosId: async (req, res) => {
        try {
            const { id } = req.params;
            const sustratos = await Sustrato.findById(id);
            res.json({ sustratos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getSustratosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const sustratos = await Sustrato.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            }).populate("id_proceso", "tipo").populate("empleado_idOperario", "nombre correo").populate("empleado_idResponsable", "nombre correo");
            res.json({ sustratos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getSustratosProceso: async (req, res) => {
        try {
            const { id_proceso } = req.params;
            const sustratos = await Sustrato.find({ id_proceso });
            res.json({ sustratos }).populate("id_proceso", "tipo").populate("empleado_idOperario", "nombre correo").populate("empleado_idResponsable", "nombre correo");
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getSustratosOperario: async (req, res) => {
        try {
            const { empleado_idOperario } = req.params;
            const sustratos = await Sustrato.find({ empleado_idOperario }).populate("id_proceso", "tipo").populate("empleado_idOperario", "nombre correo").populate("empleado_idResponsable", "nombre correo");
            res.json({ sustratos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getSustratosResponsable: async (req, res) => {
        try {
            const { empleado_idResponsable } = req.params;
            const sustratos = await Sustrato.find({ empleado_idResponsable }).populate("id_proceso", "tipo").populate("empleado_idOperario", "nombre correo").populate("empleado_idResponsable", "nombre correo");
            res.json({ sustratos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    postSustratos: async (req, res) => {
        try {
            const { id_proceso, fecha, productoComercial, ingredienteActivo, dosisUtilizada, metodoAplicacion, empleado_idOperario, empleado_idResponsable, observaciones } = req.body;
            const sustratos = new Sustrato({
                id_proceso,
                fecha,
                productoComercial,
                ingredienteActivo,
                dosisUtilizada,
                metodoAplicacion,
                empleado_idOperario,
                empleado_idResponsable,
                observaciones,
            });
            await sustratos.save();
            res.json({ sustratos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    putSustratos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const sustratos = await Sustrato.findByIdAndUpdate(id, info, { new: true });
            res.json({ sustratos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
};

export default httpSustratos;
