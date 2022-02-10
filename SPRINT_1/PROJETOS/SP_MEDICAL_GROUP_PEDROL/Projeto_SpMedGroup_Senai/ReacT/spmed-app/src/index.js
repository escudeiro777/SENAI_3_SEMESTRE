import React from 'react';
import ReactDOM from 'react-dom';

import Home from './pages/Home/App';
import Login from './pages/Login/Login';
import Perfil from './pages/Perfil/Perfil.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Clinicas from './pages/Clinicas/Clinicas.jsx';
import Consultas from './pages/Consultas/Consultas';
import Administracao  from './pages/Administracao/Administracao';

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';


import reportWebVitals from './reportWebVitals';

const Routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Clinicas" element={<Clinicas />} /> 
        <Route path="/Consultas" element={<Consultas />} />
        <Route path="/Administracao" element={<Administracao />} />
      </Routes>
    </div>
  </Router>
)

ReactDOM.render(
  Routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
