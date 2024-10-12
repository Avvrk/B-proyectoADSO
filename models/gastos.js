import mongoose from 'mongoose';

const gastoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fincas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'fincas' },
  fecha: { type: Date, required: true },
  codigo: { type: String, required: true, unique: true },
  descripcion: { type: String },
  total: { type: Number },
  insumos: {
      id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor', set: (v) => (v === "" ? null : v) },
      id_insumos: { type: mongoose.Schema.Types.ObjectId, ref: 'Insumo', set: (v) => (v === "" ? null : v) },
      unidad: { type: Number },
      total: { type: Number },
      cantidad: { type: Number }
  },
  semillas: {
      id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor', set: (v) => (v === "" ? null : v) },
      id_semilla: { type: mongoose.Schema.Types.ObjectId, ref: 'semilla', set: (v) => (v === "" ? null : v) },
      unidad: { type: Number },
      total: { type: Number },
      cantidad: { type: Number }
  },
}, {
  timestamps: true
});

export default mongoose.model('Gasto', gastoSchema);
