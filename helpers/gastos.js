import Gasto from "../models/gastos.js";
import Insumo from "../models/insumos.js";
import Semilla from "../models/semillas.js";
import Mantenimiento from "../models/mantenimiento.js";

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }
    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split('T')[0];
    return dateString === formatoFecha;
}

// Función genérica para validar IDs
async function validarIdGenerico(id, modelo, nombreEntidad) {
    if (id !== undefined) {
        try {
            const res = await modelo.findById(id);
            if (!res) {
                throw new Error(`El/La ${nombreEntidad} no existe`);
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    return true;
}

const helpersGastos = {
    validarId: async (id) => {
        return await validarIdGenerico(id, Gasto, 'gasto');
    },
    validarIdInsumos: async (id) => {
        return await validarIdGenerico(id, Insumo, 'insumo');
    },
    validarIdSemillas: async (id) => {
        return await validarIdGenerico(id, Semilla, 'semilla');
    },
    validarIdMantenimientos: async (id) => {
        return await validarIdGenerico(id, Mantenimiento, 'mantenimiento');
    },
    validarFecha: (fecha) => {
        if (!fecha) {
            throw new Error("Ingrese una fecha válida.");
        }
        if (!dateValido(fecha)) {
            throw new Error("El formato de fecha no es válido.");
        }
        return true;
    },
    validarFechas: (fechas) => {
        if (Array.isArray(fechas) && fechas.length >= 2 && fechas[0] && fechas[1]) {
            const inicio = new Date(fechas[0]);
            const final = new Date(fechas[1]);
            if (inicio > final) {
                throw new Error("La fecha de inicio no puede ser mayor que la fecha final");
            }
            return true;
        }
        return true;
    },
};

export default helpersGastos;
