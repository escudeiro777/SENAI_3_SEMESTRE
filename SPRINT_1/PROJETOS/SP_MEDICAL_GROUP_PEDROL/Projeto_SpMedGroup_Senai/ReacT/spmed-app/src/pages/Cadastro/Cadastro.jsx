import { useState, useEffect } from "react";
import axios from 'axios';
import '../../Css/CadastroUsuario.css';
import Footer from '../../Components/Footer/Footer.jsx';
import Header from '../../Components/Header/Header.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { TokenConvertido, UsuarioAutenticado } from '../../Services/auth.js'

export default function Cadaastro() {
    document.title = 'SpMed - Cadastro';
    let Navigate = useNavigate();
    const [ListaUsuario, setListaUsuario] = useState([]);
    const [ListaTipoUsuario, setListaTipoUsuario] = useState([]);
    const [ListaClinica, setListaClinica] = useState([]);
    const [ListaEspecialidade, setListaEspecialidade] = useState([]);
    const [ListaPaciente, setListaPaciente] = useState([]);
    const [ListaMedico, setListaMedico] = useState([]);
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [Nome, setNome] = useState('');
    const [Nascimento, setNascimeto] = useState('');
    const [RG, setRg] = useState('');
    const [Cpf, setCpf] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [Endereco, setEndereco] = useState('');
    const [Crm, setCrm] = useState('');
    const [IdEspecialidade, setIdEspecialidade] = useState(0);
    const [IdClinica, setIdClinica] = useState(0);
    const [IdTipoUsuario, setIdTipoUsuario] = useState(0);
    const [IdUsuarioMed, setIdUsuarioMed] = useState(0);
    const [IdUsuarioPac, setIdUsuarioPac] = useState(0);
    const [IsLoading, setIsLoading] = useState(false);

    function PreencherListas() {
        axios('http://192.168.6.108:5000/api/Usuarios', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            setListaUsuario(resposta.data);
        })
            .catch((erro) => {
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            });

        axios('http://192.168.6.108:5000/api/TiposUsuarios', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            setListaTipoUsuario(resposta.data);
        })
        .catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });

        axios('http://192.168.6.108:5000/api/Clinicas')
            .then((resposta) => {
                setListaClinica(resposta.data);
            })
            .catch((erro) => {
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            });

        axios('http://192.168.6.108:5000/api/Especialidades', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => setListaEspecialidade(resposta.data))
        .catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });

        axios('http://192.168.6.108:5000/api/Pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => setListaPaciente(resposta.data))
        .catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });

        axios('http://192.168.6.108:5000/api/Medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => setListaMedico(resposta.data))
        .catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });
    }

    function CadastrarUsuario(evento) {
        evento.preventDefault();
        setIsLoading(true);
        if (IdTipoUsuario === 0) {
            setIsLoading(false);
            window.alert('especifique o usuário!!!')
        }
        else if (new Date(Nascimento) > new Date()) {
            setIsLoading(false);
            window.alert('Selecione uma data de nascimento válida!!!')
        }
        else {
            axios.post('http://192.168.6.108:5000/api/Usuarios', {
                "email": Email,
                "senha": Senha,
                "idTipoUsuario": IdTipoUsuario,
                "dataDeNascimento": Nascimento,
                "nome": Nome
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            }).then((resposta) => {
                if (resposta.status === 201) {
                    PreencherListas();
                    window.alert('Usuário cadastrado com sucesso!')
                    setIsLoading(false);
                }
            }).catch((erro) => {
                if (erro.toJSON().status == 400) {
                    window.alert('O email possivelmente já está em uso, utilize outro endereço de email. Se o erro persistir, busque ajuda do suporte e/ou tente novamente mais tarde.')
                }
                else{
                    localStorage.removeItem('usuario-login');
                    Navigate('/Login')
                }
                setIsLoading(false);
            })
        }
    }

    function CadastrarPaciente(Evento) {
        Evento.preventDefault();
        setIsLoading(true);
        if (IdUsuarioPac === 0) {
            setIsLoading(false);
            window.alert('especifique o usuário!!!')
        }
        else {
            axios.post('http://192.168.6.108:5000/api/Pacientes', {
                "idUsuario": IdUsuarioPac,
                "telefone": Telefone,
                "cpf": Cpf,
                "endereco": Endereco,
                "rg": RG
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            }).then((resposta) => {
                if (resposta.status === 201) {
                    PreencherListas();
                    window.alert('Paciente cadastrado com sucesso!');
                    setIsLoading(false);
                }
            }).catch((erro) => {
                if (erro.toJSON().status == 400) {
                    window.alert('O usuário, RG ou CPF possivelmente já estão em uso, utilize outros valores nesses campos. Se o erro persistir, busque ajuda do suporte e/ou tente novamente mais tarde.')
                }
                else{
                    localStorage.removeItem('usuario-login');
                    Navigate('/Login')
                }
                setIsLoading(false);
            })
        }
    }

    function CadastrarMedico(Evento) {
        Evento.preventDefault();
        setIsLoading(true);
        if (IdUsuarioMed === 0 || IdClinica === 0 || IdEspecialidade === 0) {
            setIsLoading(false);
            window.alert('Especifique o usuário, a clínica e a especialidade!!!')
        }
        else {
            axios.post('http://192.168.6.108:5000/api/Medicos', {
                "idUsuario": IdUsuarioMed,
                "idClinica": IdClinica,
                "idEspecialidade": IdEspecialidade,
                "crm": Crm
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            }).then((resposta) => {
                if (resposta.status === 201) {
                    PreencherListas();
                    window.alert('Médico cadastrado com sucesso!');
                    setIsLoading(false);
                }
            }).catch((erro) => {
                if (erro.toJSON().status == 400) {
                    window.alert('O usuário ou CRM possivelmente já estão em uso, utilize outros valores nesses campos. Se o erro persistir, busque ajuda do suporte e/ou tente novamente mais tarde.')
                }
                else{
                    localStorage.removeItem('usuario-login');
                    Navigate('/Login')
                }
                setIsLoading(false);
            })
        }
    }

    useEffect(() => {
        PreencherListas();
        if (UsuarioAutenticado() === false) {
            Navigate('/Login');
        }
    }, []);

    return (
        <div>
            <Header></Header>
            <main class="CadastroMain">
                <section class="CadastroUsuario">
                    <div class="ContainerGrid ContainerCadastro">
                        <h1>Cadastrar Usuário</h1>
                        <form onSubmit={(evento) => CadastrarUsuario(evento)}>
                            <div class="LinhaFormCadastro">
                                <div class="CampoCadastro">
                                    <label>Email</label>
                                    <input type="email" maxLength="256" value={Email} onChange={(inputEmail) => setEmail(inputEmail.target.value)} required />
                                </div>
                                <div class="CampoCadastro">
                                    <label>Senha</label>
                                    <input type="password" minLength="8" maxLength="16" value={Senha} onChange={(inputSenha) => setSenha(inputSenha.target.value)} required />
                                </div>
                            </div>
                            <div class="LinhaFormCadastro">
                                <div class="CampoCadastro">
                                    <label>Nome</label>
                                    <input type="text" maxLength="100" value={Nome} onChange={(inputNome) => setNome(inputNome.target.value)} required />
                                </div>
                                <div class="CampoCadastro">
                                    <label>Data de nascimento</label>
                                    <input type="date" value={Nascimento} onChange={(inputNascimento) => setNascimeto(inputNascimento.target.value)} />
                                </div>
                            </div>
                            <div class="CampoCadastro">
                                <label>Tipo de usuário</label>
                                <select value={IdTipoUsuario} onChange={(inputTipoUsuario) => setIdTipoUsuario(inputTipoUsuario.target.value)} required>
                                    <optgroup>
                                        <option value="0">Selecione um tipo de usuário</option>
                                        {ListaTipoUsuario.map((TipoUsuario) => {
                                            return (
                                                <option value={TipoUsuario.idTipoUsuario}>{TipoUsuario.tituloTipoUsuario}</option>
                                            )
                                        })}
                                    </optgroup>
                                </select>
                            </div>
                            <div class="BoxBotaoCadastro">
                                {
                                    IsLoading === false ?
                                        <button type="submit">Cadastrar</button> : <button type="submit" disabled>Carregando...</button>
                                }
                                <Link className="Link" to="/Login">Já possui uma conta? Entre aqui</Link>
                            </div>
                        </form>
                    </div>
                </section>
                <section class="CadastroPaciente">
                    <div class="ContainerGrid ContainerCadastro">
                        <h1>Cadastrar Paciente</h1>
                        <form onSubmit={(Evento) => CadastrarPaciente(Evento)}>
                            <div class="LinhaFormCadastro">
                                <div class="CampoCadastro">
                                    <label>RG</label>
                                    <input type="text" maxLength="10" value={RG} onChange={(inputRg) => setRg(inputRg.target.value)} required />
                                </div>
                                <div class="CampoCadastro">
                                    <label>CPF</label>
                                    <input type="text" maxLength="11" value={Cpf} onChange={(inputCpf) => setCpf(inputCpf.target.value)} required />
                                </div>
                            </div>
                            <div class="LinhaFormCadastro">
                                <div class="CampoCadastro">
                                    <label>Telefone</label>
                                    <input type="text" maxLength="13" value={Telefone} onChange={(inputTelefone) => setTelefone(inputTelefone.target.value)} />
                                </div>
                                <div class="CampoCadastro">
                                    <label>Endereco</label>
                                    <input type="text" maxLength="300" value={Endereco} onChange={(inputEndereco) => setEndereco(inputEndereco.target.value)} required />
                                </div>
                            </div>
                            <div class="CampoCadastro">
                                <label>Usuário</label>
                                <select value={IdUsuarioPac} onChange={(inputIdUsuarioPac) => setIdUsuarioPac(inputIdUsuarioPac.target.value)} required>
                                    <optgroup>
                                        <option value="0">Selecione um usuário disponível</option>
                                        {
                                            ListaUsuario.filter((Usuario) => {
                                                return Usuario.idTipoUsuario === 3
                                            }).filter((Usuario) => {
                                                return ((ListaPaciente.find(Paciente => Paciente.idUsuario === Usuario.idUsuario)) === undefined) === true
                                            }).map((Usuario) => {
                                                return (
                                                    <option value={Usuario.idUsuario}>{Usuario.email}</option>
                                                )
                                            })
                                        }
                                    </optgroup>
                                </select>
                            </div>
                            <div class="BoxBotaoCadastro">
                                {
                                    IsLoading === false ?
                                        <button type="submit">Cadastrar</button> : <button type="submit" disabled>Carregando...</button>
                                }
                                <Link className="Link" to="/Login">Já possui uma conta? Entre aqui</Link>
                            </div>
                        </form>
                    </div>
                </section>
                <section class="CadastroMedico">
                    <div class="ContainerGrid ContainerCadastro">
                        <h1>Cadastrar Médico</h1>
                        <form onSubmit={(Evento) => CadastrarMedico(Evento)}>
                            <div class="LinhaFormCadastro">
                                <div class="CampoCadastro">
                                    <label>CRM</label>
                                    <input type="text" maxLength="13" value={Crm} onChange={(inputCrm) => setCrm(inputCrm.target.value)} required />
                                </div>
                                <div class="CampoCadastro">
                                    <label>Especialidade</label>
                                    <select value={IdEspecialidade} onChange={(inputIdEspecialidade) => setIdEspecialidade(inputIdEspecialidade.target.value)} required>
                                        <optgroup>
                                            <option value="0">Selecione uma especialidade</option>
                                            {
                                                ListaEspecialidade.map((Especialidade) => {
                                                    return (
                                                        <option value={Especialidade.idEspecialidade}>{Especialidade.nome}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <div class="LinhaFormCadastro">
                                <div class="CampoCadastro">
                                    <label>Clínica</label>
                                    <select value={IdClinica} onChange={(InputIdClinica) => setIdClinica(InputIdClinica.target.value)} required>
                                        <optgroup>
                                            <option value="0">Selecione uma clínica</option>
                                            {
                                                ListaClinica.map((Clinica) => {
                                                    return (
                                                        <option value={Clinica.idClinica}>{Clinica.razaoSocial}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </select>
                                </div>
                                <div class="CampoCadastro">
                                    <label>Usuário</label>
                                    <select value={IdUsuarioMed} onChange={(InputIdUsuarioMed) => setIdUsuarioMed(InputIdUsuarioMed.target.value)} required>
                                        <optgroup>
                                            <option value="0">Selecione um usuário disponível</option>
                                            {
                                                ListaUsuario.filter((Usuario) => {
                                                    return Usuario.idTipoUsuario === 2
                                                }).filter((Usuario) => {
                                                    return ((ListaMedico.find(Medico => Medico.idUsuario === Usuario.idUsuario)) === undefined) === true
                                                }).map((Usuario) => {
                                                    return (
                                                        <option value={Usuario.idUsuario}>{Usuario.email}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                            <div class="BoxBotaoCadastro">
                                {
                                    IsLoading === false ?
                                        <button type="submit">Cadastrar</button> : <button type="submit" disabled>Carregando...</button>
                                }
                                <Link className="Link" to="/Login">Já possui uma conta? Entre aqui</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}