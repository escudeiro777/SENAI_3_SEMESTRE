using MongoDB.Driver;
using SpMedGroup.webAPI.Domains;
using SpMedGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoRepository
    {
        private readonly IMongoCollection<Localizacao> _Localizacoes;

        public LocalizacaoRepository()
        {
            var Client = new MongoClient("mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb");
            var Bd = Client.GetDatabase("Mapas");
            _Localizacoes = Bd.GetCollection<Localizacao>( "Localizacoes" );
        }

        public void Cadastar(Localizacao NovaLocalizacao)
        {
            _Localizacoes.InsertOne(NovaLocalizacao);
        }

        public List<Localizacao> Listar()
        {
            return _Localizacoes.Find(L => true).ToList();
        }
    }
}
