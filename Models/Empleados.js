import mongoose from 'mongoose';

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String },
  telefono: { type: String },
  estudios: { type: String },
  descripcion: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Empleado', empleadoSchema);
