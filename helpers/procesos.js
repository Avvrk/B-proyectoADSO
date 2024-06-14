import validator from 'validator';
import Cultivo from '../Models/Cultivos.js';
import Empleado from '../models/Empleado.js';

const { isMongoId } = validator;

// Función para validar si una cadena de texto es una fecha válida
function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }
    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split("T")[0];
    return dateString === formatoFecha;
}

const helpersProcesos = {
    //Valida que el ID del cultivo sea un MongoID válido y que exista en la base de datos.
    ValidarIDCultivo: async (cultivo_id) => {
        if (cultivo_id != undefined) {
            if (!isMongoId(cultivo_id)) {
                throw new Error("El campo cultivo_id debe ser un MongoID válido.")
            }
            try {
                const buscarcultivo = await Cultivo.findById(cultivo_id);
                if (buscarcultivo == undefined) {
                    throw new Error("El cultivo no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el cultivo en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo cultivo_id es obligatorio.")
        }
    },

    //Valida que el ID del cultivo sea un MongoID válido y que exista en la base de datos.
    validarIDEmpleado: async (empleado_id) => {
        if (empleado_id != undefined) {
            if (!isMongoId(empleado_id)) {
                throw new Error("El campo empleado_id debe ser un MongoID válido.")
            }
            try {
                const buscarEmpleado = await Empleado.findById(empleado_id);
                if (buscarEmpleado == undefined) {
                    throw new Error("El empleado no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el empleado en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo empleado_id debe ser un MongoID válido.")
        }
    },

    //valida que el tipo no esté vacío y esté definido
    validarTipo: async (tipo) => {
        if (tipo != undefined) {
            if (typeof tipo !== 'string' || tipo.trim() == "") {
                throw new Error("El tipo no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            throw new Error("El tipo es un campo obligatorio.")
        }
    },

    //Valida que la descripcion no esté vacío y esté definido.
    validarDescripcion: async (descripcion) => {
        if (descripcion != undefined) {
            if (typeof descripcion !== 'string' || descripcion.trim() == "") {
                throw new Error("La descripción no debe estar vacía.");
            } else {
                return true;
            }
        } else {
            throw new Error("La descripción es un campo obligatorio.")
        }
    },

    //Valida que el campo fecha de inicio sea una fecha válida y no esté vacío.
    validarFechaInicio: (fecha_inicio) => {
        if (fecha_inicio !== undefined) {
            if (!dateValido(fecha_inicio)) {
                throw new Error("El campo fecha_inicio debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("La fecha_inicio es un campo obligatorio.");
        }
    },

    //Valida que el campo fecha final sea una fecha válida.
    validarFechaFinal: (fecha_final) => {
        if (!dateValido(fecha_final)) {
            throw new Error("El campo fecha_final debe ser una fecha válida.");
        } else {
            return true;
        }
    },


};



export default helpersProcesos;