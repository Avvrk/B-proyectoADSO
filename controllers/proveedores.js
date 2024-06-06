import Proveedor from '../Models/Proveedores.js';

const httpProveedores = {
     // Método para listar todos los proveedores
     getProveedores: async (req, res) => {
        try {
            const proveedores = await Proveedor.find();
            res.json({ proveedores });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar un proveedor por su ID
    getProveedorById: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findById(id);
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para crear un nuevo proveedor
    crearProveedor: async (req, res) => {
        try {
            const { nombre, direccion, telefono, email } = req.body;
            const proveedor = new Proveedor({
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

    // Método para modificar un proveedor por su ID
    modificarProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, direccion, telefono, email } = req.body;
            const proveedor = await Proveedor.findByIdAndUpdate(id, {
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

    // Método para activar un proveedor por su ID
    activarProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para inactivar un proveedor por su ID
    inactivarProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ proveedor });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar todos los proveedores activos
    getProveedoresActivos: async (req, res) => {
        try {
            const proveedores = await Proveedor.find({ estado: 1 });
            res.json({ proveedores });
        } catch (error) {
            res.json({ error });
        }
    },

    // Método para listar todos los proveedores inactivos
    getProveedoresInactivos: async (req, res) => {
        try {
            const proveedores = await Proveedor.find({ estado: 0 });
            res.json({ proveedores });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpProveedores;