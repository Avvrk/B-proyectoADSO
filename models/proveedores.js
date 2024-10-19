import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema({
  finca_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
  nombre: { type: String, required: true },
  direccion: { type: String },
  telefono: { type: String },
  email: { type: String },
  estado: { type: Number, default: 1 }
}, {
  timestamps: true
});

export default mongoose.model('Proveedor', proveedorSchema);