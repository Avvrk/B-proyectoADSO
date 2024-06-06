import Mantenimiento from "../models/Mantenimiento.js";


const httpMantenimientos = {
    // Método para obtener todos los mantenimientos
    getMantenimientos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find();
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener un mantenimiento por ID
    getMantenimientosId: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findById(id);
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener todos los mantenimientos activos
    getMantenimientosActivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 1 });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener todos los mantenimientos inactivos
    getMantenimientosInactivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 0 });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener mantenimientos en un rango de fechas
    getMantenimientosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const mantenimientos = await Mantenimiento.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener mantenimientos por herramienta
    getMantenimientosHerramientas: async (req, res) => {
        try {
            const { id } = req.params;
            const herramienta = await Mantenimiento.find({ id_herramienta: id });
            res.json({ herramienta });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener mantenimientos por responsable
    getMantenimientosResponsable: async (req, res) => {
        try {
            const { persona } = req.params;
            const responsable = await Mantenimiento.find({ responsable: persona });
            res.json({ responsable });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para agregar un nuevo mantenimiento
    postMantenimiento: async (req, res) => {
        try {
            const { gastos_id, id_herramienta, fecha, verificacionRealizada, calibracion, responsable, observaciones, estado } = req.body;
            const mantenimientos = new Mantenimiento({
                gastos_id,
                id_herramienta,
                fecha,
                verificacionRealizada,
                calibracion,
                responsable,
                observaciones,
                estado
            });
            await mantenimientos.save();
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para actualizar un mantenimiento por ID
    putMantenimiento: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, ...info, { new: true });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para activar un mantenimiento por ID
    putMantenimientoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ mantenimientos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para inactivar un mantenimiento por ID
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