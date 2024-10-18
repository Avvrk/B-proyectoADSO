import mongoose from "mongoose";

const riegoSchema = new mongoose.Schema(
	{
		cultivo_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cultivo",
			required: true,
		},
		empleado_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Empleado",
			required: true,
		},
		fecha: { type: Date, required: true },
		dias_transplante: { type: Number },
		estado_fenologico: {
			type: String,
			enum: ["Inicial", "Floracion", "Cosecha"],
		},
		hora_inicio: { type: String },
		hora_fin: { type: String },
		dosis: { type: Number },
		cantidad_agua: { type: Number },
		estado: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Riego", riegoSchema);
