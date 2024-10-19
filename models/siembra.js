import mongoose from 'mongoose';

const siembraSchema = new mongoose.Schema({
  id_cultivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
  empleado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  fechaSiembra: { type: Date, required: true },
  fechaCosecha: { type: Date },
  transplante: { type: Boolean },
  cultivoAnterior: { type: String },
  estado: { type: Number, default: 1 },
}, {
  timestamps: true
});

export default mongoose.model('Siembra', siembraSchema);