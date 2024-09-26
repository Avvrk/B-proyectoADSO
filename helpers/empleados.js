import Empleado from "../models/empleados.js";

const helpersEmpleados = {
    validarId: async (id) => {
        if (id !== undefined) {
            try {
                const res = await Empleado.findById(id);
                if (!res) {
                    throw new Error("El empleado no existe");
                }
                return true;
            } catch (error) {
                throw new Error(error.message);
            }
        }
        return true;
    },
}

export default helpersEmpleados