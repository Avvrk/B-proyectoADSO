import mongoose from 'mongoose';

const maquinariaHerramientaSchema = new mongoose.Schema({
  proveedores_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  fecha: { type: Date, required: true },
  fechaCompra: { type: Date, required: true },
  observaciones: { type: String },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model('MaquinariaHerramienta', maquinariaHerramientaSchema);
