import mongoose from "mongoose";

const compradorSchema = new mongoose.Schema(
	{
		_id_produccion: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Produccion",
			required: true,
		},
		fecha: { type: Date, required: true },
		especie: { type: String },
		nombre: { type: String, required: true },
		telefono: { type: String, required: true },
		cantidad: { type: Number, required: true },
		numeroGuiaTransporte: { type: String },
		valor: { type: Number },
		estado: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Comprador", compradorSchema);
