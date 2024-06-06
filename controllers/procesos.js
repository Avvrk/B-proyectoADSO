import Proceso from '../Models/Procesos.js';

const httpProcesos = {
        // Método para listar todos los procesos
        getProcesos: async (req, res) => {
            try {
                const procesos = await Procesos.find();
                res.json({ procesos });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar todos los empleados
        getEmpleados: async (req, res) => {
            try {

                res.json({ empleados });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar procesos en un rango de fechas
        getProcesosEntreFechas: async (req, res) => {
            try {
                const { fechaInicio, fechaFin } = req.body;
                const procesos = await Procesos.find({
                    fecha_inicio: { $gte: fechaInicio, $lte: fechaFin }
                });
                res.json({ procesos });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para crear un nuevo proceso
        crearProceso: async (req, res) => {
            try {
                const nuevoProceso = new Procesos(req.body);
                await nuevoProceso.save();
                res.json({ nuevoProceso });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para modificar un proceso por su ID
        modificarProceso: async (req, res) => {
            try {
                const { id } = req.params;
                const procesoModificado = await Procesos.findByIdAndUpdate(id, req.body, { new: true });
                res.json({ procesoModificado });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para activar un proceso por su ID
        activarProceso: async (req, res) => {
            try {
                const { id } = req.params;
                const procesoActivado = await Procesos.findByIdAndUpdate(id, { estado: 'activo' }, { new: true });
                res.json({ procesoActivado });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para inactivar un proceso por su ID
        inactivarProceso: async (req, res) => {
            try {
                const { id } = req.params;
                const procesoInactivado = await Procesos.findByIdAndUpdate(id, { estado: 'inactivo' }, { new: true });
                res.json({ procesoInactivado });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar procesos activos
        getProcesosActivos: async (req, res) => {
            try {
                const procesos = await Procesos.find({ estado: 'activo' });
                res.json({ procesos });
            } catch (error) {
                res.json({ error });
            }
        },
    
        // Método para listar procesos inactivos
        getProcesosInactivos: async (req, res) => {
            try {
                const procesos = await Procesos.find({ estado: 'inactivo' });
                res.json({ procesos });
            } catch (error) {
                res.json({ error });
            }
        }
};

export default httpProcesos;