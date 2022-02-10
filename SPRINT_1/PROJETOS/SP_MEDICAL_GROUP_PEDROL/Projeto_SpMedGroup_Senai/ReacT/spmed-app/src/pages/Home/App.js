import '../../Css/Home.css';
import ImgClinicasParceiras from '../../assets_/close-up-woman-writing.jpg';
import ImgMinhasConsultas from '../../assets_/woman-visiting-female-doctor.jpg';
import Footer from '../../Components/Footer/Footer.jsx';
import Header from '../../Components/Header/Header.jsx';
import { Link } from 'react-router-dom';
import { UsuarioAutenticado } from '../../Services/auth.js'
import { useEffect } from "react";

function App() {
    //Import the below modules using "npm i -save request oauth-1.0a crypto"
    const request = require('request')
    const OAuth = require('oauth-1.0a')
    const crypto = require('crypto') // depenency package for OAuth-1.0a

    // Token request function
    function generateToken() {
        // #1 Initialize OAuth with your HERE OAuth credentials from the credentials file that you downloaded above
        const oauth = OAuth({
            consumer: {
                key: 'thMTz5d53GkqU0cvxceAeg', //Access key
                secret: 'NNhP5FF2XwTDWlHEJM4JwwLK_VTzzBcooN7rj62sKIxdzYjoLBKZTVZvn94rs8Nx7hwI0IgvMInw-Zltsr54iw', //Secret key
            },
            signature_method: 'HMAC-SHA256',
            hash_function(base_string, key) {
                return crypto
                    .createHmac('sha256', key)
                    .update(base_string)
                    .digest('base64')
            },
        });
        // #2 Building the request object.
        const request_data = {
            url: 'https://account.api.here.com/oauth2/token',
            method: 'POST',
            data: { grant_type: 'client_credentials' },
        };
        // #3 Sending the request to get the access token
        request(
            {
                url: request_data.url,
                method: request_data.method,
                form: request_data.data,
                headers: oauth.toHeader(oauth.authorize(request_data)),
            },
            function (error, response, body) {

                if (response.statusCode == 200) {
                    let result = JSON.parse(response.body);
                    localStorage.setItem('token-geocode', result.access_token);
                }
            }
        );
    }

    useEffect(generateToken, []);

    document.title = "SpMed - Home";
    return (
        <div>
            <Header></Header>
            <main>
                <section class="Banner">
                    <div class="ContainerGrid ContainerBanner">
                        <h1>Administre suas consultas médicas de qualquer lugar!</h1>
                        {
                            UsuarioAutenticado() === false ?
                                <Link Link to="/Login" className="Link">Já é cadastrado? Entre!</Link> : <Link Link to='/Perfil' className="Link">Vá ao seu perfil!</Link>
                        }
                    </div>
                </section>
                <section class="ClinicasParceiras">
                    <div class="ContainerGrid ContainerClinicasParceiras">
                        <img src={ImgClinicasParceiras} class="ImagemClinicasParceiras" alt="Imagem da mesa de um consultório, com uma ficha médica sendo analisada por um doutor e um estetoscópio ao lado."></img>
                        <div class="QuadradoClinicasParceiras"></div>
                        <div class="BoxClinicasParceiras">
                            <p>Clínicas repletas de especialistas em qualquer lugar do Brasil. Consulte já nossas parceiras e
                                conheça seus profissionais e especialidades</p>
                            <Link Link to="/Clinicas" className="Link">Ir às clínicas parceiras</Link>
                        </div>
                    </div>
                </section>
                <section class="Consultas">
                    <div class="ContainerGrid ContainerConsultas">
                        <div class="BoxConsultas">
                            <p>Acesse e administre suas consultas, futuras ou já realizadas em qualquer lugar e de qualquer lugar </p>
                            <a>Ir às minhas consultas</a>
                        </div>
                        <div class="QuadradoConsultas"></div>
                        <img src={ImgMinhasConsultas} class="ImagemConsultas" alt="Médica atendendo uma paciente em um consultório de clínica. Ambas estão felizes e em uma conversa amigável e prazerosa"></img>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default App;
