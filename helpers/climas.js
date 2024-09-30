import Clima from "../models/climas.js";
import Finca from "../models/fincas.js";
import Empleado from "../models/admin.js";

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split('T')[0];
    return dateString === formatoFecha;
}

const helpersClimas = {
    validarId: async (id) => {
        if (id != undefined) {
            try {
                const res = await Clima.findById(id);
                if (!res) {
                    throw new Error("El clima no existe");
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
    validarIdFinca: async (id) => {
        if (id != undefined) {
            try {
                const res = await Finca.findById(id);
                if (!res) {
                    throw new Error("La finca no existe");
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
    validarTemperatura: (temperaturas) => {
        console.log("Temperaturas recibidas:", temperaturas); // Añade esto para depuración
    
        if (temperaturas && temperaturas.length === 2) { // Asegúrate de que hay dos temperaturas
            const temperaturaMaxima = Number(temperaturas[0]);
            const temperaturaMinima = Number(temperaturas[1]);
    
            if (temperaturaMaxima < temperaturaMinima) {
                throw new Error(
                    "La temperatura maxima no puede ser menor a la temperatura minima"
                );
            }
            return true; // Si todo está bien
        } else {
            // Puedes lanzar un error si las temperaturas no son válidas
            throw new Error("Las temperaturas no son válidas");
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
};

export default helpersClimas;
