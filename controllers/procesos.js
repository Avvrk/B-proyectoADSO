import Proceso from "../Models/Procesos.js";
import preparacion_suelos from "../Models/preparacion_suelos.js";

//CRUD
//Listar Procesos
//Listar por ID
//Listar por Empleado
//Listar entre Fechas
//Listar por Tipo de Procesos
//Listar Activos
//Listar Inactivos
//Crear Proceso
//Modificar Proceso
//Activar
//Desactivar

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

  //Método para obtener un proceso por ID
  getProcesoID: async (req, res) => {
    try {
      const { id } = req.params;
      const procesos = await Proceso.findById(id);
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
      res.json({ empleado });
    } catch (error) {
      res.json({ error });
    }
  },
  // Método para listar procesos en un rango de fechas
  getProcesosEntreFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.body;
      const procesos = await Proceso.find({
        fecha_inicio: { $gte: fechaInicio, $lte: fechaFin },
      });
      res.json({ procesos });
    } catch (error) {
      res.json({ error });
    }
  },

  //Método para obtener procesos según el tipo.
  getProcesosTipo: async (req, res) => {
    try {
      const { tipo } = req.params;
      const procesos = await Proceso.find({ tipo: tipo });
      res.json({ procesos });
    } catch (error) {
      res.json({ error });
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
  //Método para crear un proceso
  postProcesos: async (req, res) => {
    try {
      const {
        cultivo_id,
        empleado_id,
        tipo,
        descripcion,
        fecha_inicio,
        fecha_final,
        estado,
      } = req.body;
      const procesos = new Proceso({
        cultivo_id,
        empleado_id,
        tipo,
        descripcion,
        fecha_inicio,
        fecha_final,
        estado,
      });
      await procesos.save();
      res.json({ procesos });
    } catch (error) {
      res.json(error);
    }
  },

  //Método para actualizar un proceso
  putProcesos: async (req, res) => {
    try {
      const { id } = req.params;
      const { ...info } = req.body;
      const procesos = await Proceso.findByIdAndUpdate(id, ...info, {
        new: true,
      });
      res.json({ procesos });
    } catch (error) {
      res.json({ error });
    }
  },

  //Método para activar un proceso
  putProcesosActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const procesos = await Proceso.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json({ procesos });
    } catch (error) {
      res.json({ error });
    }
  },

  // Método para inactivar un proceso por su ID
  putProcesoInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const proceso = await Proceso.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json({ proceso });
    } catch (error) {
      res.json({ error });
    }
  },
};

export default httpProcesos;
