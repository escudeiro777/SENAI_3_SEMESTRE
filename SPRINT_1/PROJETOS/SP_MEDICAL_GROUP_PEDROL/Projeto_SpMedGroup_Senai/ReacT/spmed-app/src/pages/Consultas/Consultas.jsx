import { useState, useEffect } from "react";
import axios from 'axios';
import '../../Css/Consulta.css';
import Footer from '../../Components/Footer/Footer.jsx';
import Header from '../../Components/Header/Header.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TokenConvertido, UsuarioAutenticado } from '../../Services/auth.js';

export default function Consultas() {
    document.title = "SpMed - Consultas";
    const [IsLoading, setIsLoading] = useState(false);
    const [ListaConsulta, setListaConsulta] = useState([]);
    const [ListaSituacao, setListaSituacao] = useState([]);
    const [ListaPaciente, setListaPaciente] = useState([]);
    const [ListaMedico, setListaMedico] = useState([]);
    const [DescricaoAtualizada, setDescricaoAtualizada] = useState('');
    const [IdMedico, setIdMedico] = useState(0);
    const [IdPaciente, setIdPaciente] = useState(0);
    const [Descricao, setDescricao] = useState('');
    const [DataHora, setDataHora] = useState('');

    function ListarTodas() {
        axios('https://62055968161670001741b97e.mockapi.io/Consulta', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => {
            if (resposta.status === 200) {
                setListaConsulta(resposta.data);
            }
        // }).catch((erro) => {
        //    console.log(erro);
        //    var ErroJson = erro.toJSON();
        //     if (ErroJson.status === 400) {
        //         window.alert('Erro no servidor, reinicie a página. Se o erro persistir, busque ajuda do suporte e/ou tente novamente mais tarde.')
        //     }
        //     else{
        //         localStorage.removeItem('usuario-login');
                
        //     }
        })
    }

    // function ListarPorUsuario() {
    //     axios('http://192.168.6.108:5000/api/Consultas/ListarMinhas', {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     }).then((resposta) => {
    //         if (resposta.status === 200) {
    //             setListaConsulta(resposta.data);
    //         }
    //     }).catch((erro) => {
    //         localStorage.removeItem('usuario-login');
            
    //     })
    // }

    function ListarUsuarios() {
        axios('http://192.168.6.108:5000/api/Pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => setListaPaciente(resposta.data))
            .catch((erro) => {
                localStorage.removeItem('usuario-login');
                
            });

        axios('http://192.168.6.108:5000/api/Medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        }).then((resposta) => setListaMedico(resposta.data))
            .catch((erro) => {
                localStorage.removeItem('usuario-login');
                
            });
    }

    // function ListarSituacoes() {
    //     axios('http://192.168.6.108:5000/api/Situacoes', {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     }).then((resposta) => {
    //         if (resposta.status === 200) {
    //             setListaSituacao(resposta.data)
    //         }
    //     })
    //         .catch((erro) => {
    //             {
    //                 localStorage.removeItem('usuario-login');
                    
    //             };
    //         })
    // }

    function AgendarConsulta(Evento) {
        Evento.preventDefault();
        if (IdPaciente !== 0 && IdMedico !== 0) {
            setIsLoading(true);
            if (Descricao === '') {
                axios.post('http://192.168.6.108:5000/api/Consultas', {
                    "idPaciente": IdPaciente,
                    "idMedico": IdMedico,
                    "DataHorario": DataHora,
                    "descricao": 'Não especificada',
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                    },
                }).then((resposta) => {
                    if (resposta.status === 201) {
                        ListarTodas();
                        setIsLoading(false);
                        window.alert('Consulta agendada!')
                    }
                }).catch((erro) => {
                    localStorage.removeItem('usuario-login');
                    
                    setIsLoading(false);
                })
            }
            else {
                axios.post('http://192.168.6.108:5000/api/Consultas', {
                    "idPaciente": IdPaciente,
                    "idMedico": IdMedico,
                    "DataHorario": DataHora,
                    "descricao": Descricao,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                    },
                }).then((resposta) => {
                    if (resposta.status === 201) {
                        ListarTodas();
                        setIsLoading(false);
                        window.alert('Consulta agendada!')
                    }
                }).catch((erro) => {
                    localStorage.removeItem('usuario-login');
                    
                    setIsLoading(false);
                })
            }
        }
        else window.alert("É necessário selecionar um médico e um paciente válidos");
    }

    // function CancelarConsulta(Evento, idConsultaCancelada) {
    //     Evento.preventDefault();
    //     setIsLoading(true);

    //     axios.patch('http://192.168.6.108:5000/api/Consultas/Cancelar/' + idConsultaCancelada, null, {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     }).then((resposta) => {
    //         if (resposta.status === 204) {
    //             window.alert('Consulta cancelada com sucesso!');
    //             ListarTodas();
    //             setIsLoading(false);
    //         }
    //     }).catch((erro) => {
    //         setIsLoading(false);
    //         localStorage.removeItem('usuario-login');
            
    //     })
    // }

    // function AlterarDescricao(Evento, IdConsulta) {
    //     Evento.preventDefault();
    //     setIsLoading(true);
    //     axios.patch('http://192.168.6.108:5000/api/Consultas/AlterarDescricao/'+IdConsulta, {
    //         "descricao": DescricaoAtualizada
    //     }, {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
    //         },
    //     }).then( (resposta) => {
    //         if (resposta.status === 204) {
    //             setIsLoading(false);
    //             setDescricaoAtualizada('');
    //             ListarPorUsuario();
    //         }
    //     }).catch( (erro) => {
    //         setIsLoading(false);
    //         localStorage.removeItem('usuario-login');
            
    //     })
    // }

    useEffect(() => {
        // if (TokenConvertido().Role === "1") {
            // ListarSituacoes();
            ListarTodas();
            ListarUsuarios();
        // }
        // else {
        //     ListarPorUsuario();
        //     ListarSituacoes();
        // }
    }, [])

    // if (TokenConvertido().Role === "1") {
        return (
            <div>
                <Header></Header>
                <main class="ConsultaMain">
                    <div class="ContainerConsulta ContainerGrid">
                        <section class="CadastroConsulta">
                            <div class="ContainerCadastroConsulta">
                                <span>Agendar Consulta</span>
                                <form onSubmit={(Evento) => AgendarConsulta(Evento)}>
                                    <div class="LinhaFormCadastroConsulta">
                                        <div class="CampoCadastroConsulta">
                                            <label>Médico</label>
                                            <select value={IdMedico} onChange={(selectIdMedico) => setIdMedico(selectIdMedico.target.value)} required>
                                                <optgroup>
                                                    <option value="0">Selecione um médico</option>
                                                    {
                                                        ListaMedico.map((Medico) => {
                                                            return (
                                                                <option value={Medico.idMedico}>{Medico.idUsuarioNavigation.email}</option>
                                                            )
                                                        })
                                                    }
                                                </optgroup>
                                            </select>
                                        </div>
                                        <div class="CampoCadastroConsulta">
                                            <label>Paciente</label>
                                            <select value={IdPaciente} onChange={(selectIdPaciente) => setIdPaciente(selectIdPaciente.target.value)} required>
                                                <optgroup>
                                                    <option value="0">Selecione um paciete</option>
                                                    {
                                                        ListaPaciente.map((Paciente) => {
                                                            return (
                                                                <option value={Paciente.idPaciente}>{Paciente.idUsuarioNavigation.email}</option>
                                                            )
                                                        })
                                                    }
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="LinhaFormCadastroConsulta">
                                        <div class="CampoCadastroConsulta">
                                            <label>Data e hora</label>
                                            <input type="datetime-local" value={DataHora} onChange={(inputDataHora) => setDataHora(inputDataHora.target.value)} required />
                                        </div>
                                        <div class="CampoCadastroConsulta">
                                            <label>Descrição</label>
                                            <input type="text" value={Descricao} onChange={(inputDescricao) => setDescricao(inputDescricao.target.value)} maxLength="1000" />
                                        </div>
                                    </div>
                                    <div class="BoxBotaoCadastroConsulta">
                                        {
                                            IsLoading === true ?
                                                <button type="submit" disabled>Agendando...</button> : <button type="submit">Agendar</button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </section>
                        <section class="ListaConsulta">

                            {
                                ListaConsulta.map((Consulta) => {
                                    return (
                                        <div class="BoxListaCon">
                                            <div class="ColunaBoxListaCon">
                                                <span class="TituloBoxListaCon">Informações da consulta</span>
                                                <div class="CampoBoxListaCon">
                                                    <span class="SubTituloBoxListaCon">Descrição</span>
                                                    <p>{Consulta.descricao}</p>
                                                </div>
                                                <div class="CampoBoxListaCon">
                                                    <span class="SubTituloBoxListaCon">Data</span>
                                                    <p>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Consulta.DataHorario.split('T')[0]))}</p>
                                                </div>
                                                <div class="CampoBoxListaCon">
                                                    <span class="SubTituloBoxListaCon">Hora</span>
                                                    <p>{Consulta.DataHorario.split('T')[1]}</p>
                                                </div>
                                                {/* <div class="CampoBoxListaCon">
                                                    <span class="SubTituloBoxListaCon">CNPJ da clínica</span>
                                                    <p>{Consulta.Medico}</p>
                                                </div>
                                                <div class="CampoBoxListaCon">
                                                    <span class="SubTituloBoxListaCon">Endereço</span>
                                                    <p>{Consulta.Medico}</p>
                                                </div> */}
                                            </div>
                                            <div class="DivisoriaVertical"></div>
                                            <div class="ColunaBoxListaCon">
                                                <div class="CampoUserCon">
                                                    <span class="TituloBoxListaCon">Médico</span>
                                                    <div class="InfoUserCon">
                                                        {/* <img src="../assets_/padrao.jpg" /> */}
                                                        <div class="InfoTextoUserCon">
                                                            <div class="LinhaTextoUserCon">
                                                                <span class="SubTituloBoxListaCon">Nome:</span>
                                                                <p>{Consulta.Medico.nome}</p>
                                                            </div>
                                                            <div class="LinhaTextoUserCon">
                                                                <span class="SubTituloBoxListaCon">Email:</span>
                                                                <p>{Consulta.Medico.Email}</p>
                                                            </div>
                                                            <div class="LinhaTextoUserCon">
                                                                <span class="SubTituloBoxListaCon">CRM:</span>
                                                                <p>{Consulta.Medico.CRM}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="CampoUserCon">
                                                    <span class="TituloBoxListaCon">Paciente</span>
                                                    <div class="InfoUserCon">
                                                        {/* <img src="../assets_/padrao.jpg" /> */}
                                                        <div class="InfoTextoUserCon">
                                                            <div class="LinhaTextoUserCon">
                                                                <span class="SubTituloBoxListaCon">Nome:</span>
                                                                <p>{Consulta.Paciente.Nome}</p>
                                                            </div>
                                                            {/* <div class="LinhaTextoUserCon">
                                                                <span class="SubTituloBoxListaCon">Email:</span>
                                                                <p>{Consulta.Paciente.email}</p>
                                                            </div> */}
                                                            <div class="LinhaTextoUserCon">
                                                                <span class="SubTituloBoxListaCon">CPF:</span>
                                                                <p>{Consulta.Paciente.CPF}</p>
                                                            </div>
                                                            <div class="LinhaTextoUserCon">
                                                                <span class="SubTituloBoxListaCon">RG:</span>
                                                                <p>{Consulta.Paciente.RG}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="CampoSituacaoCon">
                                                    <span class="TituloBoxListaCon">Situação:</span>
                                                    <div class="InfoSituacao">
                                                        <p>{Consulta.idSituacaoNavigation[0].nome}</p>
                                                        {/* {
                                                            IsLoading === true 
                                                            <button onClick={(Evento) => CancelarConsulta(Evento, Consulta.idConsulta)} disabled>Cancelando...</button> : <button onClick={(Evento) => CancelarConsulta(Evento, Consulta.idConsulta)}>Cancelar</button>
                                                        } */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        )
    // }
    // else if (TokenConvertido().Role === "2") {
    //     return (
    //         <div>
    //             <Header></Header>
    //             <main class="ConsultaMain">
    //                 <div class="ContainerConsulta ContainerGrid">
    //                     <section class="ListaConsulta">
    //                         {
    //                             ListaConsulta.map((Consulta) => {
    //                                 return (
    //                                     <div class="BoxListaCon">
    //                                         <div class="ColunaBoxListaCon">
    //                                             <span class="TituloBoxListaCon">Informações da consulta</span>
    //                                             <div class="CampoBoxListaCon">
    //                                                 <span class="SubTituloBoxListaCon">Descrição</span>
    //                                                 <p>{Consulta.descricao}</p>
    //                                                 <form onSubmit={(Evento) => AlterarDescricao(Evento, Consulta.idConsulta)}>
    //                                                     <input type="text" value={DescricaoAtualizada} onChange={ (InputDescricaoAtualizada) => setDescricaoAtualizada(InputDescricaoAtualizada.target.value)} placeholder="Alterar descrição..." required/>
    //                                                     {
    //                                                         IsLoading === true ? 
    //                                                         <button type="submit" disabled></button> : <button type="submit" ></button>
    //                                                     }
    //                                                 </form>
    //                                             </div>
    //                                             <div class="CampoBoxListaCon">
    //                                                 <span class="SubTituloBoxListaCon">Data</span>
    //                                                 <p>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Consulta.dataHorario.split('T')[0]))}</p>
    //                                             </div>
    //                                             <div class="CampoBoxListaCon">
    //                                                 <span class="SubTituloBoxListaCon">Hora</span>
    //                                                 <p>{Consulta.dataHorario.split('T')[1]}</p>
    //                                             </div>
    //                                             <div class="CampoBoxListaCon">
    //                                                 <span class="SubTituloBoxListaCon">CNPJ da clínica</span>
    //                                                 <p>{Consulta.idMedicoNavigation.idClinicaNavigation.cnpj}</p>
    //                                             </div>
    //                                             <div class="CampoBoxListaCon">
    //                                                 <span class="SubTituloBoxListaCon">Endereço</span>
    //                                                 <p>{Consulta.idMedicoNavigation.idClinicaNavigation.endereco}</p>
    //                                             </div>
    //                                         </div>
    //                                         <div class="DivisoriaVertical"></div>
    //                                         <div class="ColunaBoxListaCon">
    //                                             <div class="CampoUserCon">
    //                                                 <span class="TituloBoxListaCon">Médico</span>
    //                                                 <div class="InfoUserCon">
    //                                                     {/* <img src="../assets_/padrao.jpg" /> */}
    //                                                     <div class="InfoTextoUserCon">
    //                                                         <div class="LinhaTextoUserCon">
    //                                                             <span class="SubTituloBoxListaCon">Nome:</span>
    //                                                             <p>{Consulta.idMedicoNavigation.idUsuarioNavigation.nome}</p>
    //                                                         </div>
    //                                                         <div class="LinhaTextoUserCon">
    //                                                             <span class="SubTituloBoxListaCon">Email:</span>
    //                                                             <p>{Consulta.idMedicoNavigation.idUsuarioNavigation.email}</p>
    //                                                         </div>
    //                                                         <div class="LinhaTextoUserCon">
    //                                                             <span class="SubTituloBoxListaCon">CRM:</span>
    //                                                             <p>{Consulta.idMedicoNavigation.crm}</p>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                             <div class="CampoUserCon">
    //                                                 <span class="TituloBoxListaCon">Paciente</span>
    //                                                 <div class="InfoUserCon">
    //                                                     {/* <img src="../assets_/padrao.jpg" /> */}
    //                                                     <div class="InfoTextoUserCon">
    //                                                         <div class="LinhaTextoUserCon">
    //                                                             <span class="SubTituloBoxListaCon">Nome:</span>
    //                                                             <p>{Consulta.idPacienteNavigation.idUsuarioNavigation.nome}</p>
    //                                                         </div>
    //                                                         <div class="LinhaTextoUserCon">
    //                                                             <span class="SubTituloBoxListaCon">Email:</span>
    //                                                             <p>{Consulta.idPacienteNavigation.idUsuarioNavigation.email}</p>
    //                                                         </div>
    //                                                         <div class="LinhaTextoUserCon">
    //                                                             <span class="SubTituloBoxListaCon">CPF:</span>
    //                                                             <p>{Consulta.idPacienteNavigation.cpf}</p>
    //                                                         </div>
    //                                                         <div class="LinhaTextoUserCon">
    //                                                             <span class="SubTituloBoxListaCon">RG:</span>
    //                                                             <p>{Consulta.idPacienteNavigation.rg}</p>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                             <div class="CampoSituacaoCon">
    //                                                 <span class="TituloBoxListaCon">Situação:</span>
    //                                                 <div class="InfoSituacao">
    //                                                     <p>{ListaSituacao.find(S => S.idSituacao === Consulta.idSituacao).nome}</p>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 )
    //                             })
    //                         }
    //                     </section>
    //                 </div>
    //             </main>
    //             <Footer></Footer>
    //         </div>
    //     )
    // }
    // else return (
    //     <div>
    //         <Header></Header>
    //         <main class="ConsultaMain">
    //             <div class="ContainerConsulta ContainerGrid">
    //                 <section class="ListaConsulta">
    //                     {
    //                         ListaConsulta.map((Consulta) => {
    //                             return (
    //                                 <div class="BoxListaCon">
    //                                     <div class="ColunaBoxListaCon">
    //                                         <span class="TituloBoxListaCon">Informações da consulta</span>
    //                                         <div class="CampoBoxListaCon">
    //                                             <span class="SubTituloBoxListaCon">Descrição</span>
    //                                             <p>{Consulta.descricao}</p>
    //                                         </div>
    //                                         <div class="CampoBoxListaCon">
    //                                             <span class="SubTituloBoxListaCon">Data</span>
    //                                             <p>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(Consulta.dataHorario.split('T')[0]))}</p>
    //                                         </div>
    //                                         <div class="CampoBoxListaCon">
    //                                             <span class="SubTituloBoxListaCon">Hora</span>
    //                                             <p>{Consulta.dataHorario.split('T')[1]}</p>
    //                                         </div>
    //                                         <div class="CampoBoxListaCon">
    //                                             <span class="SubTituloBoxListaCon">CNPJ da clínica</span>
    //                                             <p>{Consulta.idMedicoNavigation.idClinicaNavigation.cnpj}</p>
    //                                         </div>
    //                                         <div class="CampoBoxListaCon">
    //                                             <span class="SubTituloBoxListaCon">Endereço</span>
    //                                             <p>{Consulta.idMedicoNavigation.idClinicaNavigation.endereco}</p>
    //                                         </div>
    //                                     </div>
    //                                     <div class="DivisoriaVertical"></div>
    //                                     <div class="ColunaBoxListaCon">
    //                                         <div class="CampoUserCon">
    //                                             <span class="TituloBoxListaCon">Médico</span>
    //                                             <div class="InfoUserCon">
    //                                                 {/* <img src="../assets_/padrao.jpg" /> */}
    //                                                 <div class="InfoTextoUserCon">
    //                                                     <div class="LinhaTextoUserCon">
    //                                                         <span class="SubTituloBoxListaCon">Nome:</span>
    //                                                         <p>{Consulta.idMedicoNavigation.idUsuarioNavigation.nome}</p>
    //                                                     </div>
    //                                                     <div class="LinhaTextoUserCon">
    //                                                         <span class="SubTituloBoxListaCon">Email:</span>
    //                                                         <p>{Consulta.idMedicoNavigation.idUsuarioNavigation.email}</p>
    //                                                     </div>
    //                                                     <div class="LinhaTextoUserCon">
    //                                                         <span class="SubTituloBoxListaCon">CRM:</span>
    //                                                         <p>{Consulta.idMedicoNavigation.crm}</p>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div class="CampoUserCon">
    //                                             <span class="TituloBoxListaCon">Paciente</span>
    //                                             <div class="InfoUserCon">
    //                                                 {/* <img src="../assets_/padrao.jpg" /> */}
    //                                                 <div class="InfoTextoUserCon">
    //                                                     <div class="LinhaTextoUserCon">
    //                                                         <span class="SubTituloBoxListaCon">Nome:</span>
    //                                                         <p>{Consulta.idPacienteNavigation.idUsuarioNavigation.nome}</p>
    //                                                     </div>
    //                                                     <div class="LinhaTextoUserCon">
    //                                                         <span class="SubTituloBoxListaCon">Email:</span>
    //                                                         <p>{Consulta.idPacienteNavigation.idUsuarioNavigation.email}</p>
    //                                                     </div>
    //                                                     <div class="LinhaTextoUserCon">
    //                                                         <span class="SubTituloBoxListaCon">CPF:</span>
    //                                                         <p>{Consulta.idPacienteNavigation.cpf}</p>
    //                                                     </div>
    //                                                     <div class="LinhaTextoUserCon">
    //                                                         <span class="SubTituloBoxListaCon">RG:</span>
    //                                                         <p>{Consulta.idPacienteNavigation.rg}</p>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div class="CampoSituacaoCon">
    //                                             <span class="TituloBoxListaCon">Situação:</span>
    //                                             <div class="InfoSituacao">
    //                                                 <p>{ListaSituacao.find(S => S.idSituacao === Consulta.idSituacao).nome}</p>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </section>
    //             </div>
    //         </main>
    //        <Footer></Footer>
    //     </div>
    //  )
}