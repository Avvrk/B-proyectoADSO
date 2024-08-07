import Sustrato from "../models/elaboracion_sustratos.js";

const httpSustratos = {
    getSustratos: async (req, res) => {
        try {
            const sustratos = await Sustrato.find();
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSustratosId: async (req, res) => {
        try {
            const { id } = req.params;
            const sustratos = await Sustrato.findById(id);
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSustratosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const sustratos = await Sustrato.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSustratosProceso: async (req, res) => {
        try {
            const { id_proceso } = req.params;
            const sustratos = await Sustrato.find({ id_proceso });
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSustratosOperario: async (req, res) => {
        try {
            const { empleado_idOperario } = req.params;
            const sustratos = await Sustrato.find({ empleado_idOperario });
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSustratosResponsable: async (req, res) => {
        try {
            const { empleado_idResponsable } = req.params;
            const sustratos = await Sustrato.find({ empleado_idResponsable });
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
        }
    },
    getSustratosCultivo: async (req, res) => {
        try {
            const { tipo } = req.params;
            const sustratos = await Sustrato.find({ tipo });
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
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
            res.json({ error });
        }
    },
    putSustratos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const sustratos = await Sustrato.findByIdAndUpdate(id, info, { new: true });
            res.json({ sustratos });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpSustratos;
