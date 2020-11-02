import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";
import Proyectos from "./components/proyectos/Proyectos";
// Prinicipal States
import ProyectoState from "./context/proyectos/ProyectoState";
import TareaState from "./context/tareas/TareaState";
import AlertaState from "./context/alertas/AlertaState";
import AuthState from "./context/auth/AuthState";
// componente que protege la ruta de proyectos 
import RutaPrivada from './components/rutas/RutaPrivada';
// fn para que mantenga la sesion cuando se recarga
import tokenAuth from './config/token';
// revisar si hay un token - fn enlazada con proyectos.jsx
const token = localStorage.getItem('token');
if(token)tokenAuth(token);

function App() {
  
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/new-user' component={NewUser} />
                <RutaPrivada exact path='/proyectos' component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
