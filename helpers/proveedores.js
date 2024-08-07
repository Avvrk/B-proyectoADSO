import validator from 'validator';
import Proveedor from '../models/proveedores.js';

const { isMongoId } = validator;

const helpersproveedores = {

    validarProveedorID : async (proveedor_id) => {
        if (proveedor_id !== undefined){
            if (!isMongoId(proveedor_id)){
                throw new Error("El campo proveedor_id debe ser un MongoID válido.");
            }
            try{
                const proveedor = await Proveedor.findById(proveedor_id);
                if (!proveedor){
                    throw new Error ("El proveedor no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error ("Error al buscar el proveedor en la base de datos: " + error.message);
            }
        } else {
            throw new Error ("El campo proveedor_id es obligatorio.");
        }
    },

    validarNombre : async (nombre = '') => {
        if(!nombre.trim()){
            throw new Error("El campo nombre no puede estar vacío.")
        }
        const nombreExistente = await Proveedor.findOne({nombre});
        if (nombreExistente){
            throw new Error ("El nombre " + {nombre} + "ya se encuentra registrado.");
        }
    },

    validarEmail : async (email = '') =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()){
            throw new Error("El campo email no puede estar vacío.");
        }
        if (!emailRegex.test(email)){
            throw new Error ('El email no es válido')
        }
        const emailExistente = await Proveedor.findOne({email});
        if (emailExistente) {
            throw new Error ("El email " + {email} + "ya se encuentra registrado.");
        }
    },

    validarDireccion : (direccion) =>{
        if (direccion == undefined ){
            throw new Error ("El campo dirección es obligatorio.");
        }
    },

    validarTelefono : (telefono) => {
        if (unidad !== undefined){
            if(typeof telefono !== 'number' || telefono.trim() === ""){
                throw new Error ("El campo teléfono debe ser válido.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarEstado : (estado) => {
        if (estado != undefined){
            if (![0, 1].includes(Number(estado))){
                throw new Error ("El campo estado debe ser 0 (inactivo) o 1 (activo).");
            }
        }
    }

};

export default helpersproveedores;