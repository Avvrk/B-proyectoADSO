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
    getSiembraId: async (req, res) => {
        try {
            const { id } = req.params;
            const siembra = await Siembra.findById(id);
            res.json({ siembra });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar siembras en un rango de fechas
    getSiembrasFechas: async (req, res) => {
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
    getSiembraEmpleado: async (req, res) => {
        try {
            const { empleadoId } = req.params;
            const siembras = await Siembra.find({ empleado_id: empleadoId });
            res.json({ siembras });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar siembras por cultivo anterior
    getSiembraCultivoAnterior: async (req, res) => {
        try {
            const { cultivoAnterior } = req.params;
            const siembras = await Siembra.find({ cultivoAnterior: cultivoAnterior });
            res.json({ siembras });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar siembras activas
    getSiembrasActivas: async (req, res) => {
        try {
            const siembras = await Siembra.find({ estado: 1 });
            res.json({ siembras });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar siembras inactivas
    getSiembrasInactivas: async (req, res) => {
        try {
            const siembras = await Siembra.find({ estado: 0 });
            res.json({ siembras });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para crear una nueva siembra
    postSiembra: async (req, res) => {
        try {
            const { id_cultivo, empleado_id, fechaSiembra, fechaCosecha, transplante, cultivoAnterior, inventario_id, estado } = req.body;
            const siembra = new Siembra({
                id_cultivo,
                empleado_id,
                fechaSiembra,
                fechaCosecha,
                transplante,
                cultivoAnterior,
                inventario_id,
                estado
            });
            await siembra.save();
            res.json({ siembra });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para modificar una siembra por su ID
    putSiembra: async (req, res) => {
        try {
            const { id } = req.params;
            const info = req.body;
            const siembra = await Siembra.findByIdAndUpdate(id, info, { new: true });
            res.json({ siembra });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para activar una siembra por su ID
    putSiembraActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const siembraActivada = await Siembra.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ siembraActivada });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para inactivar una siembra por su ID
    putSiembraInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const siembraInactivada = await Siembra.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ siembraInactivada });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpSiembras;