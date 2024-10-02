import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  valor: { type: Number, required: true },
  detalles: { type: String },
  id_produccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Produccion', required: true },
  cantidad: { type: Number, required: true },
  nombreProducto: { type: String, required: true },
  subtotal: { type: Number, required: true },
  iva: { type: Number, required: true },
  total: { type: Number, required: true },
  comprador_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comprador', required: true }
}, {
  timestamps: true
});

export default mongoose.model('Factura', facturaSchema);
