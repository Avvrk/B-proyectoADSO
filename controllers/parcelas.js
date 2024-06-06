import Parcela from '../models/Parcelas.js';

const httpParcelas = {
    // Método para obtener todas las parcelas
    getParcelas: async (req, res) => {
        try {
            const parcelas = await Parcela.find();
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener una parcela por ID
    getParcelaId: async (req, res) => {
        try {
            const { id } = req.params;
            const parcela = await Parcela.findById(id);
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener todas las parcelas activas
    getParcelaActivos: async (req, res) => {
        try {
            const parcelas = await Parcela.find({ estado: '1' });
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener todas las parcelas inactivas
    getParcelaInactivos: async (req, res) => {
        try {
            const parcelas = await Parcela.find({ estado: '0' });
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener parcelas en un rango de fechas
    getParcelaFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const parcelas = await Parcela.find({
                createdAt: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    getPacerlaCultivo: async (req, res) => {
        
    },

    // Método para obtener parcelas por cultivo actual
    getParcelaCultivoActual: async (req, res) => {
        try {
            const { cultivo } = req.params;
            const parcelas = await Parcela.find({ cultivoActual: cultivo });
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener parcelas por asistente técnico
    getParcelaAsistente: async (req, res) => {
        try {
            const { asistente } = req.params;
            const parcelas = await Parcela.find({ asistenteTecnico: asistente });
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para agregar una nueva parcela
    postParcela: async (req, res) => {
        try {
            const { numero, ubicacionGeografica, cultivoAnterior, cultivoActual, detalle, estado, area, asistenteTecnico, id_fincas } = req.body; // Obtiene los datos de la parcela del cuerpo de la solicitud
            const parcela = new Parcela({
                numero,
                ubicacionGeografica,
                cultivoAnterior,
                cultivoActual,
                detalle,
                estado,
                area,
                asistenteTecnico,
                id_fincas
            });
            await parcela.save();
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para actualizar una parcela por ID
    putParcela: async (req, res) => {
        try {
            const { id } = req.params;
            const info = req.body;
            const parcela = await Parcela.findByIdAndUpdate(id, info, { new: true });
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para activar una parcela por ID
    putParcelaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const parcela = await Parcela.findByIdAndUpdate(id, { estado: '1' }, { new: true });
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para inactivar una parcela por ID
    putParcelaInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const parcela = await Parcela.findByIdAndUpdate(id, { estado: '0' }, { new: true });
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpParcelas;