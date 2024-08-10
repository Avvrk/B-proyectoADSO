import Nomina from '../models/nomina.js'

const httpNominas = {
    getNomina: async (req, res) => {
        try {
            const nomina = await Nomina.find();
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    getNominaId: async (req, res) => {
        try {
            const { id } = req.params;
            const nomina = await Nomina.findById(id);
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    getNominaActivos: async (req, res) => {
        try {
            const nomina = await Nomina.find({ estado: 1 });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    getNominaInactivos: async (req, res) => {
        try {
            const nomina = await Nomina.find({ estado: 0 });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    getNominaFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const nomina = await Nomina.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    getNominaEmpleados: async (req, res) => {
        try {
            const { id } = req.params;
            const empleado = await Nomina.find({ id_empleado: id });
            res.json({ empleado });
        } catch (error) {
            res.json({ error });
        }
    },

    getNominaTotal: async (req, res) => {
        try {
            const NominaTotal = await Nomina.find();
            const total = NominaTotal.reduce((acc, item) => { return acc + item.valor; }, 0);
            res.json({ total: total });
        } catch (error) {
            res.json({ error });
        }
    },

    postNomina: async (req, res) => {
        try {
            const { fecha, id_empleado, tipo, valor, estado } = req.body;
            const nomina = new Nomina({
                fecha,
                id_empleado,
                tipo,
                valor,
                estado
            });
            await nomina.save();
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    putNomina: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const nomina = await Nomina.findByIdAndUpdate(id, info, { new: true });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    putNominaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const nomina = await Nomina.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    putNominaInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const nomina = await Nomina.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpNominas;