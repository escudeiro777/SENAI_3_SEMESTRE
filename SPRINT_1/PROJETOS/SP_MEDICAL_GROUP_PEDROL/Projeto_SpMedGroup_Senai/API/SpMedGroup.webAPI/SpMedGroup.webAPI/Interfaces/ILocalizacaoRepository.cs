using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    interface ILocalizacaoRepository
    {
        List<Localizacao> Listar();

        void Cadastar(Localizacao NovaLocalizacao);
    }
}