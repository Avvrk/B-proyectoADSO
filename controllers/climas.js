import Clima from "../models/climas.js";

const httpClimas = {
    getClimas: async (req, res) => {
        try {
            const climas = await Clima.find().populate("empleado_id", "nombre documento").populate("finca_id", "nombre rut");
            res.json({ climas });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getClimasId: async (req, res) => {
        try {
            const { id } = req.params;
            const climas = await Clima.findById(id);
            res.json({ climas });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getClimasPorClima: async (req, res) => {
        try {
            const { clima } = req.params;
            const climas = await Clima.find({ tipoClima: clima }).populate("empleado_id", "nombre documento").populate("finca_id", "nombre rut");
            res.json({ climas });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getClimasFecha: async (req, res) => {
        try {
            const { fecha } = req.params;
            const climas = await Clima.find({ fecha }).populate("empleado_id", "nombre documento").populate("finca_id", "nombre rut");
            res.json({ climas });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getClimasPromedio: async (req, res) => {
        try {
            const climas = await Clima.find();
            const temperaturaMaxima = climas.map((obj) => obj.temperaturaMaxima);
            const temperaturaMinima = climas.map((obj) => obj.temperaturaMinima);
            const promedioMaxima = temperaturaMaxima.reduce((a, c) => a + c) / temperaturaMaxima.length;
            const promedioMinima = temperaturaMinima.reduce((a, c) => a + c) / temperaturaMinima.length;
            res.json({ promedioMaxima, promedioMinima });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    getClimasDuracion: async (req, res) => {
        try {
            const { id } = req.params;
            const climas = await Clima.findById(id);
            const horaInicio = climas.horaInicio;
            const horaFinal = climas.horaFinal;
            const inicio = new Date(`1970-01-01T${horaInicio}`);
            const fin = new Date(`1970-01-01T${horaFinal}`);
            const duracion = fin - inicio;
            const horas = Math.floor(duracion / 3600000);
            const minutos = Math.floor((duracion % 3600000) / 60000);
            const segundos = Math.floor((duracion % 60000) / 1000);

            res.json({ horas, minutos, segundos });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    postClimas: async (req, res) => {
        try {
            const { finca_id, empleado_id, fecha, tipoClima, horaInicio, horaFinal, temperaturaMaxima, temperaturaMinima } = req.body;
            const climas = new Clima({
                finca_id,
                empleado_id,
                fecha,
                tipoClima,
                horaInicio,
                horaFinal,
                temperaturaMaxima,
                temperaturaMinima,
            });
            await climas.save();
            res.json({ climas });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
    putClimas: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const climas = await Clima.findByIdAndUpdate(id, info, { new: true });
            res.json({ climas });
        } catch (error) {
            res.json({ err: error.message });
        }
    },
};

export default httpClimas;
