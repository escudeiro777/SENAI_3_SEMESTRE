import { useState, useEffect } from "react";
import axios from 'axios';
import '../../Css/Perfil.css';
import Footer from '../../Components/Footer/Footer.jsx';
import Header from '../../Components/Header/Header.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { TokenConvertido, UsuarioAutenticado } from '../../Services/auth.js'
import ImgPerfil from '../../Components/PerfilFoto/PerfilFoto.jsx'

export default function Perfil() {
    const [Nome, setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [Cpf, setCpf] = useState('');
    const [Idade, setIdade] = useState(0);
    const [Endereco, setEndereco] = useState('');
    const [Rg, setRg] = useState('');
    const [MsgErro, setMsgErro] = useState('');
    document.title = 'SpMed - Perfil';
    let Navigate = useNavigate();

    function CalcularIdade(DataDeNascimento) {
        let DataAtual = new Date();
        let Data = DataDeNascimento.split('T');
        let Ano = Data[0].split('-')[0];
        let Mes = Data[0].split('-')[1];
        let Dia = Data[0].split('-')[2];
        var Idade = 0;

        if (parseInt(Ano) >= DataAtual.getFullYear()) {
            Idade = 0;
        }
        else if (parseInt(Mes) > DataAtual.getMonth()) {
            Idade = ((DataAtual.getFullYear() - parseInt(Ano)) - 1);
        }
        else if (parseInt(Mes) === DataAtual.getMonth()) {
            if (parseInt(Dia) <= DataAtual.getDay()) {
                Idade = (DataAtual.getFullYear() - parseInt(Ano));
            }
            else {
                Idade = ((DataAtual.getFullYear() - parseInt(Ano)) - 1);
            }
        }
        else {
            Idade = (DataAtual.getFullYear() - parseInt(Ano))
        }
        return Idade;
    }

    function AlterarImagem(Img) {
        const DadosFormulario = new FormData();
        DadosFormulario.append('img', Img);
        axios.post('http://192.168.6.108:5000/api/Perfis', DadosFormulario, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setTimeout(() => {
                        setMsgErro('');
                        window.location.reload();
                    }, 2000);
                }
            })
            .catch((erro) => {
                if (erro.toJSON().status === 400) {
                    setMsgErro('Verifique se o arquivo é da extensão .png, .jpg ou .jpeg e se possui menos de 10MB');
                }
                else{
                    localStorage.removeItem('usuario-login');
                    Navigate('/Login')
                }
            })
    }

    function Logout() {
        localStorage.removeItem('usuario-login');
        Navigate('/Login');
    }

    function BuscarDados() {
        axios('http://192.168.6.108:5000/api/Usuarios/' + TokenConvertido().jti,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
            .then((resposta) => {
                setNome(resposta.data.nome);
                setEmail(resposta.data.email);
                setIdade(CalcularIdade(resposta.data.dataDeNascimento));
                if (resposta.data.paciente !== undefined) {
                    setTelefone(resposta.data.paciente.telefone);
                    setCpf(resposta.data.paciente.cpf);
                    setEndereco(resposta.data.paciente.endereco);
                    setRg(resposta.data.paciente.rg);
                }
            }
            ).catch( (erro) => {
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            });
    }

    useEffect(BuscarDados, [])

    return (
        <div>
            <Header></Header>
            <main class="MainPerfil">
                <section class="Perfil">
                    <div class="ContainerGrid ContainerPerfil">
                        <h1>{Nome}</h1>
                        <span className="MsgErro">{MsgErro}</span>
                        <div class="InfosPerfil">
                            <ImgPerfil></ImgPerfil>
                            <div class="ColunaInfosPerfil">
                                <div class="CampoInfosPerfil">
                                    <h2>Email:</h2>
                                    <span>{Email}</span>
                                </div>
                                <div class="CampoInfosPerfil">
                                    <h2>Telefone:</h2>
                                    <span>{Telefone}</span>
                                </div>
                                <div class="CampoInfosPerfil">
                                    <h2>CPF:</h2>
                                    <span>{Cpf}</span>
                                </div>
                            </div>
                            <div class="ColunaInfosPerfil">
                                <div class="CampoInfosPerfil">
                                    <h2>Idade:</h2>
                                    <span>{Idade}</span>
                                </div>
                                <div class="CampoInfosPerfil">
                                    <h2>Endereço:</h2>
                                    <span>{Endereco}</span>
                                </div>
                                <div class="CampoInfosPerfil">
                                    <h2>RG:</h2>
                                    <span>{Rg}</span>
                                </div>
                            </div>
                        </div>
                        <div class="LinksPerfil">
                            <label for="AltImg" class="PerfilAltImg">Alterar imagem de perfil</label>
                            <input type="file" id="AltImg" onChange={(ImgInput) => AlterarImagem(ImgInput.target.files[0])}></input>
                            <button class="PerfilLogout" onClick={Logout}>Logout</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}