import mongoose from 'mongoose';

const gastoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  numeroFactura: { type: String },
  descripcion: { type: String },
  total: { type: Number, required: true },
  insumos_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Insumo' },
  semillas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Semilla' },
  mantenimiento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mantenimiento' }
}, {
  timestamps: true
});

export default mongoose.model('Gasto', gastoSchema);
