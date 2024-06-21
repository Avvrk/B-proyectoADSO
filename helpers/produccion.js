import Produccion from '../Models/Produccion.js';

//CRUD
//Listar producciones
//Listar por ID
//Listar entre fechas
//Listar cantidad por cultivo
//Listar total
//Listar producciones activas
//Listar producciones inactivas
//Crear produccion
//Modificar produccion
//Activar produccion
//inactivar produccion

const httpProducciones = {
//Método para listar las producciones
getProducciones: async (req,res) => {
    try{
        const producciones = await Produccion.find();
        res.json({ producciones });
    } catch (error){
        res.json({ error });
    }
},

    //Método para listar producciones por ID
    getProduccionesId: async (req, res) => {
        try {
            const { id } = req.params;
            const producciones = await Produccion.findById(id);
            res.json({producciones});
        } catch (error){
            res.json({error});
        }
    },

    //Método para listar producciones entre fechas
    getProduccionesFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.body;
            const fechaInicioObj = new Date(fechaInicio);
            const fechaFinObj = new Date( fechaFin);
            const producciones = await Produccion.find({
                fecha: { $gte: fechaInicioObj, $lte: fechaFinObj },
            });
            res.json({ producciones });
        } catch (error){
            res.json({ error });
        }
    },

    //Método para obtener cantidad por produccion
    getProduccionesCantidad: async (req, res) => {
        try {
            const { id } = req.params;
            const producciones = await Produccion.find({cantidad: id});
            res.json({ producciones });
        } catch (error){
            res.json({ error });
        }
    },

    //Método para listar total
    getProduccionesTotal: async (req, res) => {
        try {
            const produccionTotal = await Produccion.find();
            const total = produccionTotal.reduce((acc, item) => { return acc + item.valor }, 0);
            res.json({ cantidad: total });
        }catch (error){
            res.json({ error });
        }
    },

    //Listar producciones activas
    getProduccionesActivos: async (req, res) => {
        try {
            const producciones = await Produccion.find({ estado: 1 });
            res.json({producciones});
        }catch (error){
            res.json({ error });
        }
    },

    //Listar producciones inactivas
    getProduccionesInactivos: async (req, res) => {
        try {
            const producciones = await Produccion.find({ estado: 0 });
            res.json({ producciones });
        } catch (error){
            res.json({ error });
        }
    },

    //Método para crear una producción
    postProducciones: async (req, res) => {
        try{
            const { cultivo_id, fecha, numeroLote, especie, cantidad, cantidadTrabajadores, observaciones, estado } = req.body;
            const producciones = new Produccion({
                cultivo_id,
                fecha,
                numeroLote,
                especie,
                cantidad,
                cantidadTrabajadores,
                observaciones,
                estado
            });
            await producciones.save();
            res.json({ producciones });
        } catch (error){
            res.json({ error });
        }
    },

    //Método para modificar producción
    putProducciones: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...info } = req.body;
            const producciones = await Produccion.findByIdAndUpdate(id, ...info, { new: true });
            res.json({ producciones });
        } catch (error){
            res.json({ error });
        }
    },

    //Método para activar una producción
    putProduccionesActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const producciones = await Produccion.findByIdAndUpdate(id, { estado: 1 }, { new:true });
            res.json({producciones});
        } catch (error){
            res.json({ error });
        }
    },

    //Método para inactivar una produccion
    putProduccionesInactivar: async (req, res) => {
        try{
            const { id } = req.params;
        const producciones = await Produccion.findByIdAndUpdate(id, { estado: 0 }, { new:true });
        res.json({ producciones });
        } catch (error){
            res.json({ error });
        }
    },
};

export default httpProducciones;