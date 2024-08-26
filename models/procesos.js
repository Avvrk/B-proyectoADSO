import mongoose from 'mongoose';

const ProcesosSchema = new mongoose.Schema({
  cultivo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
  empleado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String },
  fecha_inicio: { type: Date, required: true },
  fecha_final: { type: Date },
  estado: {type: Number, default:1},
}, {
  timestamps: true
});

export default mongoose.model('Procesos', ProcesosSchema);