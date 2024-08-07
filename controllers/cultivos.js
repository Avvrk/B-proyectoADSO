import Cultivo from "../models/cultivos.js";

const httpCultivos = {
    getCultivos: async (req, res) => {
        try {
            const cultivos = await Cultivo.find();
            res.json({ cultivos });
        } catch (error) {
            res.json({ error });
        }
    },
    getCultivosId: async (req, res) => {
        try {
            const { id } = req.params;
            const cultivos = await Cultivo.findById(id);
            res.json({ cultivos });
        } catch (error) {
            res.json({ error });
        }
    },
    getCultivosTipo: async (req, res) => {
        try {
            const { tipo } = req.params;
            const cultivos = await Cultivo.find({ tipo });
            res.json({ cultivos });
        } catch (error) {
            res.json({ error });
        }
    },
    getCultivosParcela: async (req, res) => {
        try {
            const { id_parcela } = req.params;
            const cultivos = await Cultivo.find({ id_parcela });
            res.json({ cultivos });
        } catch (error) {
            res.json({ error });
        }
    },
    postCultivos: async (req, res) => {
        try {
            const { nombre, tipo, id_parcela } = req.body;
            const cultivos = new Cultivo({
                nombre,
                tipo,
                id_parcela,
            });
            await cultivos.save();
            res.json({ cultivos });
        } catch (error) {
            res.json({ error });
        }
    },
    putCultivos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const cultivos = await Cultivo.findByIdAndUpdate(id, info, { new: true });
            res.json({ cultivos });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpCultivos;
