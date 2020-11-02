import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  // state local
  const [tarea, setTarea] = useState({ nombre: "" });
  const { nombre } = tarea;

  const tareasContext = useContext(TareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) setTarea(tareaseleccionada);
    else setTarea({ nombre: "" });
  }, [tareaseleccionada]);

  if (!proyecto) return null;
  // Array Destructuring
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validar
    if (nombre.trim() === "") return validarTarea();

    // revisar si es edicion o creacion de una tarea
    if (tareaseleccionada === null) {
      // tarea nueva
      // agregar propiedades al objeto para que sea de un solo proyecto
      tarea.proyecto = proyectoActual._id; // id del proyecto
      // agregar tarea al state principal de tareas
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);
      limpiarTarea();
    }

    obtenerTareas(proyectoActual.id);
    // resetear form
    setTarea({
      nombre: "",
    });
  };

  return (
    <div className='formulario'>
      <form onSubmit={handleSubmit}>
        <div className='contenedor-input'>
          <input
            type='text'
            className='input-text'
            placeholder='Nombre tarea...'
            name='nombre'
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className='contenedor-input'>
          <input
            type='submit'
            className='btn btn-primario btn-block'
            value={tareaseleccionada ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className='mensaje error'>El nombre de la tarea es OBLIGATORIO</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
