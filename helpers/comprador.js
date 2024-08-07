import Comprador from "../models/comprador.js"

const herlpersComprador = {
    validarId: async (id) => {
        if (id != undefined) {
            try {
                const res = await Comprador.findById(id);
                if (!res) {
                    throw new Error("El comprador no existe");
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
}

export default herlpersComprador