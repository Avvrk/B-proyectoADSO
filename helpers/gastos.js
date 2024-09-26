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

const helpersGastos = {
    validarId: async (id) => {
        if (id !== undefined) {
            try {
                const res = await Gasto.findById(id);
                if (!res) {
                    throw new Error("El gasto no existe");
                }
                return true;
            } catch (error) {
                throw new Error(error.message);
            }
        }
        return true;
    },
    validarIdInsumos: async (id) => {
        if (id !== undefined) {
            try {
                const res = await Insumo.findById(id);
                if (!res) {
                    throw new Error("El insumo no existe");
                }
                return true;
            } catch (error) {
                throw new Error(error.message);
            }
        }
        return true;
    },
    validarIdSemillas: async (id) => {
        if (id !== undefined) {
            try {
                const res = await Semilla.findById(id);
                if (!res) {
                    throw new Error("La semilla no existe");
                }
                return true;
            } catch (error) {
                throw new Error(error.message);
            }
        }
        return true;
    },
    validarIdMantenimientos: async (id) => {
        if (id !== undefined) {
            try {
                const res = await Mantenimiento.findById(id);
                if (!res) {
                    throw new Error("El mantenimiento no existe");
                }
                return true;
            } catch (error) {
                throw new Error(error.message);
            }
        }
        return true;
    },
    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            if (!dateValido(fecha)) {
                throw new Error("Ingrese una fecha válida.");
            }
        }
        return true;
    },
    validarFechas: (fechas) => {
        if (Array.isArray(fechas) && fechas.length >= 2 && fechas[0] != undefined && fechas[1] != undefined) {
            const inicio = new Date(fechas[0]);
            const final = new Date(fechas[1]);
            if (inicio > final) {
                throw new Error("La fecha de inicio no puede ser mayor que la fecha final");
            }
                return true;
        }
        return true;
    },
}

export default helpersGastos;