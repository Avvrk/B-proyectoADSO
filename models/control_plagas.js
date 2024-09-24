import mongoose from 'mongoose';

const controlPlagasSchema = new mongoose.Schema({
  id_cultivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
  empleado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  fecha: { type: Date, required: true },
  tipoCultivo: { type: String },
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ['fitosanitario', 'normal'], required: true },
  ingredientesActivo: { type: String },
  dosis: { type: Number },
  operario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  observaciones: { type: String },
}, {
  timestamps: true
});

export default mongoose.model('ControlPlagas', controlPlagasSchema);
