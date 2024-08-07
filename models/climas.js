import mongoose from 'mongoose';

const climaSchema = new mongoose.Schema({
  finca_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
  empleado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  fecha: { type: Date, required: true },
  tipoClima: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFinal: { type: String, required: true },
  temperaturaMaxima: { type: Number, required: true },
  temperaturaMinima: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model('Clima', climaSchema);