import Semilla from '../Models/Semillas.js';

const httpSemillas = {
        // Método para listar todas las semillas
        getSemillas: async (req, res) => {
            try {
                const semillas = await Semilla.find();
                res.json({ semillas });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar una semilla por su ID
        getSemillaById: async (req, res) => {
            try {
                const { id } = req.params;
                const semilla = await Semilla.findById(id);
                res.json({ semilla });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar semillas en un rango de fechas
        getSemillasEntreFechas: async (req, res) => {
            try {
                const { fechaInicio, fechaFin } = req.body;
                const semillas = await Semilla.find({
                    fechaCompra: { $gte: fechaInicio, $lte: fechaFin }
                });
                res.json({ semillas });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar semillas por proveedor
        getSemillasPorProveedor: async (req, res) => {
            try {
                const { proveedor_id } = req.params;
                const semillas = await Semilla.find({ proveedor_id });
                res.json({ semillas });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para crear una nueva semilla
        crearSemilla: async (req, res) => {
            try {
                const nuevaSemilla = new Semilla(req.body);
                await nuevaSemilla.save();
                res.json({ nuevaSemilla });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para modificar una semilla por su ID
        modificarSemilla: async (req, res) => {
            try {
                const { id } = req.params;
                const semillaActualizada = await Semilla.findByIdAndUpdate(id, req.body, { new: true });
                res.json({ semillaActualizada });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para activar una semilla por su ID
        activarSemilla: async (req, res) => {
            try {
                const { id } = req.params;
                const semillaActivada = await Semilla.findByIdAndUpdate(id, { estado: 'activo' }, { new: true });
                res.json({ semillaActivada });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para inactivar una semilla por su ID
        inactivarSemilla: async (req, res) => {
            try {
                const { id } = req.params;
                const semillaInactivada = await Semilla.findByIdAndUpdate(id, { estado: 'inactivo' }, { new: true });
                res.json({ semillaInactivada });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar semillas activas
        getSemillasActivas: async (req, res) => {
            try {
                const semillas = await Semilla.find({ estado: 'activo' });
                res.json({ semillas });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar semillas inactivas
        getSemillasInactivas: async (req, res) => {
            try {
                const semillas = await Semilla.find({ estado: 'inactivo' });
                res.json({ semillas });
            } catch (error) {
                res.json({ error });
            }
        }
};

export default httpSemillas;