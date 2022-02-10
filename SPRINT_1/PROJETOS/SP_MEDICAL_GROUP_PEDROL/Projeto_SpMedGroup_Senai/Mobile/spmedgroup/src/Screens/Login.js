import React, { Component } from 'react';
import api from '../Services/api';
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
    Image
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Senha: '',
            MsgErro: '',
        }
    }

    Logar = async () => {
        try {
            const resposta = await api.post('/Login', {
                email: this.state.Email,
                senha: this.state.Senha,
            });
            const token = resposta.data.tokenRetorno;
            await AsyncStorage.setItem('usuario-login', token);
            await this.setState({Email: ''});
            await this.setState({Senha: ''});
            await this.setState({MsgErro: ''});
            if (resposta.status === 200) {
                this.props.navigation.navigate('Main');
            }
        } catch (error) {
            // console.warn(JSON.parse(error))
            // if (JSON.parse(error).status == 404) {
                this.setState({MsgErro: 'E-mail ou senha inválidos! Tente novamente'})
            // }
        }
    }

    render() {
        return (
            <ImageBackground style={styles.Background} source={require('../../assets/abstract-blur-in-hospital.jpg')}>
                <View style={styles.Overlay}></View>
                <View style={styles.Main}>
                    <Image style={styles.LogoLogin} source={require('../../assets/Group48.png')}></Image>
                    <View style={styles.BoxLogin}>
                        <Text style={styles.MensagemErro}>{this.state.MsgErro}</Text>
                        <Text style={styles.TituloLogin}>Login</Text>
                        <TextInput value={this.state.Email} style={styles.InputLogin} placeholder="Email" placeholderTextColor="#52615E"
                            keyboardType="email-address" onChangeText={(Email) => this.setState({ Email })}></TextInput>
                        <TextInput value={this.state.Senha} style={styles.InputLogin} placeholder="Senha" placeholderTextColor="#52615E" secureTextEntry={true} keyboardType="default" onChangeText={(Senha) => this.setState({ Senha })}></TextInput>
                        <TouchableOpacity style={styles.BotaoLogin} onPress={this.Logar}>
                            <Text style={styles.TextoBotao}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({
    Overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(95,173,158,0.5)'
    },
    Background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Main: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    BoxLogin: {
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 300,
        height: 322,
        backgroundColor: "#FFF",
        borderRadius: 20,
        borderColor: '#BFBFBF',
        borderWidth: 1
    },
    TituloLogin: {
        fontSize: 25,
        color: '#1D6153',
        fontFamily: 'Questrial-Regular'
    },
    InputLogin: {
        width: 200,
        borderRadius: 10,
        borderColor: '#BFBFBF',
        borderWidth: 1,
        fontSize: 15,
        color: '#52615E',
        fontFamily: 'Questrial-Regular'
    },
    LogoLogin: {
        width: 68,
        height: 62,
    },
    BotaoLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#5FAD9E'
    },
    TextoBotao: {
        color: "#FFF",
        fontSize: 24,
        fontFamily: 'Questrial-Regular'
    },
    MensagemErro: {
        color: '#FF0000',
        fontSize: 13
    }
})