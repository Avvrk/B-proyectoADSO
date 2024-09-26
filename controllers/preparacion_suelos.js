import PreparacionS from "../models/preparacion_suelos.js";

const httpPreparacionSuelos = {
    getPreparacionSue: async (req, res) => {
        try {
            const preparaciones = await PreparacionS.find();
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },
    getPrepacionSueID: async (req, res) => {
        try {
            const { id } = req.params;
            const preparacionSue = await PreparacionS.findById(id);
            res.json({ preparacionSue });
        } catch (error) {
            res.json({ error });
        }
    },
/* 
    getPreparacionSuePorcentaje: async (req, res) => {
        try {
            const totalPreparaciones = await PreparacionS.countDocuments();
            const totalPreparacionesActivas = await PreparacionS.countDocuments({ estado: 1 });
            const porcentaje = (totalPreparacionesActivas / totalPreparaciones) * 100;
            res.json({ porcentaje });
        } catch (error) {
            res.json({ error });
        }
    }, */

    getPreparacionSueActivos: async (req, res) => {
        try {
            const preparaciones = await PreparacionS.find({ estado: 1 });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    getPreparacionSueInactivos: async (req, res) => {
        try {
            const preparaciones = await PreparacionS.find({ estado: 0 });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    getPreparacionSueFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const preparaciones = await PreparacionS.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    getPreparacionSueResponsable: async (req, res) => {
        try {
            const { responsable } = req.params;
            const resultado = responsable
            .toLowerCase()
            .replace("-", " ")
            .replace(/(?:^|\s|[-])\S/g, (char) => char.toUpperCase());
                console.log(resultado);
                
            const preparaciones = await PreparacionS.find({ responsable: resultado });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    postPreparacionSue: async (req, res) => {
        try {
            const { fecha, id_parcela, empleado_id, productos, ingredienteActivo, dosis, metodoAplicacion, operario, responsable, observaciones, estado } = req.body;
            const preparaciones = new PreparacionS({
                fecha,
                id_parcela,
                empleado_id,
                productos,
                ingredienteActivo,
                dosis,
                metodoAplicacion,
                operario,
                responsable,
                observaciones,
                estado,
            });
            await preparaciones.save();
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    putPreparacionSue: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const preparaciones = await PreparacionS.findByIdAndUpdate(id, info, { new: true });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    putPreparacionSueActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const preparaciones = await PreparacionS.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    putPreparacionSueInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const preparaciones = await PreparacionS.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpPreparacionSuelos;
