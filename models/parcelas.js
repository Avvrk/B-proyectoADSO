import mongoose from 'mongoose';

const parcelaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  ubicacionGeografica: { type: String, required: true },
  cultivoAnterior: { type: String },
  cultivoActual: { type: String, required: true },
  descripcion: { type: String },
  area: { type: Number, required: true },
  asistenteTecnico: { type: String },
  id_fincas: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
  estado: { type: Number, default: 1 }
}, {
  timestamps: true
});

export default mongoose.model('Parcela', parcelaSchema);