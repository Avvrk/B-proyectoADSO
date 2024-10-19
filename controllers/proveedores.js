import Proveedor from '../models/proveedores.js';

const httpProveedores = {
    getProveedores: async (req, res) => {
        try {
            const proveedores = await Proveedor.find().populate("finca_id", "nombre");
            res.json({ proveedores });
        } catch (error) {
            res.json({ error });
        }
    },
    getProveedorId: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findById(id).populate("finca_id", "nombre");
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    },
    getProveedorActivos: async (req, res) => {
        try {
            const proveedores = await Proveedor.find({ estado: 1 }).populate("finca_id", "nombre");
            res.json({ proveedores });
        } catch (error) {
            res.json({ error });
        }
    },
    getProveedorInactivos: async (req, res) => {
        try {
            const proveedores = await Proveedor.find({ estado: 0 }).populate("finca_id", "nombre");
            res.json({ proveedores });
        } catch (error) {
            res.json({ error });
        }
    },
    postProveedor: async (req, res) => {
        try {
            const { finca_id, nombre, direccion, telefono, email } = req.body;
            const proveedor = new Proveedor({
                finca_id,
                nombre,
                direccion,
                telefono,
                email
            });
            await proveedor.save();
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    },
    putProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const { finca_id, nombre, direccion, telefono, email } = req.body;
            const proveedor = await Proveedor.findByIdAndUpdate(id, {
                finca_id,
                nombre,
                direccion,
                telefono,
                email
            }, { new: true });
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    },
    putProveedorActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    },
    putProveedorInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpProveedores;