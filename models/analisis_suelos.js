import mongoose from 'mongoose';

const analisisSuelosSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  id_parcela: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcela', required: true },
  empleado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  muestra: { type: String, required: true },
  cultivo: { type: String },
  laboratorio: { type: String },
  resultados: [{ type: String }],
  recomendaciones: { type: String },
  estado: {type: Number, default: 1},
}, {
  timestamps: true
});

export default mongoose.model('AnalisisSuelos', analisisSuelosSchema);
