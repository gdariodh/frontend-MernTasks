import { MOSTRAR_ALERTA, ESCONDER_ALERTA } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        alerta: action.payload,
      };

    case ESCONDER_ALERTA:
      return {
        alerta: null,
      };

    default:
      return state;
  }
};
