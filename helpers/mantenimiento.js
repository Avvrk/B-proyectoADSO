import validator from "validator";
import Gasto from '../models/gastos.js';
import Herramienta from '../models/maquinaria_herramientas.js';

const { isMongoId } = validator;

const helpersMantenimiento = {

    validarFecha: (fecha) => {
        if (fecha !== undefined) {
            // Intenta convertir el valor en una fecha
            const fechaConvertida = new Date(fecha);
    
            // Verifica si la conversión resultó en una fecha válida
            if (isNaN(fechaConvertida.getTime())) {
                throw new Error("El campo fecha debe ser una fecha válida.");
            } else {
                return true;
            }
        } else {
            throw new Error("La fecha es obligatoria.");
        }
    },    

    validarVerificacionRealizada: (verificacionRealizada) => {
        if (verificacionRealizada !== undefined) {
            if (typeof verificacionRealizada !== 'string' || verificacionRealizada.trim() === "") {
                throw new Error("El campo verificación realizada no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarCalibracion: (calibracion) => {
        if (calibracion !== undefined) {
            if (typeof calibracion !== 'string' || calibracion.trim() === "") {
                throw new Error("El campo calibración no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarResponsable: (responsable) => {
        if (responsable !== undefined) {
            if (typeof responsable !== 'string' || responsable.trim() === "") {
                throw new Error("El campo responsable no debe estar vacío.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarObservaciones: (observaciones) => {
        if (observaciones !== undefined) {
            if (typeof observaciones !== 'string' || observaciones.trim() === "") {
                throw new Error("Las observaciones no deben estar vacías.");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarEstado: (estado) => {
        if (estado !== undefined) {
            if (![0, 1].includes(Number(estado))) {
                throw new Error("El estado debe ser 0 (inactivo) o 1 (activo).");
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    validarIdGastos: async (gastos_id) => {
        if (gastos_id !== undefined) {
            if (!isMongoId(gastos_id)) {
                throw new Error("El campo gastos_id debe ser un mongoId válido.");
            }
            try {
                const buscarGasto = await Gasto.findById(gastos_id);
                if (!buscarGasto) {
                    throw new Error("El gasto no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar el gasto en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo gastos_id es obligatorio.");
        }
    },

    validarIdHerramienta: async (id_herramienta) => {
        if (id_herramienta !== undefined) {
            if (!isMongoId(id_herramienta)) {
                throw new Error("El campo id_herramienta debe ser un mongoId válido.");
            }
            try {
                const buscarHerramienta = await Herramienta.findById(id_herramienta);
                if (!buscarHerramienta) {
                    throw new Error("La herramienta no existe.");
                } else {
                    return true;
                }
            } catch (error) {
                throw new Error("Error al buscar la herramienta en la base de datos: " + error.message);
            }
        } else {
            throw new Error("El campo id_herramienta es obligatorio.");
        }
    }
};

export default helpersMantenimiento;