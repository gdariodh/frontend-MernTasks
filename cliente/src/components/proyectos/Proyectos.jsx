import React, { useEffect, useContext } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
// importamos funciones para cuando el usuario recarga
import AuthContext from "../../context/auth/authContext";

const Proyectos = () => {
  // fn para mantener la sesion del usuario, cuando recarga -- fn enlazada con la de app.js
  const authContext = useContext(AuthContext);
  const { usuarioAuth } = authContext;

  useEffect(() => {
    usuarioAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='contenedor-app'>
      <Sidebar />

      <div className='seccion-principal'>
        <Barra />
        <main>
          <FormTarea />

          <div className='contenedor-tareas'>
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
