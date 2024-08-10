import Mantenimiento from "../models/mantenimiento.js";


const httpMantenimientos = {
    getMantenimientos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find();
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    getMantenimientosId: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findById(id);
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    getMantenimientosActivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 1 });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    getMantenimientosInactivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 0 });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    getMantenimientosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const mantenimiento = await Mantenimiento.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ mantenimiento });
        } catch (error) {
            res.json({ error });
        }
    },

    getMantenimientosHerramientas: async (req, res) => {
        try {
            const { id } = req.params;
            const herramienta = await Mantenimiento.find({ id_herramienta: id });
            res.json({ herramienta });
        } catch (error) {
            res.json({ error });
        }
    },

    getMantenimientosResponsable: async (req, res) => {
        try {
            const { persona } = req.params;
            const responsable = await Mantenimiento.find({ responsable: persona });
            res.json({ responsable });
        } catch (error) {
            res.json({ error });
        }
    },

    postMantenimiento: async (req, res) => {
        try {
            const { gastos_id, id_herramienta, fecha, verificacionRealizada, calibracion, responsable, observaciones } = req.body;
            const mantenimientos = new Mantenimiento({
                gastos_id,
                id_herramienta,
                fecha,
                verificacionRealizada,
                calibracion,
                responsable,
                observaciones
            });
            await mantenimientos.save();
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    putMantenimiento: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, info, { new: true });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    putMantenimientoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    putMantenimientoInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpMantenimientos;