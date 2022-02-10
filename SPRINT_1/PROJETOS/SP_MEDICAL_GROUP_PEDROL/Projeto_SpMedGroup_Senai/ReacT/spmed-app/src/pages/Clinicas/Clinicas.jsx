import { useState, useEffect } from "react";
import axios from 'axios';
import '../../Css/ClinicasParceiras.css';
import Footer from '../../Components/Footer/Footer.jsx';
import Header from '../../Components/Header/Header.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TokenConvertido, UsuarioAutenticado } from '../../Services/auth.js';

export default function Clinicas() {
    document.title = "SpMed - Clinicas";
    const [ListaClinica, setListaClinica] = useState([]);
    const [Endereco, setEndereco] = useState('');
    const [Cnpj, setCnpj] = useState('');
    const [NomeFantasia, setNomeFantasia] = useState('');
    const [RazaoSocial, setRazaoSocial] = useState('');
    const [Abertura, setAbertura] = useState('');
    const [Fechamento, setFechamento] = useState('');
    const [IsLoading, setIsLoading] = useState(false);

    function BuscarClinicas() {
        axios('http://192.168.6.108:5000/api/Clinicas')
            .then((resposta) => {
                if (resposta.status === 200) {
                    setListaClinica(resposta.data);
                }
            })
            .catch((erro) => {
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            })
    }

    function CadastrarClinica(Evento) {
        Evento.preventDefault();
        setIsLoading(true);

        axios.post('http://192.168.6.108:5000/api/Clinicas', {
            "horarioDeAbertura": Abertura,
            "horarioDeFechamento": Fechamento,
            "endereco": Endereco,
            "razaoSocial": RazaoSocial,
            "nomeFantasia": NomeFantasia,
            "cnpj": Cnpj
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then( (resposta) => {
            if (resposta.status === 201) {
                BuscarClinicas();
                setIsLoading(false);
                window.alert('Clinica cadastrada!');
            }
        })
        .catch((erro) => {
            if (erro.toJSON().status == 400) {
                window.alert('O CNPJ ou endereço possivelmente já estão em uso, utilize outros valores nesses campos. Se o erro persistir, busque ajuda do suporte e/ou tente novamente mais tarde.')
            }
            else{
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            }
            setIsLoading(false);
        })
    }

    useEffect(BuscarClinicas, []);
    if (TokenConvertido() !== null) {
        if (TokenConvertido().Role === "1") {
            return (
                <div>
                    <Header></Header>
                    <main class="ClinicaMain">
                        <section class="CadastroClinica">
                            <div class="ContainerCadastroClinica ContainerGrid">
                                <span>Cadastrar Clinica</span>
                                <form onSubmit={(Evento) => CadastrarClinica(Evento)}>
                                    <div class="LinhaFormCadastroClinica">
                                        <div class="CampoCadastroClinica">
                                            <label>Endereço</label>
                                            <input type="text" maxLength="300" value={Endereco} onChange={(inputEndereco) => setEndereco(inputEndereco.target.value)} required />
                                        </div>
                                        <div class="CampoCadastroClinica">
                                            <label>CNPJ</label>
                                            <input type="text" maxLength="18" value={Cnpj} onChange={(inputCnpj) => setCnpj(inputCnpj.target.value)} required />
                                        </div>
                                    </div>
                                    <div class="LinhaFormCadastroClinica">
                                        <div class="CampoCadastroClinica">
                                            <label>Razão Social</label>
                                            <input type="text" maxLength="200" value={RazaoSocial} onChange={(inputRazaoSocial) => setRazaoSocial(inputRazaoSocial.target.value)} required />
                                        </div>
                                        <div class="CampoCadastroClinica">
                                            <label>Nome Fantasia</label>
                                            <input type="text" maxLength="200" value={NomeFantasia} onChange={(inputNomeFantasia) => setNomeFantasia(inputNomeFantasia.target.value)} required />
                                        </div>
                                    </div>
                                    <div class="LinhaFormCadastroClinica">
                                        <div class="CampoCadastroClinica">
                                            <label>Horário de Abertura</label>
                                            <input type="time" value={Abertura} onChange={(inputAbertura) => setAbertura(inputAbertura.target.value)} />
                                        </div>
                                        <div class="CampoCadastroClinica">
                                            <label>Horário de fechamento</label>
                                            <input type="time" value={Fechamento} onChange={(inputFechamento) => setFechamento(inputFechamento.target.value)} />
                                        </div>
                                    </div>
                                    <div class="BoxBotaoCadastroClinica">
                                        {
                                            IsLoading === false ?
                                                <button type="submit">Cadastrar</button> : <button type="submit" disabled>Cadastrando...</button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </section>
                        <section class="ListaClinicas">
                            {
                                ListaClinica.map((Clinica) => {
                                    return (
                                        <div class="ContainerGrid ContainerListaClinicas">
                                            <div class="BoxClinica">
                                                <div class="InfosClinica">
                                                    <div class="IdentificadoresClinica">
                                                        <h1>{Clinica.nomeFantasia}</h1>
                                                    </div>
                                                    <div class="DadosClinica">
                                                        <div class="ColunaDadosClinica">
                                                            <div class="BoxColDadosClinica">
                                                                <h2>Endereço</h2>
                                                                <span>{Clinica.endereco}</span>
                                                            </div>
                                                            <div class="BoxColDadosClinica">
                                                                <h2>CNPJ</h2>
                                                                <span>{Clinica.cnpj}</span>
                                                            </div>
                                                        </div>
                                                        <div class="ColunaDadosClinica">
                                                            <div class="BoxColDadosClinica">
                                                                <h2>Razão Social</h2>
                                                                <span>{Clinica.razaoSocial}</span>
                                                            </div>
                                                            <div class="BoxColDadosClinica">
                                                                <h2>Horário de funcionamento</h2>
                                                                {
                                                                    Clinica.horarioDeAbertura === undefined && Clinica.horarioDeFechamento === undefined ?
                                                                        <span>Não especificado</span> : <span>Das {Clinica.horarioDeAbertura} às {Clinica.horarioDeFechamento}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="DivisoriaClinica"></div>
                                                <div class="InfosMedsClinica">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Médicos</th>
                                                                <th>Especialidades</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                Clinica.medicos.map((medico) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{medico.idUsuarioNavigation.nome}</td>
                                                                            <td>{medico.idEspecialidadeNavigation.nome}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </main>
                    <Footer></Footer>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Header></Header>
                    <main class="ClinicaMain">
                        <section class="ListaClinicas">
                            {
                                ListaClinica.map((Clinica) => {
                                    return (
                                        <div class="ContainerGrid ContainerListaClinicas">
                                            <div class="BoxClinica">
                                                <div class="InfosClinica">
                                                    <div class="IdentificadoresClinica">
                                                        <h1>{Clinica.nomeFantasia}</h1>
                                                    </div>
                                                    <div class="DadosClinica">
                                                        <div class="ColunaDadosClinica">
                                                            <div class="BoxColDadosClinica">
                                                                <h2>Endereço</h2>
                                                                <span>{Clinica.endereco}</span>
                                                            </div>
                                                            <div class="BoxColDadosClinica">
                                                                <h2>CNPJ</h2>
                                                                <span>{Clinica.cnpj}</span>
                                                            </div>
                                                        </div>
                                                        <div class="ColunaDadosClinica">
                                                            <div class="BoxColDadosClinica">
                                                                <h2>Razão Social</h2>
                                                                <span>{Clinica.razaoSocial}</span>
                                                            </div>
                                                            <div class="BoxColDadosClinica">
                                                                <h2>Horário de funcionamento</h2>
                                                                {
                                                                    Clinica.horarioDeAbertura === undefined && Clinica.horarioDeFechamento === undefined ?
                                                                        <span>Não especificado</span> : <span>Das {Clinica.horarioDeAbertura} às {Clinica.horarioDeFechamento}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="DivisoriaClinica"></div>
                                                <div class="InfosMedsClinica">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Médicos</th>
                                                                <th>Especialidades</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                Clinica.medicos.map((medico) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{medico.idUsuarioNavigation.nome}</td>
                                                                            <td>{medico.idEspecialidadeNavigation.nome}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </main>
                    <Footer></Footer>
                </div>
            )
        }
    }
    else {
        return (
            <div>
                <Header></Header>
                <main class="ClinicaMain">
                    <section class="ListaClinicas">
                        {
                            ListaClinica.map((Clinica) => {
                                return (
                                    <div class="ContainerGrid ContainerListaClinicas">
                                        <div class="BoxClinica">
                                            <div class="InfosClinica">
                                                <div class="IdentificadoresClinica">
                                                    <h1>{Clinica.nomeFantasia}</h1>
                                                </div>
                                                <div class="DadosClinica">
                                                    <div class="ColunaDadosClinica">
                                                        <div class="BoxColDadosClinica">
                                                            <h2>Endereço</h2>
                                                            <span>{Clinica.endereco}</span>
                                                        </div>
                                                        <div class="BoxColDadosClinica">
                                                            <h2>CNPJ</h2>
                                                            <span>{Clinica.cnpj}</span>
                                                        </div>
                                                    </div>
                                                    <div class="ColunaDadosClinica">
                                                        <div class="BoxColDadosClinica">
                                                            <h2>Razão Social</h2>
                                                            <span>{Clinica.razaoSocial}</span>
                                                        </div>
                                                        <div class="BoxColDadosClinica">
                                                            <h2>Horário de funcionamento</h2>
                                                            {
                                                                Clinica.horarioDeAbertura === undefined && Clinica.horarioDeFechamento === undefined ?
                                                                    <span>Não especificado</span> : <span>Das {Clinica.horarioDeAbertura} às {Clinica.horarioDeFechamento}</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="DivisoriaClinica"></div>
                                            <div class="InfosMedsClinica">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Médicos</th>
                                                            <th>Especialidades</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Clinica.medicos.map((medico) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{medico.idUsuarioNavigation.nome}</td>
                                                                        <td>{medico.idEspecialidadeNavigation.nome}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>
                </main>
                <Footer></Footer>
            </div>
        )
    }
}