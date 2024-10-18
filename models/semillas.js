import mongoose from "mongoose";

const semillaSchema = new mongoose.Schema(
	{
		proveedor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Proveedor",
			required: true,
		},
		numFactura: { type: String },
		fechaCompra: { type: Date },
		fechaVencimiento: { type: Date },
		especieVariedad: { type: String },
		numeroLote: { type: String },
		origen: { type: String },
		poderGerminativo: { type: String },
		observaciones: { type: String },
		unidad: { type: String },
		total: { type: Number },
		estado: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Semilla", semillaSchema);
