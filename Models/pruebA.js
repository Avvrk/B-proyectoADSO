import mongoose from 'mongoose';

const pSchema = new mongoose.Schema({
  cultivo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
  fecha: { type: Date, required: true },
  numeroLote: { type: String, required: true },
  especie: { type: String },
  cantidad: { type: Number, required: true },
  cantidadTrabajadores: { type: Number },
  observaciones: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('P', pSchema);