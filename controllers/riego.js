import Riego from '../Models/Riego.js';

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
        getRiegoById: async (req, res) => {
            try {
                const { id } = req.params;
                const riego = await Riego.findById(id);
                res.json({ riego });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar riegos en un rango de fechas
        getRiegosEntreFechas: async (req, res) => {
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
    
        // Método para listar riegos por empleado
        getRiegosPorEmpleado: async (req, res) => {
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
    
        // Método para crear un nuevo riego
        crearRiego: async (req, res) => {
            try {
                const nuevoRiego = new Riego(req.body);
                await nuevoRiego.save();
                res.json({ nuevoRiego });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para modificar un riego por su ID
        modificarRiego: async (req, res) => {
            try {
                const { id } = req.params;
                const riegoActualizado = await Riego.findByIdAndUpdate(id, req.body, { new: true });
                res.json({ riegoActualizado });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para activar un riego por su ID
        activarRiego: async (req, res) => {
            try {
                const { id } = req.params;
                const riegoActivado = await Riego.findByIdAndUpdate(id, { estado: 'activo' }, { new: true });
                res.json({ riegoActivado });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para inactivar un riego por su ID
        inactivarRiego: async (req, res) => {
            try {
                const { id } = req.params;
                const riegoInactivado = await Riego.findByIdAndUpdate(id, { estado: 'inactivo' }, { new: true });
                res.json({ riegoInactivado });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar riegos activos
        getRiegosActivos: async (req, res) => {
            try {
                const riegos = await Riego.find({ estado: 'activo' });
                res.json({ riegos });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar riegos inactivos
        getRiegosInactivos: async (req, res) => {
            try {
                const riegos = await Riego.find({ estado: 'inactivo' });
                res.json({ riegos });
            } catch (error) {
                res.json({ error });
            }
        }
};

export default httpRiegos;