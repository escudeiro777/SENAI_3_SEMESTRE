import React, { Component } from 'react';
import Logo from '../../assets_/logo_spmedgroup_v2 1.png'
import '../../Css/HeaderEFooter.css'

export default class Rodape extends Component {
    render() {
        return (
            <footer>
                <div class="ContainerGrid ContainerFooter">
                    <div class="BoxFooterEsquerda">
                        <span>Links de apoio</span>
                        <ul>
                            <li>Link Institucional</li>
                            <li>Link Institucional</li>
                            <li>Link Institucional</li>
                            <li>Link Institucional</li>
                        </ul>
                    </div>
                    <img src={Logo} alt="Logo da empresa SpMedicalGroup" />
                    <div class="BoxFooterDireita">
                        <span>Contato</span>
                        <ul>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Email</li>
                            <li>Telefone</li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}