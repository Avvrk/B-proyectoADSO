import Riego from '../Models/Riego.js';

// CRUD
// Listar riegos
// Listar riegos ID
// Listar entre fechas
// Listar por empleado
// Listar por cultivo
// Listar por cantidad de agua (Litros) usada en el riego
// Listar activos
// Listar inactivos
// Crear riego
// Modificar riego
// Activar
// Inactivar


const httpRiegos = {
    // Método para listar todos los riegos
    getRiegos: async (req, res) => {
        try {
            const riegos = await Riego.find();
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar un riego por su ID
    getRiegoId: async (req, res) => {
        try {
            const { id } = req.params;
            const riego = await Riego.findById(id);
            res.json({ riego });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar riegos en un rango de fechas
    getRiegosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const riegos = await Riego.find({
                fecha: { $gte: fechaInicio, $lte: fechaFin }
            });
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar riegos por el ID de empleado
    getRiegosEmpleado: async (req, res) => {
        try {
            const { empleado_id } = req.params;
            const riegos = await Riego.find({ empleado_id });
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar riegos por cultivo
    getRiegosPorCultivo: async (req, res) => {
        try {
            const { cultivo_id } = req.params;
            const riegos = await Riego.find({ cultivo_id });
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar la cantidad de agua usada en un cultivo
    getCantidadAguaPorCultivo: async (req, res) => {
        try {
            const { cultivo_id } = req.params;
            const riegos = await Riego.find({ cultivo_id });
            const cantidadAguaTotal = riegos.reduce((total, riego) => total + riego.cantidad_agua, 0);
            res.json({ cantidadAguaTotal });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar riegos activos
    getRiegosActivos: async (req, res) => {
        try {
            const riegos = await Riego.find({ estado: 1 });
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar riegos inactivos
    getRiegosInactivos: async (req, res) => {
        try {
            const riegos = await Riego.find({ estado: 0 });
            res.json({ riegos });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para crear un nuevo riego
    postRiego: async (req, res) => {
        try {
            const { cultivo_id, empleado_id, fecha, dias_transplante, estado_fenologico, hora_inicio, hora_fin, dosis, cantidad_agua, estado } = req.body;
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
            await Riego.save();
            res.json({ riego })
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para modificar un riego por su ID
    putRiego: async (req, res) => {
        try {
            const { id } = req.params;
            const info = req.body;
            const riego = await Riego.findByIdAndUpdate(id, info, { new: true });
            res.json({ riego });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para activar un riego por su ID
    putRiegoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const riego = await Riego.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ riego });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para inactivar un riego por su ID
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