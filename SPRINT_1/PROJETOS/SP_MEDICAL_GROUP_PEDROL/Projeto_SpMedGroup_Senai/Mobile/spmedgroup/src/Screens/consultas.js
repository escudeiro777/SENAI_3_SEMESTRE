import React, { Component } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
    Image,
    FlatList
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import api from '../Services/api';
import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default class Consulta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Role: '',
            ListaConsultas: [],
            ListaSituacoes: []
        }
    }

    LerToken = async () => {
        try {
            const TokenDados = await AsyncStorage.getItem('usuario-login');
            this.setState({ Role: jwtDecode(TokenDados).Role });
        } catch (error) {
            console.warn(error);
        }
    }

    PreencherListaConsultas = async () => {
        try {
            const TokenDados = await AsyncStorage.getItem('usuario-login');
            if (this.state.Role == "1") {
                const Resposta = await api('/Consultas', {
                    headers: {
                        Authorization: 'Bearer ' + TokenDados
                    },
                });
                this.setState({ ListaConsultas: Resposta.data });
            }
            else {
                const Resposta = await api('/Consultas/ListarMinhas', {
                    headers: {
                        Authorization: 'Bearer ' + TokenDados
                    },
                });
                this.setState({ ListaConsultas: Resposta.data });
            }
        } catch (error) {
            // await AsyncStorage.removeItem('usuario-login');
            // this.props.navigation.navigate('Login');
            console.warn(error);
        }
    }

    PreencherListaSituacoes = async () => {
        try {
            const TokenDados = await AsyncStorage.getItem('usuario-login');
            const Resposta = await api('/Situacoes', {
                headers: {
                    Authorization: 'Bearer ' + TokenDados
                },
            });
            this.setState({ ListaSituacoes: Resposta.data });
        } catch (error) {
            // await AsyncStorage.removeItem('usuario-login');
            // this.props.navigation.navigate('Login');
            console.warn(error);
        }
    }

    componentDidMount = async () => {
        await this.LerToken();
        await this.PreencherListaSituacoes();
        this.PreencherListaConsultas();
    }

    render() {
        return (
            <View style={styles.Main}>
                <Text style={styles.Titulo}>Minhas Consultas</Text>
                <FlatList
                    contentContainerStyle={styles.mainBodyContent}
                    data={this.state.ListaConsultas}
                    keyExtractor={item => item.idConsulta}
                    renderItem={this.renderItem}
                    style={styles.Lista}
                />
            </View>
        )
    }

    renderItem = ({ item }) => (
        <View style={styles.ContainerItem}>
            <View style={styles.CampoItem}>
                <Text style={styles.TituloItem}>Informações da consulta</Text>
                <View style={styles.CampoDadosItem}>
                    <Text style={styles.SubtituloItem}>Descrição</Text>
                    <Text style={styles.DadosItem}>{item.descricao}</Text>
                </View>
                <View style={styles.CampoDadosItem}>
                    <Text style={styles.SubtituloItem}>Data</Text>
                    <Text style={styles.DadosItem}>{Intl.DateTimeFormat('pt-br').format(new Date(item.dataHorario))}</Text>
                </View>
                <View style={styles.CampoDadosItem}>
                    <Text style={styles.SubtituloItem}>Hora</Text>
                    <Text style={styles.DadosItem}>{item.dataHorario.split('T')[1]}</Text>
                </View>
                <View style={styles.CampoDadosItem}>
                    <Text style={styles.SubtituloItem}>CNPJ</Text>
                    <Text style={styles.DadosItem}>{item.idMedicoNavigation.idClinicaNavigation.cnpj}</Text>
                </View>
                <View style={styles.CampoDadosItem}>
                    <Text style={styles.SubtituloItem}>Endereço</Text>
                    <Text style={styles.DadosItem}>{item.idMedicoNavigation.idClinicaNavigation.endereco}</Text>
                </View>
            </View>
            <View style={styles.CampoItem}>
                <Text style={styles.TituloItem}>Médico</Text>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>Nome:</Text>
                    <Text style={styles.DadosItem}>{item.idMedicoNavigation.idUsuarioNavigation.nome}</Text>
                </View>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>Email:</Text>
                    <Text style={styles.DadosItem}>{item.idMedicoNavigation.idUsuarioNavigation.email}</Text>
                </View>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>CRM:</Text>
                    <Text style={styles.DadosItem}>{item.idMedicoNavigation.crm}</Text>
                </View>
            </View>
            <View style={styles.CampoItem}>
                <Text style={styles.TituloItem}>Paciente</Text>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>Nome:</Text>
                    <Text style={styles.DadosItem}>{item.idPacienteNavigation.idUsuarioNavigation.nome}</Text>
                </View>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>Email:</Text>
                    <Text style={styles.DadosItem}>{item.idPacienteNavigation.idUsuarioNavigation.email}</Text>
                </View>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>CPF:</Text>
                    <Text style={styles.DadosItem}>{item.idPacienteNavigation.cpf}</Text>
                </View>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>RG:</Text>
                    <Text style={styles.DadosItem}>{item.idPacienteNavigation.rg}</Text>
                </View>
            </View>
            <View style={styles.CampoItem}>
                <Text style={styles.TituloItem}>Situação</Text>
                <View style={styles.CampoDadosItemHorizontal}>
                    <Text style={styles.SubtituloItem}>{this.state.ListaSituacoes.find((S) => S.idSituacao == item.idSituacao).nome}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    Main: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    Titulo: {
        fontSize: 40,
        width: 180,
        color: '#1D6153',
        textAlign: 'center',
        marginTop: 42,
        fontFamily: 'Questrial-Regular'
    },
    ContainerItem: {
        width: 300,
        marginTop: 20,
        padding: 25,
        borderColor: '#BFBFBF',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'flex-start',
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    CampoItem: {
        flexDirection: 'column',
        marginBottom: 30
    },
    TituloItem: {
        fontSize: 25,
        color: '#1D6153',
        marginBottom: 22,
        fontFamily: 'Questrial-Regular'
    },
    CampoDadosItem: {
        flexDirection: 'column',
        marginBottom: 22,
    },
    SubtituloItem: {
        fontSize: 20,
        color: '#52615E',
        marginRight: 10,
        marginBottom: 10,
        fontFamily: 'Questrial-Regular'
    },
    DadosItem: {
        color: '#52615E',
        fontSize: 15,
        flexWrap: 'wrap',
        fontFamily: 'Questrial-Regular'
    },
    CampoDadosItemHorizontal: {
        alignItems: 'baseline',
        marginBottom: 22,
        flexDirection: 'row'
    }
})