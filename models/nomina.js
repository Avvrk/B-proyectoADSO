import mongoose from "mongoose";

const nominaSchema = new mongoose.Schema(
	{
		fecha: { type: Date, required: true },
		id_empleado: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Empleado",
			required: true,
		},
		tipo: { type: String, required: true },
		valor: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Nomina", nominaSchema);
