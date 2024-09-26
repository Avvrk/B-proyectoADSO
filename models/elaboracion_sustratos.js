import mongoose from 'mongoose';

const sustratoSchema = new mongoose.Schema({
  id_proceso: { type: mongoose.Schema.Types.ObjectId, ref: 'Procesos', required: true },
  fecha: { type: Date, required: true },
  productoComercial: { type: String },
  ingredienteActivo: { type: String },
  dosisUtilizada: { type: Number },
  metodoAplicacion: { type: String },
  empleado_idOperario: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  empleado_idResponsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  observaciones: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Sustrato', sustratoSchema);
