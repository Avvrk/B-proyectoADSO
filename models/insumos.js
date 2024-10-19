import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema(
	{
		proveedores_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Proveedor",
			required: true,
		},
		nombre: { type: String, required: true },
		relacionNPK: { type: String },
		cantidad: { type: Number, required: true },
		unidad: { type: String, required: true },
		responsable: { type: String },
		observaciones: { type: String },
		total: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Insumo", insumoSchema);
