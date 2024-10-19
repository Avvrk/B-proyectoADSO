import mongoose from "mongoose";

const preparacionSuelosSchema = new mongoose.Schema(
	{
		fecha: { type: Date, required: true },
		id_parcela: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Parcela",
			required: true,
		},
		empleado_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Empleado",
			required: true,
		},
		productos: { type: String },
		ingredienteActivo: { type: String },
		dosis: { type: Number },
		metodoAplicacion: { type: String },
		responsable: { type: String },
		observaciones: { type: String },
		estado: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("PreparacionSuelos", preparacionSuelosSchema);
