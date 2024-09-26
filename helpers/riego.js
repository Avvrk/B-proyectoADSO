import Riego from '../models/riego.js';
import Cultivo from '../models/cultivos.js';
import Empleado from '../models/empleados.js';
import validator from 'validator';

const { isMongoId } = validator;

function dateValido(dateString) {
    const registroTiempo = Date.parse(dateString);
    if (isNaN(registroTiempo)) {
        return false;
    }

    const fecha = new Date(dateString);
    const formatoFecha = fecha.toISOString().split("T")[0];
    return dateString === formatoFecha;
}

const helpersRiego = {
    validarRiegoId: async (riego_id) => {
        const existe = await Riego.findById(riego_id);
        if (!existe) {
            throw new Error("El riego con ID " + { riego_id } + "no existe.");
        }
    },

    validarCultivoId: async (cultivo_id) => {
        const existe = await Cultivo.findById(cultivo_id);
        if (!existe) {
            throw new Error("El cultivo con ID " + { cultivo_id } + "no existe.");
        }
    },

    validarEmpleadoId: async (empleado_id) => {
        const existe = await Empleado.findById(empleado_id);
        if (!existe) {
            throw new Error("El empleado con ID " + { empleado_id } + "no existe.");
        }
    },

    validarFecha: (fecha) => {
        console.log("Fecha: ", fecha);
        console.log("Fecha: ", typeof fecha);
        
        if (!fecha) {
            throw new Error("La fecha es requerida.");
        }
        if (isNaN(Date.parse(fecha))) {
            throw new Error("La fecha no es válido");
        }

        return true
    },

    validarEstadoFenologico: (estado) => {
        const estadosValidos = ['Inicial', 'Floracion', 'Cosecha'];
        if (!estadosValidos.includes(estado)) {
            throw new Error("El estado fenológico debe ser uno de los siguientes: Inicial, Floracion o Cosecha");
        }
        return true
    },

    // validarHora: (hora) => {
    //     const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    //     if (!horaRegex.test(hora)) {
    //         throw new Error('La hora no es válida. Debe estar en el formato HH:MM.');
    //     }
    //     return true
    // },
    

    validarDosis : (dosis) => {
        if (dosis < 0) {
            throw new Error('La dosis debe ser un número positivo.');

        }
        return true
    },

    validarCantidadAgua: (cantidad) => {
        if (cantidad< 0) {
            throw new Error('La cantidad de agua debe ser un número positivo.');
        }

        return true
    },

    validarEstado: (estado) => {
        if (![0, 1].includes(estado)) {
            throw new Error('El estado debe ser 0 (inactivo) o 1 (activo).');
        }
    }

};



export default helpersRiego;