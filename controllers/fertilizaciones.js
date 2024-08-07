import Fertilizacion from "../models/fertilizacion.js";

const httpFertilizaciones = {
    getFertilizaciones: async (req, res) => {
        try {
            const fertilizaciones = await Fertilizacion.find();
            res.json({ fertilizaciones });
        } catch (error) {
            res.json({ error });
        }
    },
    getFertilizacionesId: async (req, res) => {
        try {
            const { id } = req.params;
            const fertilizaciones = await Fertilizacion.findById(id);
            res.json({ fertilizaciones });
        } catch (error) {
            res.json({ error });
        }
    },
    getFertilizacionesFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const fertilizaciones = await Fertilizacion.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ fertilizaciones });
        } catch (error) {
            res.json({ error });
        }
    },
    getFertilizacionesEmpleado: async (req, res) => {
        try {
            const { empleado_id } = req.params;
            const fertilizaciones = await Fertilizacion.find({ empleado_id });
            res.json({ fertilizaciones });
        } catch (error) {
            res.json({ error });
        }
    },
    postFertilizaciones: async (req, res) => {
        try {
            const { id_cultivo, empleado_id, fecha, estadoFenologico, tipo, nombreFertilizante, cantidad, invetario_id } = req.body;
            const fertilizaciones = new Fertilizacion({
                id_cultivo,
                empleado_id,
                fecha,
                estadoFenologico,
                tipo,
                nombreFertilizante,
                cantidad,
                invetario_id,
            });
            await fertilizaciones.save();
            res.json({ fertilizaciones });
        } catch (error) {
            res.json({ error });
        }
    },
    putFertilizaciones: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const fertilizaciones = await Fertilizacion.findByIdAndUpdate(id, info, { new: true });
            res.json({ fertilizaciones });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpFertilizaciones;
