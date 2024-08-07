import ControlPlagas from "../models/control_plagas.js"
import Cultivo from "../models/cultivos.js"
import Empleado from "../models/empleados.js";

const herlpersControlPlagas = {
    validarId: async (id) => {
        if (id != undefined) {
            try {
                const res = await ControlPlagas.findById(id);
                if (!res) {
                    throw new Error("El control no existe");
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
    validarIdCultivo: async (id) => {
        if (id != undefined) {
            try {
                const res = await Cultivo.findById(id);
                if (!res) {
                    throw new Error("El cultivo no existe");
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
                    throw new Error("El empleado no existe");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error(error.message);
            }
        } else {
            return true;
        }
    }
}

export default herlpersControlPlagas