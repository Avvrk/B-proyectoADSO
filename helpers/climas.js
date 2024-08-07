import Clima from "../models/climas.js";
import Finca from "../models/fincas.js";
import Empleado from "../models/empleados.js";

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
        if (temperaturas != undefined) {
            if (temperaturas[0] < temperaturas[1]) {
                throw new Error(
                    "La temperatura maxima no puede ser menor a la temperatura minima"
                );
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
};

export default helpersClimas;
