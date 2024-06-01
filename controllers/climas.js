import Clima from "../models/climas.js";

const httpClimas = {
    getClimas: async (req, res) => {
        try {
            const climas = await Clima.find();
            res.json({ climas });
        } catch (error) {
            res.json({ error });
        }
    },
    getClimasId: async (req, res) => {
        try {
            const { id } = req.params;
            const climas = await Clima.findById(id);
            res.json({ climas });
        } catch (error) {
            res.json({ error });
        }
    },
    getClimasPorClima: async (req, res) => {
        try {
            const { clima } = req.params;
            const climas = await Clima.findById({ tipoClima: clima });
            res.json({ climas });
        } catch (error) {
            res.json({ error });
        }
    },
    getClimasFecha: async (req, res) => {
        try {
            const { fecha } = req.params;
            const climas = await Clima.findById({ fecha });
            res.json({ climas });
        } catch (error) {
            res.json({ error });
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
            res.json({ error });
        }
    },
    getClimasDuracion: async (req, res) => {
        try {
            const { id } = req.params;
            const climas = await Clima.findById(id);

        } catch (error) {

        }
        const horaInicio = document.getElementById('hora_inicio').value;
        const horaFin = document.getElementById('hora_fin').value;
        const inicio = new Date(`1970-01-01T${horaInicio}`);
        const fin = new Date(`1970-01-01T${horaFin}`);
        const duracion = fin - inicio;
        const horas = Math.floor(duracion / 3600000);
        const minutos = Math.floor((duracion % 3600000) / 60000);
        const segundos = Math.floor((duracion % 60000) / 1000);
        console.log(`La duración es de ${horas} horas, ${minutos} minutos y ${segundos} segundos`, horaInicio, horaFin);
    }
};
