import mongoose from 'mongoose';

const inventarioSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  observacion: { type: String },
  unidad: { type: String },
  cantidad: { type: Number, required: true },
  semillas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Semilla' },
  insumos_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Insumo' },
  maquinaria_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Maquinaria' },
  estado: { type: Number, default: 1 },
}, {
  timestamps: true
});

export default mongoose.model('Inventario', inventarioSchema);
