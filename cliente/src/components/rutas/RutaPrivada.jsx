import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  /**componente que protege una ruta privada, en este caso 
     si el usuario no tiene las credenciales, no puede acceder al componente de proyectos*/

  const authContext = useContext(AuthContext);
  const { auth, cargando, usuarioAuth } = authContext;

  // fn para evitar que redirija cuando se recarga la pagina
  useEffect(() => {
    usuarioAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !auth && !cargando ? <Redirect to={"/"} /> : <Component {...props} />
      }
    />
  );
};

export default RutaPrivada;
