import Proceso from '../Models/Procesos.js';
import preparacion_suelos from '../Models/preparacion_suelos.js';

const httpProcesos = {
    // Método para listar todos los procesos
    getProcesos: async (req, res) => {
        try {
            const procesos = await Proceso.find();
            res.json({ procesos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar todos los procesos por ID empleado
    getProcesoEmpleadoID: async (req, res) => {
        try {
            const { id } = req.params;
            const empleado = await Proceso.find({ empleado_id: id });
            res.json({ empleado })
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar procesos en un rango de fechas
    getProcesosEntreFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const procesos = await Proceso.find({
                fecha_inicio: { $gte: fechaInicio, $lte: fechaFin }
            });
            res.json({ procesos });
        } catch (error) {
            res.json({ error });
        }
    },
    getProcesosEmpleado: async (req,res) =>{
        try{
            const {empleado} = req.params;
            const procesos = await Proceso.find({empleado_id: empleado});
            res.json({procesos});
        } catch (error){
            res.json({error});
        }
    },
    // Método para listar procesos activos
    getProcesosActivos: async (req, res) => {
        try {
            const procesos = await Proceso.find({ estado: 1 });
            res.json({ procesos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para listar procesos inactivos
    getProcesosInactivos: async (req, res) => {
        try {
            const procesos = await Proceso.find({ estado: 0 });
            res.json({ procesos });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para crear un nuevo proceso
    postProceso: async (req, res) => {
        try {
            const { cultivo_id, empleado_id, tipo, descripcion, fecha_inicio, fecha_final } = req.body;
            const procesos = new Proceso({
                cultivo_id,
                empleado_id,
                tipo,
                descripcion,
                fecha_inicio,
                fecha_final
            });
            await procesos.save()
            res.json({ procesos })
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para modificar un proceso por su ID
    putProceso: async (req, res) => {
        try {
            const { id } = req.params;
            const info = req.body;
            const proceso = await Proceso.findByIdAndUpdate(id, info, { new: true });
            res.json({ proceso });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para activar un proceso por su ID
    putProcesoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const proceso = await Proceso.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ proceso });
        } catch (error) {
            res.json({ error });
        }
    },
    // Método para inactivar un proceso por su ID
    putProcesoInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const proceso = await Proceso.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ proceso });
        } catch (error) {
            res.json({ error });
        }
    }
};

export default httpProcesos;