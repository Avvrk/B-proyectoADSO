import mongoose from 'mongoose';

const parcelaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  ubicacionGeografica: { type: String, required: true },
  cultivoAnterior: { type: String },
  cultivoActual: { type: String, required: true },
  detalle: { type: String },
  estado: { type: String, required: true },
  area: { type: Number, required: true },
  asistenteTecnico: { type: String },
  id_fincas: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true }
}, {
  timestamps: true
});

export default mongoose.model('Parcela', parcelaSchema);