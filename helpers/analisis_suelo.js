import Analisis_suelos from "../models/analisis_suelos.js";
import Parcela from '../models/parcelas.js';
import Empleado from "../models/empleados.js";

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split('T')[0];
    return dateString === formatoFecha;
}

const helpersAnalisisSuelos = {
    validarId: async (id) => {
        if (id != undefined) {
            try {
                const res = await Analisis_suelos.findById(id);
                if (!res) {
                    throw new Error("El analisis del suelo no existe");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        } else {
            return true;
        }
    },
    validarIdParcela: async (id) => {
        if (id != undefined) {
            try {
                const res = await Parcela.findById(id);
                if (!res) {
                    throw new Error("La parcela no existe");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        } else {
            return true;
        }
    },
    validarIdEmpleado: async (id) => {
        if (id != undefined) {
            try {
                const res = await Empleado.findById(id);
                if (!res) {
                    throw new Error("La empleado no existe");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        } else {
            return true;
        }
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
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
};

export default helpersAnalisisSuelos;
