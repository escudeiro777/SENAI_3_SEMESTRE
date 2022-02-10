import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Marker from '../../assets_/Marker.png';
import '../../Css/Mapa.css';

const Marcador = () => <img className="ImgMarker" src={Marker}></img>;

export default function Mapa() {
    const [ListaLocalizacoes, setListaLocalizacoes] = useState([]);
    const Center = {
        lat: -23.555771,
        lng: -46.639557
    }
    // -23.555771,-46.639557
    const Zoom = 11;
    let Navigate = useNavigate();

    function PreencherLista() {
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
        })
    }

    useEffect(async () => {
        await PreencherLista();
    });

    return (
        <div className="DivMapa" class="DivMapa">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyD2iqvlmpETB-L0AYbikStCEEBj9zhHU5A' }}
                defaultCenter={Center}
                defaultZoom={Zoom}
            >
                {
                    ListaLocalizacoes.map((Localizacao) => {
                        return (
                            <Marcador
                                lat={Localizacao.latitude}
                                lng={Localizacao.longitude}
                            />
                        )
                    })
                }
            </GoogleMapReact>
        </div>
    );
}