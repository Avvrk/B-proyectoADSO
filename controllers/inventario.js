import Inventario from "../models/Inventario.js";

const httpInventarios = {
    // Método para obtener todo el inventario
    getInventario: async (req, res) => {
        try {
            const inventario = await Inventario.find();
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener un elemento del inventario por ID
    getInventarioId: async (req, res) => {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findById(id);
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },
    //Método para listar entre fechas.
    getInventarioFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const inventarios = await Inventario.find({ fecha: { $gte: fechaInicioObj, $lte: fechaFinObj } });
            res.json({ inventarios })
        } catch (error) {
            res.json({ error });
        }
    },
    //Método para listar el total del inventario
    getInventarioTotal: async (req, res) => {
        try {
            const inventarioTotal = await Inventario.find();
            const total = inventarioTotal.reduce((acc, item) => { return acc + item.valor }, 0);
            res.json({ total: total })
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener los activos del inventario
    getInventarioActivos: async (req, res) => {
        try {
            const inventario = await Inventario.find({ estado: 1 });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener los inactivos del inventario
    getInventarioInactivos: async (req, res) => {
        try {
            const inventario = await Inventario.find({ estado: 0 });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para obtener la cantidad de un elemento del inventario por ID
    getInventarioCantidades: async (req, res) => {
        try {
            const { id } = req.params;
            const cantidad = await Inventario.findById(id);
            const r = cantidad.cantidad;
            res.json({ r });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para agregar inventario
    postInventario: async (req, res) => {
        try {
            const { tipo, observacion, unidad, cantidad, semillas_id, insumos_id, maquinaria_id, estado } = req.body;
            const inventario = new Inventario({
                tipo,
                observacion,
                unidad,
                cantidad,
                semillas_id,
                insumos_id,
                maquinaria_id,
                estado
            });
            await inventario.save();
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para actualizar un elemento del inventario por ID
    putInventario: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const inventario = await Inventario.findByIdAndUpdate(id, ...info, { new: true });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para activar un elemento del inventario por ID
    putInventarioActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para inactivar un elemento del inventario por ID
    putInventarioInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ inventario });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpInventarios;