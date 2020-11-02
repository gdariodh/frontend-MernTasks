import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENERUSUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESSION,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        mensaje: null,
        cargando:false
      };

    case CERRAR_SESSION:  
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        usuario:null,
        auth:null,
        mensaje: action.payload,
        cargando:false
      };

    case OBTENERUSUARIO:
      return {
        ...state,
        auth: true,
        usuario: action.payload,
        cargando:false
      };

    default:
      return state;
  }
};
