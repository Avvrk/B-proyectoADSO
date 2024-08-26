import Produccion from '../models/produccion.js';

const httpProducciones = {

    getProducciones: async (req, res) => {
        try {
            const producciones = await Produccion.find().populate("cultivo_id", "nombre tipo");
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    },


    getProduccionId: async (req, res) => {
        try {
            const { id } = req.params;
            const produccion = await Produccion.findById(id).populate("cultivo_id", "nombre tipo");
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    },

    getProduccionesFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const producciones = await Produccion.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            }).populate("cultivo_id", "nombre tipo");
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    },

    getProduccionesPorCultivo: async (req, res) => {
        try {
            const { cultivo_id } = req.params;
            const producciones = await Produccion.find({ cultivo_id }).populate("cultivo_id", "nombre tipo");
            let totalCantidad = 0;
            producciones.forEach((produccion) => {
                totalCantidad += produccion.cantidad;
            });
            res.json({ totalCantidad });
        } catch (error) {
            res.json({ error });
        }
    },


    getProduccionesTotal: async (req, res) => {
        try {
            const totalProducciones = await Produccion.countDocuments().populate("cultivo_id", "nombre tipo");
            res.json({ totalProducciones });
        } catch (error) {
            res.json({ error });
        }
    },


    getProduccionesActivas: async (req, res) => {
        try {
            const producciones = await Produccion.find({ estado: 1 }).populate("cultivo_id", "nombre tipo");
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    },


    getProduccionesInactivas: async (req, res) => {
        try {
            const producciones = await Produccion.find({ estado: 0 }).populate("cultivo_id", "nombre tipo");
            res.json({ producciones });
        } catch (error) {
            res.json({ error });
        }
    },


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


    putProduccionActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const produccion = await Produccion.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    },


    putProduccionInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const produccion = await Produccion.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ produccion });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpProducciones;