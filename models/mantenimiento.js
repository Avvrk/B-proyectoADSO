import mongoose from 'mongoose';

const mantenimientoSchema = new mongoose.Schema({
  gastos_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gasto', required: true },
  id_herramienta: { type: mongoose.Schema.Types.ObjectId, ref: 'MaquinariaHerramienta', required: true },
  fecha: { type: Date, required: true },
  verificacionRealizada: { type: String },
  calibracion: { type: String },
  responsable: { type: String },
  observaciones: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Mantenimiento', mantenimientoSchema);
