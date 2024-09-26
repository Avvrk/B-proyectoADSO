import Admin from "../models/admin.js"

const helpersAdmin = {
    validarId: async (id) => {
        if (id != undefined) {
            try {
                const res = await Admin.findById(id);
                if (!res) {
                    throw new Error("El admin no existe");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error(error.message)
            }
        } else {
            return true;
        }
    },
};

export default helpersAdmin;
