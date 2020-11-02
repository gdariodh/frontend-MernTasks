import React,{useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from '../../context/auth/authContext';

const Login = ({history}) => {

  const authContext = useContext(AuthContext);
  const {mensaje, auth, iniciarSesion } = authContext;

  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext;

  useEffect(()=>{
    if(auth) history.push('/proyectos');
    if(mensaje) mostrarAlerta(mensaje.msg,mensaje.categoria);
    // eslint-disable-next-line
  },[mensaje,auth,history]);

  const [user, setUser]= useState({
      email:'',
      password:''
  });

  const { email, password } = user;



  const handleOnChange = e => {
      setUser({
          ...user,
          [e.target.name]:e.target.value
      })
  };

  const handleOnSubmit = e => {
      e.preventDefault();

      // validar campos vacios
      if(email.trim() === '' || password.trim()===''){
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        return;
      }

      if(password.length < 6){
       mostrarAlerta('El password debe tener al menos 6 caracteres','alerta-error');
       return; 
      }
      // pasar al action
      iniciarSesion(user);
  }

  return (
    <div className='form-usuario'>
    {
      alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null
    }
      <div className='contenedor-form sombra-dark'>
        <h1>Iniciar sesion</h1>

        <form
        onSubmit={handleOnSubmit}
        >
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Tu email'
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className='campo-form'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Tu password'
              value={password}
              onChange={handleOnChange}
            />
          </div>

          <div className='campo-form'>
            <input
                type='submit'
                className='btn btn-primario btn-block'
                value='Iniciar Sesion'
            />
          </div>
        </form>

        <Link to={'/new-user'} className='enlace-cuenta'>
            Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
