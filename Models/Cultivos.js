import mongoose from 'mongoose';

const cultivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  id_parcela: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcela', required: true }
}, {
  timestamps: true
});

export default mongoose.model('Cultivo', cultivoSchema);
