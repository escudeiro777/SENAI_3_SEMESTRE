import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets_/LogoPadrao.png'
import '../../Css/HeaderEFooter.css'
import { TokenConvertido, UsuarioAutenticado } from '../../Services/auth.js'
import ImgPerfil from '../PerfilFoto/PerfilFoto.jsx'

export default class Header extends Component {
    render() {
        // if (UsuarioAutenticado() === false) {
        //     return (
        //         <header>
        //             <div class="ContainerGrid ContainerHeader">
        //                 <Link to="/">
        //                     <img class="LogoHeader" src={Logo} alt="Logo da empresa SpMedicalGroup" />
        //                 </Link>
        //                 <nav class="NavHeader">
        //                     {
        //                         document.title === "SpMed - Home" ?
        //                             <Link to="/" class="LinkPaginaAtual">Início</Link> : <Link to="/" class="LinkPagina">Início</Link>
        //                     }
        //                     {
        //                         document.title === "SpMed - Clinicas" ?
        //                         <Link to="/Clinicas" class="LinkPaginaAtual">Clínicas parceiras</Link> : <Link to="/Clinicas" class="LinkPagina">Clínicas parceiras</Link>
        //                     }
        //                     <Link to="/Login" class="LinkPagina">Minhas Consultas</Link>
        //                     {
        //                         document.title === "SpMed - Login" ?
        //                             <Link to="/Login" class="LinkPaginaAtual">Login</Link> : <Link to="/Login" class="LinkPagina">Login</Link>
        //                     }
        //                 </nav>
        //             </div>
        //         </header>
        //     )
        // }
        // else if (TokenConvertido().Role === "1") {
            return (
                <header>
                    <div class="ContainerGrid ContainerHeader">
                        <Link to="/">
                            <img class="LogoHeader" src={Logo} alt="Logo da empresa SpMedicalGroup" />
                        </Link>
                        <nav class="NavHeader">
                            {
                                document.title === "SpMed - Home" ?
                                    <Link to="/" class="LinkPaginaAtual">Início</Link> : <Link to="/" class="LinkPagina">Início</Link>
                            }
                            {
                                document.title === "SpMed - Clinicas" ?
                                <Link to="/Clinicas" class="LinkPaginaAtual">Clínicas</Link> : <Link to="/Clinicas" class="LinkPagina">Clínicas</Link>
                            }
                            {
                                document.title === "SpMed - Consultas" ?
                                <Link to="/Consultas" class="LinkPaginaAtual">Consultas</Link> : <Link to="/Consultas" class="LinkPagina">Consultas</Link>
                            }
                            {
                                document.title === "SpMed - Administracao" ?
                                <Link to="/Administracao" className="LinkPaginaAtual">Administração</Link> : <Link to="/Administracao" className="LinkPagina">Administração</Link>
                            }
                            {
                                document.title === 'SpMed - Cadastro' ?
                                <Link to="/Cadastro" class="LinkPaginaAtual">Cadastro</Link> : <Link to="/Cadastro" class="LinkPagina">Cadastro</Link>
                            }
                            <Link to="/Perfil" class="LinkImagem"> <ImgPerfil></ImgPerfil> </Link>
                        </nav>
                    </div>
                </header>
            )
    //     }
    //     else if (TokenConvertido().Role === "2" || TokenConvertido().Role === "3") {
    //         return (
    //             <header>
    //                 <div class="ContainerGrid ContainerHeader">
    //                     <Link to="/">
    //                         <img class="LogoHeader" src={Logo} alt="Logo da empresa SpMedicalGroup" />
    //                     </Link>
    //                     <nav class="NavHeader">
    //                         {
    //                             document.title === "SpMed - Home" ?
    //                                 <Link to="/" class="LinkPaginaAtual">Início</Link> : <Link to="/" class="LinkPagina">Início</Link>
    //                         }
    //                         {
    //                             document.title === "SpMed - Clinicas" ?
    //                             <Link to="/Clinicas" class="LinkPaginaAtual">Clínicas parceiras</Link> : <Link to="/Clinicas" class="LinkPagina">Clínicas parceiras</Link>
    //                         }
    //                         {
    //                             document.title === "SpMed - Consultas" ?
    //                             <Link to="/Consultas" class="LinkPaginaAtual">Minhas Consultas</Link> : <Link to="/Consultas" class="LinkPagina">Minhas Consultas</Link>
    //                         }
    //                         <Link to="/Perfil" class="LinkImagem"> <ImgPerfil></ImgPerfil> </Link>
    //                     </nav>
    //                 </div>
    //             </header>
    //         )
    //     }
    }
}