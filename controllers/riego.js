import Riego from '../models/riego.js';

const httpRiegos = {
    getRiegos: async (req, res) => {
        try {
            const riegos = await Riego.find().populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    getRiegoId: async (req, res) => {
        try {
            const { id } = req.params;
            const riego = await Riego.findById(id).populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            res.json({ riego });
        } catch (error) {
            res.json({ error });
        }
    },
    getRiegosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const riegos = await Riego.find({
                fecha: { $gte: fechaInicio, $lte: fechaFin }
            }).populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    getRiegosEmpleado: async (req, res) => {
        try {
            const { empleado_id } = req.params;
            const riegos = await Riego.find({ empleado_id }).populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    getRiegosPorCultivo: async (req, res) => {
        try {
            const { cultivo_id } = req.params;
            const riegos = await Riego.find({ cultivo_id }).populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    getCantidadAguaPorCultivo: async (req, res) => {
        try {
            const { cultivo_id } = req.params;
            const riegos = await Riego.find({ cultivo_id }).populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            const cantidadAguaTotal = riegos.reduce((total, riego) => total + riego.cantidad_agua, 0);
            res.json({ cantidadAguaTotal });
        } catch (error) {
            res.json({ error });
        }
    },
    getRiegosActivos: async (req, res) => {
        try {
            const riegos = await Riego.find({ estado: 1 }).populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    getRiegosInactivos: async (req, res) => {
        try {
            const riegos = await Riego.find({ estado: 0 }).populate("cultivo_id", "nombre").populate("empleado_id", "nombre")
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    postRiego: async (req, res) => {
        try {
            const { cultivo_id, empleado_id, fecha, dias_transplante, estado_fenologico, hora_inicio, hora_fin, dosis, cantidad_agua, estado } = req.body;
    
            // Crear una nueva instancia del modelo Riego
            const riego = new Riego({
                cultivo_id,
                empleado_id,
                fecha,
                dias_transplante,
                estado_fenologico,
                hora_inicio,
                hora_fin,
                dosis,
                cantidad_agua,
                estado
            });
    
            // Guardar la instancia en la base de datos
            await riego.save();
    
            // Responder con el riego guardado
            res.json({ riego });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putRiego: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const riego = await Riego.findByIdAndUpdate(id, info, { new: true });
            res.json({ riego });
        } catch (error) {
            res.json({ error });
        }
    },
    putRiegoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const riego = await Riego.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ riego });
        } catch (error) {
            res.json({ error });
        }
    },
    putRiegoInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const riego = await Riego.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ riego });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpRiegos;