import Produccion from '../Models/Produccion.js';

const httpProducciones = {
    // Método para listar todas las producciones
    getProducciones: async (req, res) => {
        try {
            const producciones = await Produccion.find();
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar una producción por ID
    getProduccionId: async (req, res) => {
        try {
            const { id } = req.params;
            const produccion = await Produccion.findById(id);
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar producciones en un rango de fechas
    getProduccionesFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const producciones = await Produccion.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar la cantidad producida por cultivo
    getProduccionesPorCultivo: async (req, res) => {
        try {
            const { cultivo_id } = req.params;
            const producciones = await Produccion.find({ cultivo_id });
            let totalCantidad = 0;
            producciones.forEach((produccion) => {
                totalCantidad += produccion.cantidad;
            });
            res.json({ totalCantidad });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar el total de producciones
    getProduccionesTotal: async (req, res) => {
        try {
            const totalProducciones = await Produccion.countDocuments();
            res.json({ totalProducciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para crear una nueva producción
    postProduccion: async (req, res) => {
        try {
            const { cultivo_id, fecha, numeroLote, especie, cantidad, cantidadTrabajadores, observaciones } = req.body;
            const produccion = new Produccion({
                cultivo_id,
                fecha,
                numeroLote,
                especie,
                cantidad,
                cantidadTrabajadores,
                observaciones
            });
            await produccion.save();
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para modificar una producción por ID
    putProduccion: async (req, res) => {
        try {
            const { id } = req.params;
            const info = req.body;
            const produccion = await Produccion.findByIdAndUpdate(id, info, { new: true });
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para activar una producción por ID
    putProduccionActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const produccion = await Produccion.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para inactivar una producción por ID
    putProduccionInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const produccion = await Produccion.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar producciones activas
    getProduccionesActivas: async (req, res) => {
        try {
            const producciones = await Produccion.find({ estado: 1 });
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar producciones inactivas
    getProduccionesInactivas: async (req, res) => {
        try {
            const producciones = await Produccion.find({ estado: 0 });
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpProducciones;