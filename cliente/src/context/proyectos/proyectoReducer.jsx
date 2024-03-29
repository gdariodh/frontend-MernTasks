import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELMINAR_PROYECTO,
  ERROR_PROYECTO
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };

    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };

    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
        errorformulario: false,
      };

    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorformulario: true,
      };

    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };

      case ELMINAR_PROYECTO:
        return{
          ...state,
          proyectos: state.proyectos.filter(
            (proyecto) => proyecto._id !== action.payload
          ),
          proyecto:null
        }

        case ERROR_PROYECTO:
          return{
            ...state,
            mensaje:action.payload
          }

    default:
      return state;
  }
};
