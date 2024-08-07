import mongoose from 'mongoose';

const fincaSchema = new mongoose.Schema({
  _idAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  nombre: { type: String, required: true },
  rut: { type: String, required: true },
  direccion: { type: String, required: true },
  ubicacionGeografica: { type: String, required: true },
  departamento: {type:String, required:true}, //Nuevo campo añadido
  ciudad: {type:String, required:true}, //Nuevo campo añadido
  limites: {type:String, required:true}, //Nuevo campo añadido
  area: { type: Number, required: true },
  estado: {type:Number, default: 1 }
}, {
  timestamps: true
});

export default mongoose.model('Finca', fincaSchema);