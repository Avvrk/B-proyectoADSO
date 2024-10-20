import Semilla from '../models/semillas.js';
import Finca from '../models/fincas.js';


const helpersSemillas = {

    existeSemillaPorId : async (id) => {
        const existe = await Semilla.findById(id);
        if (!existe) {
            throw new Error(`La semilla con ID ${id} no existe.`);
        }
    },
    validarFincaId : async (proveedor_id) => {
        const existe = await Finca.findById(proveedor_id);
        if (!existe) {
            throw new Error(`La finca con ID ${proveedor_id} no existe.`);
        }
    },
    validarFecha : (fecha) => {
        if (fecha && isNaN(Date.parse(fecha))) {
            throw new Error('La fecha no es válida.');
        }
    },
};

export default helpersSemillas;