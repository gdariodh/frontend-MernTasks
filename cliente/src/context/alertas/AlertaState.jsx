import React,{useReducer} from 'react';
import { MOSTRAR_ALERTA, ESCONDER_ALERTA } from "../../types";
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';

const AlertaState = (props) => {
    const initialState = {
        alerta: null
    };

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    // functions
    // To NewUser
    const mostrarAlerta = (msg,categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(() => {
             dispatch({
                 type:ESCONDER_ALERTA
             })
        }, 5000);
    }

    return(
        <alertaContext.Provider
        value={{
          alerta: state.alerta,
          mostrarAlerta
        }}
        >
          {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;
