import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
// types
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

import axiosCliente from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  // tareas de un proyecto

  // fn to FormTarea, Tarea & Proyecto
  const obtenerTareas = async (proyecto) => {
    try {
     const response = await axiosCliente.get('/api/tareas',{params:{proyecto}});
      dispatch({
        type: TAREAS_PROYECTO,
        payload: response.data.tareas
      });
    } catch (error) {
      console.log(error.response);
    }
    
  };

  // fn to FormTarea
  const agregarTarea = async (tarea) => {
    try {
      const response = await axiosCliente.post('api/tareas',tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: response.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // fn to FormTarea
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  // fn to Tarea
  const eliminarTarea = async(id, proyecto) => {
    
    try {

      await axiosCliente.delete(`/api/tareas/${id}`,{params:{proyecto}});

      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
 // fn to Tarea
 const actualizarTarea = async(tarea) => {
  try {
    const response = await axiosCliente.put(`/api/tareas/${tarea._id}`,tarea);
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: response.data.tarea,
    });
  } catch (error) {
    console.log(error);
  }
};
  // fn to Tarea
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  // fn to FormTarea
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}>
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;

/**TODO: values to componentes hijos
  
   tareas to: 
   tareasproyecto to: ListadoTareas
   errortarea to: FormTarea
   tareaseleccionada to: FomTarea
  
 */
