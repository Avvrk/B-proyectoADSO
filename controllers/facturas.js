import Factura from "../models/factura.js";

const httpFacturas = {
    getFacturas: async (req, res) => {
        try {
            const facturas = await Factura.find().populate("comprador_id", "nombre").populate("inventario_id", "tipo");
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
    getFacturasId: async (req, res) => {
        try {
            const { id } = req.params;
            const facturas = await Factura.findById(id);
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
    getFacturasFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.params;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const facturas = await Factura.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
    getFacturasTotal: async (req, res) => {
        try {
            const { id } = req.params;
            const facturas = await Factura.find({ id }, { total: 1 });
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
    postFacturas: async (req, res) => {
        try {
            const { fecha, valor, detalles, comprador_id, numeroLoteComercial } = req.body;
            const facturas = new Factura({
                fecha,
                valor,
                detalles,
                comprador_id,
                numeroLoteComercial,
            });
            await facturas.save();
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
    postFacturasDetalles: async (req, res) => {
        try {
            const { id } = req.body;
            const { detalle } = req.body;
            const facturas = await Factura.findByIdAndUpdate(id, detalle, { new: true });
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
    putFacturas: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const facturas = await Factura.findByIdAndUpdate(id, info, { new: true });
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
    putFacturasDetalles: async (req, res) => {
        try {
            const { id } = req.params;
            const { detalle } = req.body;
            const facturas = await Factura.findByIdAndUpdate(id, detalle, { new: true });
            res.json({ facturas });
        } catch (error) {
            res.json({ error: error.message });
        }
    },
};

export default httpFacturas;
