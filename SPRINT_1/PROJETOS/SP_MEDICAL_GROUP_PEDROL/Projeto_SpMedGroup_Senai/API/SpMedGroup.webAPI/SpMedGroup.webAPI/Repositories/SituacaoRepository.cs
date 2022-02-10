using Microsoft.EntityFrameworkCore;
using SpMedGroup.webAPI.Contexts;
using SpMedGroup.webAPI.Domains;
using SpMedGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Repositories
{
    /// <summary>
    /// Repositório para a definição da usabilidade dos métodos da entidade de Situacao
    /// </summary>
    public class SituacaoRepository : ISituacaoRepository
    {
        /// <summary>
        /// Objeto do tipo contexto para as interações com o BD
        /// </summary>
        private SpMedGroupContext Ctx = new SpMedGroupContext();

        public void Atualizar(Situacao SituacaoAtualizada, int IdSituacaoAtualizada)
        {
            Situacao SituacaoBuscada = BuscarPorId(IdSituacaoAtualizada);

            if (SituacaoBuscada != null)
            {
                SituacaoBuscada = new Situacao()
                {
                    Nome = SituacaoAtualizada.Nome,
                    IdSituacao = Convert.ToByte(IdSituacaoAtualizada)
                };

                Ctx.Situacaos.Update(SituacaoBuscada);
                Ctx.SaveChanges();
            }
        }

        public Situacao BuscarPorId(int IdSituacao)
        {
            return Ctx.Situacaos.Select(S => new Situacao() { 
                IdSituacao = S.IdSituacao,
                Nome = S.Nome,
                Consulta = S.Consulta
            }).FirstOrDefault(S => S.IdSituacao == IdSituacao);
        }

        public void Cadastrar(Situacao NovaSituacao)
        {
            Ctx.Situacaos.Add(NovaSituacao);
            Ctx.SaveChanges();
        }

        public void Deletar(int IdSituacaoDeletada)
        {
            Situacao SituacaoDeletada = BuscarPorId(IdSituacaoDeletada);
            if (SituacaoDeletada != null)
            {
                Situacao SituacaoBuscada = new()
                {
                    Nome = SituacaoDeletada.Nome,
                    IdSituacao = Convert.ToByte(IdSituacaoDeletada)
                };
                Ctx.Situacaos.Remove(SituacaoBuscada);
                Ctx.SaveChanges();
            }
        }

        public List<Situacao> ListarTodas()
        {
            return Ctx.Situacaos.Select(S => new Situacao()
            {
                IdSituacao = S.IdSituacao,
                Nome = S.Nome,
                Consulta = S.Consulta
            }).ToList();
        }
    }
}
