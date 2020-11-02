import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

const NewUser = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { auth, mensaje, registrarUsuario } = authContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    // history = children de router-dom -> redireccion = history.push
    if (auth) history.push("/proyectos");
    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
    // eslint-disable-next-line
  }, [auth, mensaje, history]);

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = user;
  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // validar campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      return mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    // password minimo de 6 caracteres
    if (password.length < 6) {
      return mostrarAlerta(
        "El password debe tener al menos 6 caracteres",
        "alerta-error"
      );
    }

    // revisar si los ambos password son iguales
    if (password !== confirmar) {
      return mostrarAlerta("Los passwords no son iguales", "alerta-error");
    }

    // pasar al action
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className='form-usuario'>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className='contenedor-form sombra-dark'>
        <h1>Obtener cuenta</h1>

        <form onSubmit={handleOnSubmit}>
          <div className='campo-form'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              placeholder='Tu nombre'
              value={nombre}
              onChange={handleOnChange}
            />
          </div>

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
            <label htmlFor='confirmar'>Confimar Password</label>
            <input
              type='password'
              id='confirmar'
              name='confirmar'
              placeholder='Repite tu password'
              value={confirmar}
              onChange={handleOnChange}
            />
          </div>

          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Registrarme'
            />
          </div>
        </form>

        <Link to={"/"} className='enlace-cuenta'>
          Login
        </Link>
      </div>
    </div>
  );
};

export default NewUser;
