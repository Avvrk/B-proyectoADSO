import PreparacionS from '../Models/preparacion_suelos.js';

const httpPreparacionSuelos = {
    // Método para obtener todas las preparaciones de suelos
    getPreparacionSue: async (req, res) => {
        try {
            const preparaciones = await PreparacionS.find();
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    getPrepacionSueID: async (req, res) => {
        
    },

    // Método para obtener el porcentaje de preparaciones activas
    getPreparacionSuePorcentaje: async (req, res) => {
        try {
            const totalPreparaciones = await PreparacionS.countDocuments();
            const totalPreparacionesActivas = await PreparacionS.countDocuments({ estado: 1 });
            const porcentaje = (totalPreparacionesActivas / totalPreparaciones) * 100;
            res.json({ porcentaje });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener todas las preparaciones de suelos activas
    getPreparacionSueActivos: async (req, res) => {
        try {
            const preparaciones = await PreparacionS.find({ estado: 1 });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener todas las preparaciones de suelos inactivas
    getPreparacionSueInactivos: async (req, res) => {
        try {
            const preparaciones = await PreparacionS.find({ estado: 0 });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener preparaciones de suelos en un rango de fechas
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

    // Método para obtener preparaciones de suelos por responsable
    getPreparacionSueResponsable: async (req, res) => {
        try {
            const { Responsable } = req.params;
            const preparaciones = await PreparacionS.find({ responsable: Responsable });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para agregar una nueva preparación de suelos
    postPreparacionSue: async (req, res) => {
        try {
            const { fecha, id_parcela, empleado_id, productos, ingredienteActivo, dosis, metodoAplicacion, operario, responsable, observaciones, estado } = req.body; // Obtiene los datos de la preparación de suelos del cuerpo de la solicitud
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
                estado
            });
            await preparaciones.save();
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para actualizar una preparación de suelos por ID
    putPreparacionSue: async (req, res) => {
        try {
            const { id } = req.params;
            const info = req.body;
            const preparaciones = await PreparacionS.findByIdAndUpdate(id, info, { new: true });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para activar una preparación de suelos por ID
    putPreparacionSueActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const preparaciones = await PreparacionS.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para inactivar una preparación de suelos por ID
    putPreparacionSueInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const preparaciones = await PreparacionS.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ preparaciones });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpPreparacionSuelos;