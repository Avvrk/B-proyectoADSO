import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true },
		documento: { type: String, unique: true },
		direccion: { type: String },
		telefono: { type: String },
		estudios: { type: String },
		descripcion: { type: String },
		estado: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Empleado", empleadoSchema);
