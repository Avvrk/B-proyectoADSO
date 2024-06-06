import e from 'cors';
import Siembra from '../Models/Siembra.js';

const httpSiembras = {
        // Método para listar todas las siembras
        getSiembras: async (req, res) => {
            try {
                const siembras = await Siembra.find();
                res.json({ siembras });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar una siembra por su ID
        getSiembraPorId: async (req, res) => {
            try {
                const { id } = req.params;
                const siembra = await Siembra.findById(id);
                res.json({ siembra });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar siembras en un rango de fechas
        getSiembrasEntreFechas: async (req, res) => {
            try {
                const { fechaInicio, fechaFin } = req.body;
                const siembras = await Siembra.find({
                    fechaSiembra: { $gte: fechaInicio, $lte: fechaFin }
                });
                res.json({ siembras });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar siembras por empleado
        getSiembrasPorEmpleado: async (req, res) => {
            try {
                const { empleadoId } = req.params;
                const siembras = await Siembra.find({ empleado_id: empleadoId });
                res.json({ siembras });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar siembras por cultivo anterior
        getSiembrasPorCultivoAnterior: async (req, res) => {
            try {
                const { cultivoAnterior } = req.params;
                const siembras = await Siembra.find({ cultivoAnterior: cultivoAnterior });
                res.json({ siembras });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para crear una nueva siembra
        crearSiembra: async (req, res) => {
            try {
                const nuevaSiembra = new Siembra(req.body);
                await nuevaSiembra.save();
                res.json({ nuevaSiembra });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para modificar una siembra por su ID
        modificarSiembra: async (req, res) => {
            try {
                const { id } = req.params;
                const siembraModificada = await Siembra.findByIdAndUpdate(id, req.body, { new: true });
                res.json({ siembraModificada });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para activar una siembra por su ID
        activarSiembra: async (req, res) => {
            try {
                const { id } = req.params;
                const siembraActivada = await Siembra.findByIdAndUpdate(id, { estado: 'activo' }, { new: true });
                res.json({ siembraActivada });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para inactivar una siembra por su ID
        inactivarSiembra: async (req, res) => {
            try {
                const { id } = req.params;
                const siembraInactivada = await Siembra.findByIdAndUpdate(id, { estado: 'inactivo' }, { new: true });
                res.json({ siembraInactivada });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar siembras activas
        getSiembrasActivas: async (req, res) => {
            try {
                const siembras = await Siembra.find({ estado: 'activo' });
                res.json({ siembras });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar siembras inactivas
        getSiembrasInactivas: async (req, res) => {
            try {
                const siembras = await Siembra.find({ estado: 'inactivo' });
                res.json({ siembras });
            } catch (error) {
                res.json({ error });
            }
        }
};

export default httpSiembras;