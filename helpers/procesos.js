import { json } from "express";
import Proceso from "../Models/Procesos.js";

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
    //Método para obtener todos los procesos
    getProcesos: async (req, res) => {
        try {
            const procesos = await Proceso.find();
            res.json({ procesos })
        } catch (error) {
            res.json({ error })
        }
    },

    //Método para obtener un proceso por ID
    getProcesosID: async (req, res) => {
        try {
            const { id } = req.params;
            const procesos = await Proceso.findById(id);
            res.json({ procesos });
        } catch (error) {
            res.json({ error });
        }
    },

    //Método para obtener procesos por empleado
    getProcesosEmpleado: async (req, res) => {
        try {
            const { id } = req.params;
            const empleado = await Proceso.findById({ empleado_id: id });
            res.json({ empleado });
        } catch (error) {
            res.json(error)
        }
    },

    //Método para obtener procesos en un rango de fechas
    getProcesosFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date(fechaFin);
            const procesos = await Proceso.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ procesos });
        } catch (error) {
            res.json({ error })
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

    //Método para listar procesos activos
    getProcesosActivos: async (req, res) => {
        try {
            const procesos = await Proceso.find({ estado: 1 });
            res.json(procesos);
        } catch (error) {
            res.json({ error });
        }
    },

    //Método para listar procesos inactivos
    getProcesosInactivos: async (req, res) => {
        try {
            const procesos = await Proceso.find({ estado: 0 });
            res.json([procesos]);
        } catch (error) {
            res.json({ error });
        }
    },

    //Método para crear un proceso
    postProcesos: async (req, res) => {
        try {
            const { cultivo_id, empleado_id, tipo, descripcion, fecha_inicio, fecha_final, estado } = req.body;
            const procesos = new Proceso({
                cultivo_id,
                empleado_id,
                tipo,
                descripcion,
                fecha_inicio,
                fecha_final,
                estado
            });
            await procesos.save();
            res.json({ procesos });
        } catch (error) {
            res.json(error)
        }
    },

    //Método para actualizar un proceso
    putProcesos: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const procesos = await Proceso.findByIdAndUpdate(id, ...info, { new: true });
            res.json({ procesos });
        } catch (error) {
            res.json({ error });
        }
    },

    //Método para activar un proceso
    putProcesosActivar: async (req, res) => {
        try{
            const { id } = req.params;
            const procesos = await Proceso.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({procesos});
        } catch (error){
            res.json({error});
        }
    },

        //Método para inactivar un proceso
        putProcesosInactivar: async (req, res) => {
            try{
                const { id } = req.params;
                const procesos = await Proceso.findByIdAndUpdate(id, { estado: 0 }, { new: true });
                res.json({procesos});
            } catch (error){
                res.json({error});
            }
        },
};

export default httpProcesos;

