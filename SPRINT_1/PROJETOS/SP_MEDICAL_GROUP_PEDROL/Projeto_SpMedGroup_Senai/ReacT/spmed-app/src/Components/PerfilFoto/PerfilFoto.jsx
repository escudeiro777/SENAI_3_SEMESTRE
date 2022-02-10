import React, { Component } from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function ImagemPerfil() {
    const [ImgPerfil, setImg] = useState(null);
    let Navigate = useNavigate();

    function BuscarImg() {
        axios('http://192.168.6.108:5000/api/Perfis', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    setImg(resposta.data)
                }
            })
            .catch((erro) => {
                localStorage.removeItem('usuario-login');
                Navigate('/Login')
            })
    }

    useEffect(BuscarImg, []);

    return (
        <img src={'data:image;base64,' + ImgPerfil}></img>
    )
}