import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NewProyecto = () => {
  // Obtener state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const handleOnChange = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const handleonSubmit = (e) => {
    e.preventDefault();
    // validar proyecto
    if (nombre === "") return mostrarError();
    // agregar al state principal - ProyectoState
    agregarProyecto(proyecto);
    // reiniciar form
    setProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type='button'
        className='btn btn-block btn-primario'
        onClick={() => mostrarFormulario()}>
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className='formulario-nuevo-proyecto' onSubmit={handleonSubmit}>
          <input
            type='text'
            className='input-text'
            placeholder='Nombre proyecto'
            name='nombre'
            value={nombre}
            onChange={handleOnChange}
          />
          <input
            type='submit'
            className='btn btn-primario btn-block'
            value='Agregar proyecto'
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className='mensaje error'>El nombre del proyecto es OBLIGATORIO</p>
      ) : null}
    </Fragment>
  );
};

export default NewProyecto;
