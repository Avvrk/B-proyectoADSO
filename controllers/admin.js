import Admin from "../models/Admin.js";

const httpAdmins = {
    getAdmins: async (req, res) => {
        try {
            const admins = await Admin.find();
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
    getAdminsId: async (req, res) => {
        try {
            const { id } = req.params;
            const admins = await Admin.findById(id);
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
    getAdminsActivos: async (req, res) => {
        try {
            const admins = await Admin.find({ estado: 1 });
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
    getAdminsInactivos: async (req, res) => {
        try {
            const admins = await Admin.find({ estado: 0 });
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
    postAdmins: async (req, res) => {
        try {
            const { nombres, direccion, correo, telefono, municipio } = req.body;
            const admins = new Admin({
                nombres,
                direccion,
                correo,
                telefono,
                municipio,
            });
            await admins.save();
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
    putAdmins: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const admins = await Admin.findByIdAndUpdate(id, info, { new: true });
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
    putAdminsActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const admins = await Admin.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
    putAdminsInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const admins = await Admin.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ admins });
        } catch (error) {
            res.json({ error });
        }
    },
};

export default httpAdmins;
