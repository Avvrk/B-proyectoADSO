import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  correo: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
  telefono: { type: String, required: true },
  municipio: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['Administrador', 'Empleado'], required: true },
  estado: { type: Number, default: 1 },
}, {
  timestamps: true
});

export default mongoose.model('Admin', adminSchema);