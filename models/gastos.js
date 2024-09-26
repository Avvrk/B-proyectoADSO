import mongoose from 'mongoose';

const gastoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fincas_id: { type: mongoose.Schema.Types.ObjectId, ref: 'fincas' },
  fecha: { type: Date, required: true },
  numeroFactura: { type: String },
  descripcion: { type: String },
  total: { type: Number, required: true },
  
  insumos: [
    {
      Id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor' },
      Id_insumos: { type: mongoose.Schema.Types.ObjectId, ref: 'Insumo' },
      unidad: { type: Number, required: true },
      total: { type: Number, required: true },
      cantidad: { type: Number, required: true }
    }
  ],

  semillas: [
    {
      Id_proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor' },
      Id_semilla: { type: mongoose.Schema.Types.ObjectId, ref: 'semilla' },
      unidad: { type: Number, required: true },
      total: { type: Number, required: true },
      cantidad: { type: Number, required: true }
    }
  ],

}, {
  timestamps: true
});

export default mongoose.model('Gasto', gastoSchema);
