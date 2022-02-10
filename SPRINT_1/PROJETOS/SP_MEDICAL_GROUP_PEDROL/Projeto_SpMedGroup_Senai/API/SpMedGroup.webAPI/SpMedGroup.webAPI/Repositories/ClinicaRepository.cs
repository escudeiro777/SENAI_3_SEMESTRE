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
    /// Repositório para a definição da usabilidade dos métodos da entidade de Clinica
    /// </summary>
    public class ClinicaRepository : IClinicaRepository
    {
        /// <summary>
        /// Objeto do tipo contexto para as interações com o BD
        /// </summary>
        private SpMedGroupContext Ctx = new SpMedGroupContext();

        public void Atualizar(Clinica ClinicaAtualizada, int IdClinicaAtualizada)
        {
            Clinica ClinicaBuscada = BuscarPorId(IdClinicaAtualizada);

            if (ClinicaBuscada != null)
            {
                ClinicaBuscada = new()
                {
                    HorarioDeAbertura = ClinicaAtualizada.HorarioDeAbertura,
                    HorarioDeFechamento = ClinicaAtualizada.HorarioDeFechamento,
                    Endereco = ClinicaAtualizada.Endereco,
                    RazaoSocial = ClinicaAtualizada.RazaoSocial,
                    NomeFantasia = ClinicaAtualizada.NomeFantasia,
                    Cnpj = ClinicaAtualizada.Cnpj,
                    IdClinica = Convert.ToInt16(IdClinicaAtualizada)
                };

                Ctx.Update(ClinicaBuscada);
                Ctx.SaveChanges();
            }
        }

        public Clinica BuscarPorId(int IdClinica)
        {
            return Ctx.Clinicas.Select(C => new Clinica()
            {
                IdClinica = C.IdClinica,
                HorarioDeAbertura = C.HorarioDeAbertura,
                HorarioDeFechamento = C.HorarioDeFechamento,
                Endereco = C.Endereco,
                RazaoSocial = C.RazaoSocial,
                NomeFantasia = C.NomeFantasia,
                Cnpj = C.Cnpj,
                Medicos = C.Medicos.Select(M => new Medico()
                {
                    IdMedico = M.IdMedico,
                    IdUsuario = M.IdMedico,
                    IdClinica = M.IdClinica,
                    IdEspecialidade = M.IdEspecialidade,
                    Crm = M.Crm,
                    IdUsuarioNavigation = new Usuario()
                    {
                        IdTipoUsuario = M.IdUsuarioNavigation.IdTipoUsuario,
                        Email = M.IdUsuarioNavigation.Email,
                        DataDeNascimento = M.IdUsuarioNavigation.DataDeNascimento
                    }
                }).ToList()
            }).FirstOrDefault(C => C.IdClinica == IdClinica);
        }

        public void Cadastrar(Clinica NovaClinica)
        {
            Ctx.Clinicas.Add(NovaClinica);
            Ctx.SaveChanges();
        }

        public void Deletar(int IdClinicaDeletada)
        {
            Ctx.Remove(BuscarPorId(IdClinicaDeletada));
            Ctx.SaveChanges();
        }

        public List<Clinica> ListarTodas()
        {
            return Ctx.Clinicas.Select(C => new Clinica() { 
                IdClinica = C.IdClinica,
                HorarioDeAbertura = C.HorarioDeAbertura,
                HorarioDeFechamento = C.HorarioDeFechamento,
                Endereco = C.Endereco,
                RazaoSocial = C.RazaoSocial,
                NomeFantasia = C.NomeFantasia,
                Cnpj = C.Cnpj,
                Medicos = C.Medicos.Select(M => new Medico() { 
                    IdMedico = M.IdMedico,
                    IdUsuario = M.IdMedico,
                    IdClinica = M.IdClinica,
                    IdEspecialidade = M.IdEspecialidade,
                    Crm = M.Crm,
                    IdUsuarioNavigation = new Usuario()
                    {
                        Nome = M.IdUsuarioNavigation.Nome,
                        Email = M.IdUsuarioNavigation.Email,
                        DataDeNascimento = M.IdUsuarioNavigation.DataDeNascimento
                    },
                    IdEspecialidadeNavigation = new Especialidade()
                    {
                        Nome = M.IdEspecialidadeNavigation.Nome
                    }
                }).ToList()
            }).ToList();
        }
    }
}
