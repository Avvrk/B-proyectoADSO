import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true },
		fincas_id: { type: mongoose.Schema.Types.ObjectId, ref: "Finca" },
		fecha: { type: Date, required: true },
		codigo: { type: String, required: true, unique: true },
		descripcion: { type: String },
		total: { type: Number },
		insumos: {
			id_proveedor: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Proveedor",
			},
			id_insumos: { type: mongoose.Schema.Types.ObjectId, ref: "Insumo" },
			unidad: { type: String },
			total: { type: Number },
			cantidad: { type: Number },
		},
		semillas: {
			id_proveedor: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Proveedor",
			},
			id_semilla: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Semilla",
			},
			unidad: { type: String },
			total: { type: Number },
			cantidad: { type: Number },
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Gasto", gastoSchema);
