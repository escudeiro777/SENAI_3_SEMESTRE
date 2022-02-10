import { useState, useEffect } from "react";
import axios from 'axios';
import '../../Css/Administracao.css';
import Footer from '../../Components/Footer/Footer.jsx';
import Header from '../../Components/Header/Header.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TokenConvertido, UsuarioAutenticado } from '../../Services/auth.js';
import Mapa from "../../Components/Mapa/Mapa";

export default function Administracao() {
    document.title = 'SpMed - Administracao';
    const [ListaUsuario, setListaUsuario] = useState([]);
    const [ListaUsuarioExibicao, setListaUsuarioExibicao] = useState([]);
    // const [NomeUsuario, setNomeUsuario] = useState('');
    // const [EmailUsuario, setEmail] = useState('');
    // const [SenhaUsuario, setSenha] = useState('');
    // const [IdTpUUsuario, setIdTpUUsuario] = useState(0);
    // const [DataNascUsuario, setDataNascUsuario] = useState('');
    const [ListaMedico, setListaMedico] = useState([]);
    const [ListaMedicoExibicao, setListaMedicoExibicao] = useState([]);
    // const [CrmMedico, setCrmMedico] = useState('');
    // const [IdEspMedico, setIdEspMedico] = useState(0);
    // const [IdCliMedico, setIdCliMedico] = useState(0);
    // const [IdUsuMedico, setIdUsuMedico] = useState(0);
    const [ListaPaciente, setListaPaciente] = useState([]);
    const [ListaPacienteExibicao, setListaPacienteExibicao] = useState([]);
    // const [CpfPaciente, setCpfPaciente] = useState('');
    // const [RgPaciente, setRgPaciente] = useState('');
    // const [TelPaciente, setTelPaciente] = useState('');
    // const [EnderecoPaciente, setEnderecoPaciente] = useState('');
    // const [IdUsuPaciente, setIdUsuPaciente] = useState(0);
    const [ListaEspecialidade, setListaEspecialidade] = useState([]);
    const [ListaEspecialidadeExibicao, setListaEspecialidadeExibicao] = useState([]);
    // const [NomeEspecialidade, setNomeEspecialidade] = useState('');
    const [NomeEspecialidadeCadastro, setNomeEspecialidadeCadastro] = useState('');
    const [ListaTipoUsu, setListaTipoUsu] = useState([]);
    const [ListaClinica, setListaClinica] = useState([]);
    const [IdClinicaDeletada, setIdClinicaDeletada] = useState(0);
    // const [EnderecoClinica, setEnderecoClinica] = useState('');
    // const [NomeFantasiaClinica, setNomeFantasiaClinica] = useState('');
    // const [CnpjClinica, setCnpjClinica] = useState('');
    // const [RazaoSocialClinica, setRazaoSocialClinica] = useState('');
    // const [AberturaClinica, setAberturaClinica] = useState('');
    // const [FechamentoClinica, setFechamentoClinica] = useState('');
    const [ListaLocalizacoes, setListaLocalizacoes] = useState([]);
    const [LocalizacaoCadastro, setLocalizacaoCadastro] = useState({});

    function PreencherListas() {

        axios('http://192.168.6.108:5000/api/Usuarios', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaUsuario(resposta.data);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });


        axios('http://192.168.6.108:5000/api/Medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaMedico(resposta.data);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });


        axios('http://192.168.6.108:5000/api/Pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaPaciente(resposta.data);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });


        axios('http://192.168.6.108:5000/api/Especialidades', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaEspecialidade(resposta.data);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });


        axios('http://192.168.6.108:5000/api/TiposUsuarios', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaTipoUsu(resposta.data);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });


        axios('http://192.168.6.108:5000/api/Clinicas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaClinica(resposta.data);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });

        axios('http://192.168.6.108:5000/api/Localizacoes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaLocalizacoes(resposta.data);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        });
    }

    function PreencherLista(Evento, Lista) {
        Evento.preventDefault();
        switch (Lista) {
            case 'Usuarios':
                setListaUsuarioExibicao(ListaUsuario);
                break;

            case 'Medicos':
                setListaMedicoExibicao(ListaMedico);
                break;

            case 'Pacientes':
                setListaPacienteExibicao(ListaPaciente);
                break;

            case 'Especialidades':
                setListaEspecialidadeExibicao(ListaEspecialidade);
                break;

            default:
                window.alert('Lista inválida!')
                break;
        }
    }

    function DeletarUsuario(Evento, Id) {
        Evento.preventDefault();
        axios.delete('http://192.168.6.108:5000/api/Usuarios/' + Id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 204) {
                PreencherListas();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        })
    }

    function DeletarMedico(Evento, Id) {
        Evento.preventDefault();
        axios.delete('http://192.168.6.108:5000/api/Medicos/' + Id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 204) {
                PreencherListas();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        })
    }

    function DeletarPaciente(Evento, Id) {
        Evento.preventDefault();
        axios.delete('http://192.168.6.108:5000/api/Pacientes/' + Id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 204) {
                PreencherListas();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        })
    }

    function DeletarEspecialidade(Evento, Id) {
        Evento.preventDefault();
        axios.delete('http://192.168.6.108:5000/api/Especialidades/' + Id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 204) {
                PreencherListas();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }).catch((erro) => {
            localStorage.removeItem('usuario-login');
            Navigate('/Login')
        })
    }

    function DeletarClinica(Evento, Id) {
        Evento.preventDefault();
        if (Id !== 0) {
            axios.delete('http://192.168.6.108:5000/api/Clinicas/' + Id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            }).then((resposta) => {
                if (resposta.status === 204) {
                    PreencherListas();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            }).catch((erro) => {
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            })
        }
        else window.alert('Selecione uma clínica válida!');
    }

    function CadastrarEspecialidade(Evento) {
        Evento.preventDefault();
        axios.post('http://192.168.6.108:5000/api/Especialidades', {
            "nome": NomeEspecialidadeCadastro
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 201) {
                setNomeEspecialidadeCadastro('');
                window.alert('Especialidade cadastrada!');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }).catch((erro) => {
            if (erro.toJSON().status == 400) {
                window.alert('O nome da especialidade possivelmente já está em uso, utilize outros valores nesses campos. Se o erro persistir, busque ajuda do suporte e/ou tente novamente mais tarde.')
            }
            else {
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            }
        })
    }

    const GeocodificarEndereco = async (Endereco) => {
        let Retorno;
        await axios('https://geocode.search.hereapi.com/v1/geocode' + "?q=" + Endereco, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token-geocode'),
            },
        }).then(async (resposta) => {
            Retorno = resposta.data.items[0].position;
            console.log(resposta.data.items[0].position);
        }).catch((erro) => {
            console.log(erro);
        })
        return Retorno;
    }

    const DefinirMarcadores = async (Evento) => {
        Evento.preventDefault()
        for (const Paciente of ListaPaciente) {
            if (ListaLocalizacoes.find((Localizacao) =>
                Localizacao.endereco == Paciente.endereco
            ) === undefined) {

                let EnderecoGeocodificado = await GeocodificarEndereco(Paciente.endereco);
                console.log(EnderecoGeocodificado);
                await axios.post('http://192.168.6.108:5000/api/Localizacoes', {
                    latitude: EnderecoGeocodificado.lat,
                    longitude: EnderecoGeocodificado.lng,
                    endereco: Paciente.endereco
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                    },
                }).then((resposta) => {
                    if (resposta.status === 201) {
                        console.log('GGWP');
                    }
                }).catch((erro) => {
                    if (erro.toJSON().status == 400) {
                        window.alert('Erro de formatação do endereço no momento de cadastro, alguns endereços podem não ser marcados')
                    }
                    else {
                        localStorage.removeItem('usuario-login');
                        Navigate('/Login')
                    }
                })
            }
        }
        PreencherListas();
        // ListaPaciente.forEach((Paciente) => {
        //     if (ListaLocalizacoes.find((Localizacao) =>
        //         Localizacao.endereco == Paciente.endereco
        //     ) === undefined) {
        //         let EnderecoGeocodificado = GeocodificarEndereco(Paciente.endereco);
        //         console.log(EnderecoGeocodificado);
        //         //   axios.post('http://192.168.6.108:5000/api/Localizacoes', {
        //         //     latitude : GeocodificarEndereco(Paciente.endereco).lat
        //         //   })  
        //     }
        // });   
        // // ListaPaciente.map((Paciente) => {
        // //     if (ListaLocalizacoes.find((Localizacao) =>
        // //         Localizacao.endereco == Paciente.endereco
        // //     ) === undefined) {
        // //         let EnderecoGeocodificado = GeocodificarEndereco(Paciente.endereco);
        // //         console.log(EnderecoGeocodificado);
        // //         //   axios.post('http://192.168.6.108:5000/api/Localizacoes', {
        // //         //     latitude : GeocodificarEndereco(Paciente.endereco).lat
        // //         //   })  
        // //     }

        //     // return(
        //     //     ListaLocalizacoes.find((Localizacao) => Localizacao.endereco == Paciente.endereco) === undefined && (
        //     //         GeocodificarEndereco(Paciente.endereco),
        //     //         console.log(LocalizacaoCadastro)
        //     //     )
        //     // )
        // // })
    }

    useEffect(PreencherListas, []);

    return (
        <div>
            <Header></Header>
            <main class="AdminMain">
                <section class="AdminAcoes">
                    <div class="BoxAdminPadrao BoxAdmin">
                        <div class="ContainerBoxAdminPadrao ContainerGrid">
                            <h1>Usuários</h1>
                            <div class="ListarTodos">

                                <button onClick={(Evento) => PreencherLista(Evento, 'Usuarios')}>Listar todos</button>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Tipo</th>
                                            <th>Data de nascimento</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ListaUsuarioExibicao.map((Usuario) => {
                                                return (
                                                    <tr>
                                                        <td>{Usuario.nome}</td>
                                                        <td>{Usuario.email}</td>
                                                        <td>{ListaTipoUsu.find((TpU) => TpU.idTipoUsuario === Usuario.idTipoUsuario).tituloTipoUsuario}</td>
                                                        <td>{Usuario.dataDeNascimento}</td>
                                                        <td><button onClick={(Evento) => { DeletarUsuario(Evento, Usuario.idUsuario) }}><i class="fas fa-trash"></i></button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <div class="Atualizar">
                                <form>
                                    <div class="ElementosEnvio">
                                        <button>Atualizar</button>
                                        <input type="number" placeholder="Id" />
                                    </div>
                                    <div class="ElementosDados">
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>Nome</label>
                                                <input type="text" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>Email</label>
                                                <input type="email" />
                                            </div>
                                        </div>
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>Senha</label>
                                                <input type="password" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>Tipo de usuário</label>
                                                <select></select>
                                            </div>
                                        </div>
                                        <div class="CampoDado">
                                            <label>Data de nascimento</label>
                                            <input type="date" />
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>
                    <div class="BoxAdminPadrao BoxAdmin">
                        <div class="ContainerBoxAdminPadrao ContainerGrid">
                            <h1>Médicos</h1>
                            <div class="ListarTodos">

                                <button onClick={(Evento) => PreencherLista(Evento, 'Medicos')}>Listar todos</button>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>CRM</th>
                                            <th>Clínica</th>
                                            <th>Especialidade</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ListaMedicoExibicao.map((Medico) => {
                                                return (
                                                    <tr>
                                                        <td>{Medico.idUsuarioNavigation.email}</td>
                                                        <td>{Medico.crm}</td>
                                                        <td>{ListaClinica.find((Clinica) => Clinica.idClinica === Medico.idClinica).razaoSocial}</td>
                                                        <td>{ListaEspecialidade.find((Especialidade) => Especialidade.idEspecialidade === Medico.idEspecialidade).nome}</td>
                                                        <td><button onClick={(Evento) => DeletarMedico(Evento, Medico.idMedico)}><i class="fas fa-trash"></i></button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <div class="Atualizar">
                                <form>
                                    <div class="ElementosEnvio">
                                        <button>Atualizar</button>
                                        <input type="number" placeholder="Id" />
                                    </div>
                                    <div class="ElementosDados">
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>CRM</label>
                                                <input type="text" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>Especialidade</label>
                                                <select></select>
                                            </div>
                                        </div>
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>Clínica</label>
                                                <select></select>
                                            </div>
                                            <div class="CampoDado">
                                                <label>Usuário</label>
                                                <select></select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>
                    <div class="BoxAdminPadrao BoxAdmin">
                        <div class="ContainerBoxAdminPadrao ContainerGrid">
                            <h1>Pacientes</h1>
                            <div class="ListarTodos">

                                <button onClick={(Evento) => PreencherLista(Evento, 'Pacientes')}>Listar todos</button>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>CPF</th>
                                            <th>Endereço</th>
                                            <th>Telefone</th>
                                            <th>RG</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ListaPacienteExibicao.map((Paciente) => {
                                                return (
                                                    <tr>
                                                        <td>{Paciente.idUsuarioNavigation.email}</td>
                                                        <td>{Paciente.cpf}</td>
                                                        <td>{Paciente.endereco}</td>
                                                        <td>{Paciente.telefone}</td>
                                                        <td>{Paciente.rg}</td>
                                                        <td><button onClick={(Evento) => DeletarPaciente(Evento, Paciente.idPaciente)}><i class="fas fa-trash"></i></button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <div class="Atualizar">
                                <form>
                                    <div class="ElementosEnvio">
                                        <button>Atualizar</button>
                                        <input type="number" placeholder="Id" />
                                    </div>
                                    <div class="ElementosDados">
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>CPF</label>
                                                <input type="text" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>RG</label>
                                                <input type="email" />
                                            </div>
                                        </div>
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>Telefone</label>
                                                <input type="text" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>Endereço</label>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div class="CampoDado">
                                            <label>Usuário</label>
                                            <select></select>
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>
                    <div class="BoxAdminCentralizado BoxAdmin">
                        <div class="ContainerBoxAdminCentralizado ContainerGrid">
                            <h1>Especialidades</h1>
                            <div class="ListarTodos">

                                <button onClick={(Evento) => PreencherLista(Evento, 'Especialidades')}>Listar todas</button>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ListaEspecialidadeExibicao.map((Especialidade) => {
                                                return (
                                                    <tr>
                                                        <td>{Especialidade.nome}</td>
                                                        <td><button onClick={(Evento) => DeletarEspecialidade(Evento, Especialidade.idEspecialidade)}><i class="fas fa-trash"></i></button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <div class="Atualizar">
                                <form>
                                    <div class="ElementosEnvio">
                                        <button>Atualizar</button>
                                        <input type="number" placeholder="Id" />
                                    </div>
                                    <div class="ElementosDados">
                                        <div class="CampoDado">
                                            <label>Nome</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                            <div class="CadastrarAdmin">
                                <button onClick={(Evento) => CadastrarEspecialidade(Evento)}>Cadastrar</button>
                                <div class="CampoCadastro">
                                    <label>Nome</label>
                                    <input type="text" maxLength="70" value={NomeEspecialidadeCadastro} onChange={(inputNomeEspecialidadeCadastro) => setNomeEspecialidadeCadastro(inputNomeEspecialidadeCadastro.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="BoxAdminPadrao BoxAdmin">
                        <div class="ContainerBoxAdminPadrao ContainerGrid">
                            <h1>Clínicas</h1>
                            <div class="Deletar">
                                <button onClick={(Evento) => DeletarClinica(Evento, IdClinicaDeletada)}>Deletar</button>
                                <select value={IdClinicaDeletada} onChange={(inputIdClinicaDeletada) => setIdClinicaDeletada(inputIdClinicaDeletada.target.value)}>
                                    <optgroup>
                                        <option value="0">Selecione uma clínica válida</option>
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
                            {/* <div class="Atualizar">
                                <form>
                                    <div class="ElementosEnvio">
                                        <button>Atualizar</button>
                                        <input type="number" placeholder="Id" />
                                    </div>
                                    <div class="ElementosDados">
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>Endereço</label>
                                                <input type="text" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>CNPJ</label>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>Nome Fantasia</label>
                                                <input type="text" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>Razão Social</label>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div class="LinhaDados">
                                            <div class="CampoDado">
                                                <label>Horário de abertura</label>
                                                <input type="time" />
                                            </div>
                                            <div class="CampoDado">
                                                <label>Horário de fechamento</label>
                                                <input type="time" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>
                    <div class="BoxAdminPadrao BoxAdmin">
                        <div class="ContainerBoxAdminPadrao ContainerGrid">
                            <h1>Mapeamento pacientes</h1>
                            <div className="Deletar">
                                <button onClick={(Evento) => DefinirMarcadores(Evento)}>Atualizar marcadores</button>
                            </div>
                            <div className="ListaMapas">
                                <Mapa></Mapa>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}