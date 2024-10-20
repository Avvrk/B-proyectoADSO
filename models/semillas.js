import mongoose from "mongoose";

const semillaSchema = new mongoose.Schema(
	{
		id_finca: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Finca",
			required: true,
		},
		nombre: { type: String },
		registro_ica: { type: String },
		registro_invima: { type: String },
		fechaVencimiento: { type: Date },
		especieYVariedad: { type: String },
		numLote: { type: Number },
		origine: { type: String },
		poderGerminativo: { type: String },
		observaciones: { type: String },
		unidad: { type: String },
		estado: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Semilla", semillaSchema);
