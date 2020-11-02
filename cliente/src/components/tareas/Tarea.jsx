import React, { useContext } from "react";
import TareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  // Array destructing de la prop
  const { nombre, estado } = tarea;

  const tareasContext = useContext(TareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual,
  } = tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Array Destructuing del objeto del context
  const [proyectoActual] = proyecto;

  const handleEliminar = (id) => {
    eliminarTarea(id,proyectoActual._id);
    // actualiza tareas cuando se elimina una tarea
    obtenerTareas(proyectoActual.id);
  };

  const handleEstado = (tarea) => {
    if (tarea.estado) tarea.estado = false;
    else tarea.estado = true;
    actualizarTarea(tarea);
  };

  // agrega una tarea actual cuando el usuario quiere editarla
  const handleTareaActual = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className='tarea sombra'>
      <p>{nombre}</p>
      <div className='estado'>
        {estado ? (
          <button
            type='button'
            className='completo'
            onClick={() => handleEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button
            type='button'
            className='incompleto'
            onClick={() => handleEstado(tarea)}>
            incompleto
          </button>
        )}
      </div>

      <div className='acciones'>
        <button
          type='button'
          className='btn btn-primario'
          onClick={() => handleTareaActual(tarea)}>
          Editar
        </button>
        <button
          type='button'
          className='btn btn-secundario'
          onClick={() => handleEliminar(tarea._id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
