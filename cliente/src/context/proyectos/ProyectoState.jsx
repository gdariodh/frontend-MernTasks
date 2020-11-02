import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
// types
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELMINAR_PROYECTO,
  ERROR_PROYECTO,
} from "../../types";
import axiosCliente from "../../config/axios";

const ProyectoState = (props) => {
  const inicialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };
  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, inicialState);

  // funciones para el CRUD - fn to indica a donde envie las props
  // fn to NewProyecto
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };
  // fn to ListadoProyectos
  const obtenerProyectos = async () => {
    try {
      const response = await axiosCliente("/api/proyectos");
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: response.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };
  // fn to NewProyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const response = await axiosCliente.post("/api/proyectos", proyecto);
      // agregar proyecto
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: response.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };
  // fn to NewProyecto
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  // seleccionar un proyecto por su id
  // fn to Proyecto
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };
  // fn to ListadoTareas
  const eliminarProyecto = async (proyectoId) => {
    try {
      await axiosCliente.delete(`/api/proyectos/${proyectoId}`);

      dispatch({
        type: ELMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: ERROR_PROYECTO,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}>
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;

/** TODO:  values to componentes hijos 
 
   proyectos to : ListadoProyectos
   formulario to : NewProyecto,
   errorformulario to : NewProyecto,
   proyecto to:  FormTarea, ListadoTareas, Tarea
   mensaje: to ListadoProyectos
 */
