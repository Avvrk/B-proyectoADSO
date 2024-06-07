import Nomina from '../Models/Nomina.js'

const httpNominas = {
    // Método para obtener toda la nómina
    getNomina: async (req, res) => {
        try {
            const nomina = await Nomina.find();
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener nómina por ID
    getNominaId: async (req, res) => {
        try {
            const { id } = req.params;
            const nomina = await Nomina.findById(id);
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener toda la nómina activa
    getNominaActivos: async (req, res) => {
        try {
            const nomina = await Nomina.find({ estado: 1 });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener toda la nómina inactiva
    getNominaInactivos: async (req, res) => {
        try {
            const nomina = await Nomina.find({ estado: 0 });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener nómina en un rango de fechas
    getNominaFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
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

    // Método para obtener nómina por el ID de un empleado
    getNominaEmpleados: async (req, res) => {
        try {
            const { id } = req.params;
            const empleado = await Nomina.find({ id_empleado: id });
            res.json({ empleado });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener el valor total de la nómina
    getNominaTotal: async (req, res) => {
        try {
            const NominaTotal = await Nomina.find();
            const total = NominaTotal.reduce((acc, item) => { return acc + item.valor; }, 0);
            res.json({ total: total });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para agregar una nueva nómina
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

    // Método para actualizar una nómina por ID
    putNomina: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const nomina = await Nomina.findByIdAndUpdate(id, ...info, { new: true });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para activar una nómina por ID
    putNominaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const nomina = await Nomina.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ nomina });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para inactivar una nómina por ID
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