import Cultivo from '../models/cultivos.js';
import Empleado from '../models/empleados.js';

function dateValido(dateString) {
	const registroTiempo = Date.parse(dateString);
	if (isNaN(registroTiempo)) {
		return false;
	}

	const fecha = new Date(dateString);
	const formatoFecha = fecha.toISOString().split("T")[0];
	return dateString === formatoFecha;
}

const helpersSiembras = {
    validarFecha: (fecha) => {
		if (fecha !== undefined) {
			if (!dateValido(fecha)) {
				throw new Error("Ingrese una fecha válida.");
			}
		}
		return true;
	},
    validarIdCultivo : async (id) => {
        const cultivo = await Cultivo.findById(id);
        if (!cultivo) {
            throw new Error('El ID del cultivo no existe.');
        }
        return true;
    },
    validarIdEmpleado : async (id) => {
        const empleado = await Empleado.findById(id);
        if (!empleado) {
            throw new Error('El ID del empleado no existe.');
        }
        return true;
    },
};

export default helpersSiembras;