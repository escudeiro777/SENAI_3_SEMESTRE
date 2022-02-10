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

export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Telefone: '',
            Cpf: '',
            DataDeNascimento: '',
            Endereco: '',
            Rg: '',
            Nome: '',
            Id: '',
            Base64: ''
        }
    }

    componentDidMount = async () => {
        await this.LerToken();
        await this.PreencherDadosUsuario();
        await this.consultaImgPerfil();
    }

    PreencherDadosUsuario = async () => {
        try {
            const TokenDados = await AsyncStorage.getItem('usuario-login');
            const Resposta = await api.get('/Usuarios/' + this.state.Id, {
                headers: {
                    Authorization: 'Bearer ' + TokenDados
                },
            });
            // console.warn(Resposta.data.paciente);
            this.setState({ Email: Resposta.data.email });
            this.setState({ Nome: Resposta.data.nome });
            this.setState({ DataDeNascimento: Resposta.data.dataDeNascimento });
            if (Resposta.data.paciente !== undefined) {
                this.setState({Telefone: Resposta.data.paciente.telefone});
                this.setState({Cpf: Resposta.data.paciente.cpf});
                this.setState({Endereco: Resposta.data.paciente.endereco});
                this.setState({Rg: Resposta.data.paciente.rg});
            }
        } catch (error) {
            console.warn(error);
        }
    }

    consultaImgPerfil = async () => {
        const token = await AsyncStorage.getItem('usuario-login');
    
        api
          .get('/Perfis', {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(resposta => {
            if (resposta.status === 200) {
              this.setState({Base64: resposta.data});
            }
          })
          .catch(async (error) => {
            await AsyncStorage.removeItem('usuario-login');
            this.props.navigation.navigate('Login');
          });
      };

    LerToken = async () => {
        try {
            const TokenDados = await AsyncStorage.getItem('usuario-login');
            this.setState({ Id: jwtDecode(TokenDados).jti });
        } catch (error) {
            console.warn(error);
        }
    }

    CalcularIdade(DataDeNascimento) {
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

    render() {
        return (
            <View style={styles.Main}>
                <Text style={styles.Titulo}>{this.state.Nome}</Text>
                <View style={styles.SectionImgPerfil}>
                    <Image style={styles.ImgPerfil} source={{uri: `data:image/jpg;base64,${this.state.Base64}`}}></Image>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilCamera')} style={styles.BotaoAlterarImgPerfil}>
                        <Text style={styles.TextoAlterarImgPerfil}>Alterar Imagem de Perfil</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.ListaDadosUser}>
                    <View style={styles.BoxDadosUser}>
                        <Text style={styles.TituloDadosUser}>Email:</Text>
                        <Text style={styles.DadosUser}>{this.state.Email}</Text>
                    </View>
                    <View style={styles.BoxDadosUser}>
                        <Text style={styles.TituloDadosUser}>Telefone:</Text>
                        <Text style={styles.DadosUser}>{this.state.Telefone}</Text>
                    </View>
                    <View style={styles.BoxDadosUser}>
                        <Text style={styles.TituloDadosUser}>Cpf:</Text>
                        <Text style={styles.DadosUser}>{this.state.Cpf}</Text>
                    </View>
                    <View style={styles.BoxDadosUser}>
                        <Text style={styles.TituloDadosUser}>Idade:</Text>
                        <Text style={styles.DadosUser}>{this.state.DataDeNascimento !== undefined ? this.CalcularIdade(this.state.DataDeNascimento) : 'Indefinida'}</Text>
                    </View>
                    <View style={styles.BoxDadosUser}>
                        <Text style={styles.TituloDadosUser}>Endereço:</Text>
                        <Text style={styles.DadosUser}>{this.state.Endereco}</Text>
                    </View>
                    <View style={styles.BoxDadosUser}>
                        <Text style={styles.TituloDadosUser}>RG:</Text>
                        <Text style={styles.DadosUser}>{this.state.Rg}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingTop: 64
    },
    Titulo: {
        fontSize: 40,
        color: '#1D6153',
        marginBottom: 10,
        fontFamily: 'Questrial-Regular'
    },
    SectionImgPerfil: {
        height: 110,
        alignItems: 'center',
        justifyContent: 'space-between'
    },  
    ImgPerfil: {
        width: 90,
        height: 90,
        borderRadius: 50
    },
    BotaoAlterarImgPerfil: {
        width: 110
    },
    TextoAlterarImgPerfil: {
        fontSize: 15,
        color: '#1D6153',
        textAlign: 'center',
        fontFamily: 'Questrial-Regular'
    },
    ListaDadosUser: {
        marginTop: 64,
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30
    },
    BoxDadosUser: {
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    TituloDadosUser: {
        fontSize: 20,
        color: '#1D6153',
        marginRight: 10,
        fontFamily: 'Questrial-Regular'
    },
    DadosUser: {
        fontSize: 15,
        color: '#52615E',
        flexWrap: 'wrap',
        fontFamily: 'Questrial-Regular'
    }
})