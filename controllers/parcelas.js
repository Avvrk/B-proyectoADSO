import Parcela from '../models/parcelas.js';

const httpParcelas = {
    getParcelas: async (req, res) => {
        try {
            const parcelas = await Parcela.find().populate("id_fincas", "nombre rut");
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    getParcelaId: async (req, res) => {
        try {
            const { id } = req.params;
            const parcela = await Parcela.findById(id);
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    },

    getParcelaActivos: async (req, res) => {
        try {
            const parcelas = await Parcela.find({ estado: 1 }).populate("id_fincas", "nombre rut");
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    getParcelaInactivos: async (req, res) => {
        try {
            const parcelas = await Parcela.find({ estado: 0 }).populate("id_fincas", "nombre rut");
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

   

    getParcelaCultivoActual: async (req, res) => {
        try {
            const { cultivo } = req.params;
            const parcelas = await Parcela.find({ cultivoActual: cultivo }).populate("id_fincas", "nombre rut");
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    getParcelaAsistente: async (req, res) => {
        try {
            const { asistente } = req.params;
            const resultado = asistente
           .toLowerCase()
           .replace("-", " ")
           .replace(/(?:^|\s|[-])\S/g, (char) => char.toUpperCase());
            const parcelas = await Parcela.find({ asistenteTecnico:resultado }).populate("id_fincas", "nombre rut");
            res.json({ parcelas });
        } catch (error) {
            res.json({ error });
        }
    },

    postParcela: async (req, res) => {
        try {
            const { numero, ubicacionGeografica, cultivoAnterior, cultivoActual, descripcion, estado, area, asistenteTecnico, id_fincas } = req.body; // Obtiene los datos de la parcela del cuerpo de la solicitud
            const parcela = new Parcela({
                numero,
                ubicacionGeografica,
                cultivoAnterior,
                cultivoActual,
                descripcion,
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

    putParcela: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const parcela = await Parcela.findByIdAndUpdate(id, info, { new: true });
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    },

    putParcelaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const parcela = await Parcela.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    },

    putParcelaInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const parcela = await Parcela.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ parcela });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpParcelas;