import Factura from "../models/factura.js";

const httpFacturas = {
    getFacturas: async (req, res) => {
        try {
            const facturas = await Factura.find().populate("comprador_id", "nombre").populate("inventario_id", "tipo");
            res.json({ facturas });
        } catch (error) {
            res.json({ error });
        }
    },
    getFacturasId: async (req, res) => {
        try {
            const { id } = req.params;
            const facturas = await Factura.findById(id);
            res.json({ facturas });
        } catch (error) {
            res.json({ error });
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
            res.json({ error });
        }
    },
    getFacturasTotal: async (req, res) => {
        try {
            const { id } = req.params;
            const facturas = await Factura.find({ id }, { total: 1 });
            res.json({ facturas });
        } catch (error) {
            res.json({ error });
        }
    },
    postFacturas: async (req, res) => {
        try {
            const { fecha, valor, detalles, inventario_id, cantidad, nombreProducto, subtotal, iva, total, comprador_id } = req.body;
            const facturas = new Factura({
                fecha,
                valor,
                detalles,
                inventario_id,
                cantidad,
                nombreProducto,
                subtotal,
                iva,
                total,
                comprador_id,
            });
            await facturas.save();
            res.json({ facturas });
        } catch (error) {
            res.json({ error });
        }
    },
    putFacturas: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const facturas = await Factura.findByIdAndUpdate(id, info, { new: true });
            res.json({ facturas });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpFacturas;
