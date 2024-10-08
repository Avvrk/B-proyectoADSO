import mongoose from 'mongoose';

const produccionSchema = new mongoose.Schema({
  cultivo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
  fecha: { type: Date, required: true },
  numeroLote: { type: Number, required: true },
  especie: { type: String },
  cantidad: { type: Number, required: true },
  cantidadTrabajadores: { type: Number },
  observaciones: { type: String },
  precioUnitario: { type: Number },
  estado: {type: Number, default: 1},
}, {
  timestamps: true
});

export default mongoose.model('Produccion', produccionSchema);