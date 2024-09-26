import Gasto from "../models/gastos.js";
import Proveedor from "../models/proveedores.js"; // Asumiendo que tienes el modelo Proveedor
import Semilla from "../models/semillas.js"; // Asumiendo que tienes el modelo Semilla
import Insumo from "../models/insumos.js"; // Asumiendo que tienes el modelo Insumo

const httpGastos = {
    getGastos: async (req, res) => {
        try {
            const gastos = await Gasto.find()
                .populate("insumos_id", "nombre")
                .populate("semillas_id", "especieVariedad origen")
                .populate({ 
                    path: "mantenimiento_id", 
                    select: "id_herramienta", 
                    populate: { path: "id_herramienta", select: "nombre tipo" }
                });
            res.json({ gastos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getGastosId: async (req, res) => {
        try {
            const { id } = req.params;
            const gastos = await Gasto.findById(id);
            res.json({ gastos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getGastosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const gastos = await Gasto.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ gastos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postGastos: async (req, res) => {
        try {
            const { nombre, fecha, numeroFactura, descripcion, total, insumos_id, semillas_id, mantenimiento_id } = req.body;
            const gastos = new Gasto({
                nombre,
                fecha,
                numeroFactura,
                descripcion,
                total,
                insumos_id,
                semillas_id,
                mantenimiento_id,
            });
            await gastos.save();
            res.json({ gastos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    putGastos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const gastos = await Gasto.findByIdAndUpdate(id, info, { new: true });
            res.json({ gastos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Nueva función para obtener los proveedores
    getProveedores: async (req, res) => {
        try {
            const proveedores = await Proveedor.find();
            res.json({ proveedores });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Nueva función para obtener las semillas
    getSemillas: async (req, res) => {
        try {
            const semillas = await Semilla.find();
            res.json({ semillas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Nueva función para obtener los insumos
    getInsumos: async (req, res) => {
        try {
            const insumos = await Insumo.find();
            res.json({ insumos });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default httpGastos;
