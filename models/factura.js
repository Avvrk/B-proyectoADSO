import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema(
    {
        fecha: { type: Date, required: true },
        numFactura: { type: Number, required: true, unique: true },
        detalles: [
            {
                codigo: { type: String },
                id_produccion: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Produccion",
                },
                cantidad: { type: Number },
                nombreProducto: { type: String },
                subtotal: { type: Number },
                iva: { type: Number },
            },
        ],
        total: { type: Number, required: true },
        comprador_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comprador",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Factura", facturaSchema);
