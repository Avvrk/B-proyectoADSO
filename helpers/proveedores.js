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

    validarEmailPut : async (email = '', id) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validar que el campo email no esté vacío
        if (!email.trim()) {
            throw new Error("El campo email no puede estar vacío.");
        }
        
        // Validar el formato del email
        if (!emailRegex.test(email)) {
            throw new Error('El email no es válido');
        }
        
        // Buscar un proveedor con el mismo email pero con un ID diferente al que se está editando
        const emailExistente = await Proveedor.findOne({
            email,
            _id: { $ne: id }  // Excluye el proveedor con el ID actual de la búsqueda
        });
        
        if (emailExistente) {
            throw new Error(`El email ${email} ya se encuentra registrado.`);
        }
    },    

    validarDireccion: (direccion) => {
        if (direccion === undefined || direccion === null || typeof direccion !== 'string' || direccion.trim() === "") {
            throw new Error("El campo dirección es obligatorio y debe ser una cadena de texto no vacía.");
        }
    
        // Verificar que la dirección tenga al menos 5 caracteres
        if (direccion.trim().length < 5) {
            throw new Error("La dirección debe tener al menos 5 caracteres.");
        }
    
        // Verificar que la dirección no sea solo números
        if (/^\d+$/.test(direccion.trim())) {
            throw new Error("La dirección no puede ser solo un número.");
        }
    
        return true; // Si pasa todas las validaciones
    },    

    validarTelefono: (telefono) => {
        if (telefono !== undefined && telefono !== null) {
            // Verificar si el teléfono es un número o una cadena numérica
            if (typeof telefono !== 'string' || !/^\d+$/.test(telefono.trim())) {
                throw new Error("El campo teléfono debe ser un número válido.");
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