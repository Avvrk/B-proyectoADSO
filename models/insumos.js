import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema(
	{
		id_finca: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Finca",
			required: true,
		},
		nombre: { type: String, required: true },
		registro_ica: { type: String, required: true },
		registro_invima: { type: String, required: true },
		relacionNPK: { type: String, required: true },
		cantidad: { type: Number, required: true },
		unidad: { type: String, required: true },
		observaciones: { type: String },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Insumo", insumoSchema);
