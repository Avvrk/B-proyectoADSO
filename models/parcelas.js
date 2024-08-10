import mongoose from 'mongoose';

const parcelaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  ubicacionGeografica: { type: String, required: true },
  cultivoAnterior: { type: String },
  cultivoActual: { type: String, required: true },
  detalle: { type: String },
  estado: { type: Number, default: 1 },
  area: { type: Number, required: true },
  asistenteTecnico: { type: String },
  id_fincas: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true }
}, {
  timestamps: true
});

export default mongoose.model('Parcela', parcelaSchema);