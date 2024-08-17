import Admin from "../models/admin.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

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
    postLogin: async (req, res) => {
        try {
            const { correo, password } = req.body;
            const user = await Admin.findOne({ correo });
            if (!user) {
                return res.status(401).json({
                    msg: "Usuario / Password no son correctos.",
                });
            }
            console.log(password, user);
            
            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    msg: "Usuario / Password no son correctos",
                });
            }

            const token = await generarJWT(user._id);
            res.json({
                usuario: user,
                token,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Hable con su WebMaster.",
            });
        }
    },
    postLog: async (req, res) => {
        try {
            const { nombre, direccion, correo, telefono, municipio, password } = req.body;
            const admins = new Admin({
                nombre,
                direccion,
                correo,
                telefono,
                municipio,
                password,
            });
            const salt = bcryptjs.genSaltSync();
            admins.password = bcryptjs.hashSync(password, salt);
            await admins.save();
            res.json({ admins });
        } catch (error) {
            res.json({ error });
            console.log(error);
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
