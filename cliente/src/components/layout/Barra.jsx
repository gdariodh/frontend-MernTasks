import React,{useContext, useEffect} from 'react';
import AuthContext from "../../context/auth/authContext";

const Barra = () => {

   const authContext = useContext(AuthContext);
   const { usuario, usuarioAuth, cerrarSesion } = authContext;

   useEffect(()=>{
      usuarioAuth();
      // eslint-disable-next-line
   },[])

    return ( 
        <header className='app-header'>
        {
           usuario 
           ?(<p className='nombre-usuario'>Hola! <span>{usuario.nombre}</span></p>) 
           : null
        }
         
           <nav className='nav-principal'>
              <button
              className='btn btn-blank cerrar-sesion'
              onClick={() => cerrarSesion()}
              >Cerrar sesion</button>

           </nav>


        </header>
     );
}
 
export default Barra;