import mongoose from "mongoose";

const fertilizacionSchema = new mongoose.Schema(
	{
		id_cultivo: {
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
		estadoFenologico: {
			type: String,
			enum: ["inicial", "floracion", "cosecha"],
		},
		tipo: {
			type: String,
			enum: ["antes de siembra", "después de siembra"],
			required: true,
		},
		nombreFertilizante: { type: String, required: true },
		cantidad: { type: Number, required: true },
		/* inventario_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Inventario",
		}, */
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Fertilizacion", fertilizacionSchema);
