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
    /// Repositório para a definição da usabilidade dos métodos da entidade de Especialidade
    /// </summary>
    public class EspecialidadeRepository : IEspecialidadeRepository
    {
        /// <summary>
        /// Objeto do tipo contexto para as interações com o BD
        /// </summary>
        private SpMedGroupContext Ctx = new SpMedGroupContext();

        public void Atualizar(Especialidade EspecialidadeAtualizada, int IdEspecialidadeAtualizada)
        {
            Especialidade EspecialidadeBuscada = BuscarPorId(IdEspecialidadeAtualizada);

            if (EspecialidadeBuscada != null)
            {
                EspecialidadeBuscada = new()
                {
                    Nome = EspecialidadeAtualizada.Nome,
                    IdEspecialidade = Convert.ToByte(IdEspecialidadeAtualizada)
                };
                Ctx.Especialidades.Update(EspecialidadeBuscada);
                Ctx.SaveChanges();
            }
        }

        public Especialidade BuscarPorId(int IdEspecialidade)
        {
            return Ctx.Especialidades.Select(E => new Especialidade()
            {
                IdEspecialidade = E.IdEspecialidade,
                Nome = E.Nome,
                Medicos = E.Medicos.Select(M => new Medico() { 
                    IdMedico = M.IdMedico,
                    IdUsuario = M.IdUsuario,
                    IdClinica = M.IdClinica,
                    IdEspecialidade = M.IdEspecialidade,
                    Crm = M.Crm,
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = M.IdUsuarioNavigation.Email,
                        DataDeNascimento = M.IdUsuarioNavigation.DataDeNascimento,
                        Nome = M.IdUsuarioNavigation.Nome
                    }
                }).ToList()
            }).FirstOrDefault(E => E.IdEspecialidade == IdEspecialidade);
        }

        public void Cadastrar(Especialidade NovaEspecialidade)
        {
            Ctx.Especialidades.Add(NovaEspecialidade);
            Ctx.SaveChanges();
        }

        public void Deletar(int IdEspecialidadeDeletada)
        {
            Ctx.Especialidades.Remove(BuscarPorId(IdEspecialidadeDeletada));
            Ctx.SaveChanges();
        }

        public List<Especialidade> ListarTodas()
        {
            return Ctx.Especialidades.Select(E => new Especialidade()
            {
                IdEspecialidade = E.IdEspecialidade,
                Nome = E.Nome,
                Medicos = E.Medicos.Select(M => new Medico()
                {
                    IdMedico = M.IdMedico,
                    IdUsuario = M.IdUsuario,
                    IdClinica = M.IdClinica,
                    IdEspecialidade = M.IdEspecialidade,
                    Crm = M.Crm,
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = M.IdUsuarioNavigation.Email,
                        DataDeNascimento = M.IdUsuarioNavigation.DataDeNascimento,
                        Nome = M.IdUsuarioNavigation.Nome
                    }
                }).ToList()
            }).ToList();
        }
    }
}
