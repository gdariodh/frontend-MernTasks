import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import axiosCliente from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENERUSUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESSION,
} from "../../types";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    auth: null,
    usuario: null,
    mensaje: null,
    cargando:true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // fns

  // to NewUser
  const registrarUsuario = async (datos) => {
    try {
      const response = await axiosCliente.post("/api/usuarios", datos);
      console.log(response);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: response.data
      });

      // Obtener usuario registrado
      usuarioAuth();

    } catch (error) {
      //console.log(error.response.data.msg);
      // extraemos los mensajes del backend
      const alerta = {
        msg:error.response.data.msg,
        categoria:'alerta-error'
      }

      dispatch({
        type: REGISTRO_ERROR,
        payload:alerta
      });
    }
  };

  // obtener el usuario autenticado! 
  const usuarioAuth = async() => {
    const token = localStorage.getItem('token');
    if(token){
      //TODO: fn para enviar el token por headers
      tokenAuth(token);
    }

    try {
      const response = await axiosCliente('/api/auth');
      //console.log(response);
      dispatch({
        type: OBTENERUSUARIO,
        payload: response.data.usuario
      })
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  // cuando el usuario inicia sesion - to Login
  const iniciarSesion = async datos => {
    try {
      const response = await axiosCliente.post('/api/auth',datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: response.data
      });

      usuarioAuth();

    } catch (error) {
      console.log(error.response.data.msg);
      // extraemos los mensajes del backend
      const alerta = {
        msg:error.response.data.msg,
        categoria:'alerta-error'
      }

      dispatch({
        type: LOGIN_ERROR,
        payload:alerta
      });
    }
  }

  // cierra sesion to Barra
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESSION,
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando:state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAuth,
        cerrarSesion
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthState;

/**Childrens
 auth: NewUser, Login
 mensaje: NewUser, Login
  usuario: to Barra.jsx
  usuarioAuth: To Proyectos.jsx, Barra.jsx, RutaPrivada.jsx
  cargando: To RutaPrivada
*/
