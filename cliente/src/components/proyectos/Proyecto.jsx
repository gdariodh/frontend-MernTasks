import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {obtenerTareas} = tareasContext;

  const handleFn = id => {
    proyectoActual(id); // fijar un proyecto actual
    obtenerTareas(id);  // filtrar tareas de un proyecto 
  }

  return (
    <li>
      <button
        type='button'
        className='btn btn-blank'
        onClick={() => handleFn(proyecto._id)}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
