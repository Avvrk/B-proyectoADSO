import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String },
  telefono: { type: String },
  email: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Proveedor', proveedorSchema);
