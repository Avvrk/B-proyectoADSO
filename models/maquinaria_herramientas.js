import mongoose from "mongoose";

const maquinariaHerramientaSchema = new mongoose.Schema(
	{
		proveedores_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Proveedor",
			required: true,
		},
		nombre: { type: String, required: true },
		tipo: { type: String, required: true },
		fechaCompra: { type: Date, required: true },
		observaciones: { type: String },
		cantidad: { type: Number, required: true },
		/* total: { type: Number, required: true }, */
		mantenimiento: [
			{ fecha_mantenimiento: { type: Date } },
			{ responsable: { type: String } },
			{ observaciones: { type: String } },
			{ precio: { type: Number } },
		],
		desinfeccion: [
			{ fecha_desinfeccion: { type: Date } },
			{
				productos: [
					{
						id_insumo: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "Insumo",
						},
					},
				],
			},
			{
				id_empleado: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Empleado",
				},
			},
		],
		estado: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model(
	"MaquinariaHerramienta",
	maquinariaHerramientaSchema
);
