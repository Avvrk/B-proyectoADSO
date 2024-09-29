import mongoose from 'mongoose';

const fincaSchema = new mongoose.Schema({
  _idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  nombre: { type: String, required: true },
  rut: { type: String, required: true },
  direccion: { type: String, required: true },
  ubicacionGeografica: { type: String, required: true },
  area: { type: Number, required: true },
  departamento: {type:String, required:true},
  ciudad: {type:String, required:true},
  documentos: { type: String, required:true },
  limites:
    {
      norte: { type: String, required:true },
      sur: { type: String, required: true },
      este: { type: String, required:true },
      oeste: { type: String, required: true },
    },
  estado: {type:Number, default: 1 }
}, {
  timestamps: true
});

export default mongoose.model('Finca', fincaSchema);