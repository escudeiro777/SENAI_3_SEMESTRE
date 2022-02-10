import { useState, useEffect } from "react";
import axios from 'axios';
import '../../Css/Login.css'
import Footer from '../../Components/Footer/Footer.jsx';
import Header from '../../Components/Header/Header.jsx';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    let Navigate = useNavigate();
    document.title = "SpMed - Login";

    function Entrar(Event){
        Event.preventDefault();

        setIsLoading(true);

        let DadosLogin = {
            email: Email,
            senha: Senha
        }

        axios.post('http://192.168.6.108:5000/api/Login', DadosLogin).then( (resposta) => {
            if (resposta.status == 200) {
                localStorage.setItem('usuario-login', resposta.data.tokenRetorno);
                setIsLoading(false);
                Navigate('/')
            }
        }).catch((erro) => {
            setIsLoading(false);
            window.alert('Email ou senha inválidos, tente novamente')
        })
    }

    return (
        <div>
            <Header></Header>
            <main class="LoginMain">
                <section class="ContainerLogin ContainerGrid">
                    <form onSubmit={Entrar}>
                        <h1>Login</h1>
                        <div class="CampoFormLogin">
                            <label>Email</label>
                            <input type="email" required value={Email} onChange={(EmailInput) => {
                                setEmail(EmailInput.target.value)
                            }}/>
                        </div>
                        <div class="CampoFormLogin">
                            <label>Senha</label>
                            <input type="password" required value={Senha} onChange={(SenhaInput) => {
                                setSenha(SenhaInput.target.value)
                            }}/>
                        </div>

                        {
                            IsLoading === true && 
                            <button class="SubmitFormLogin" type="submit" disabled>Entrando...</button>
                        }
                        {
                            IsLoading === false &&
                            <button class="SubmitFormLogin" type="submit">Entrar</button>
                        }
                    </form>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}