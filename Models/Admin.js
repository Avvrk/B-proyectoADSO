import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  correo: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
  telefono: { type: String, required: true },
  municipio: { type: String, required: true },
  estado: { type: String, required: true },
  rol: {type:String, required:true},
}, {
  timestamps: true
});

export default mongoose.model('Admin', adminSchema);