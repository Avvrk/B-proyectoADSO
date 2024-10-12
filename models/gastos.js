import mongoose from 'mongoose';

const gastoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fincas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'fincas' },
  fecha: { type: Date, required: true },
  codigo: { type: String, required: true, unique: true },
  descripcion: { type: String },
  total: { type: Number },
  insumos: {
      Id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor' },
      Id_insumos: { type: mongoose.Schema.Types.ObjectId, ref: 'Insumo' },
      unidad: { type: Number },
      total: { type: Number },
      cantidad: { type: Number }
  },
  semillas: {
      Id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor' },
      Id_semilla: { type: mongoose.Schema.Types.ObjectId, ref: 'semilla' },
      unidad: { type: Number },
      total: { type: Number },
      cantidad: { type: Number }
  },
}, {
  timestamps: true
});

export default mongoose.model('Gasto', gastoSchema);
