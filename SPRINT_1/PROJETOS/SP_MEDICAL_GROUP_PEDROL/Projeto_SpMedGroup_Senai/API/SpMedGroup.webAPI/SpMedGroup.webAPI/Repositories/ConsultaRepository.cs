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
    /// Repositório para a definição da usabilidade dos métodos da entidade de Consulta
    /// </summary>
    public class ConsultaRepository : IConsultaRepository
    {
        /// <summary>
        /// Objeto do tipo contexto para as interações com o BD
        /// </summary>
        private SpMedGroupContext Ctx = new SpMedGroupContext();

        //método que atualizava automaticamente o status para "realizado" em consultas com data menor que a atual, mas deu conflito com o atualizar :(((
        //public consultarepository()
        //{
        //    foreach (consultum item in ctx.consulta.tolist())
        //    {
        //        if (item.idsituacao != 3 && item.datahorario < datetime.now)
        //        {
        //            consultum consultaatualizada = item;
        //            consultaatualizada.idsituacao = 2;
        //            ctx.consulta.update(consultaatualizada);
        //            ctx.savechanges();
        //        }
        //    }
        //}

        public void Agendar(Consultum NovaConsulta)
        {
            NovaConsulta.IdSituacao = 1;
            Ctx.Consulta.Add(NovaConsulta);
            Ctx.SaveChanges();
        }

        public void AlterarDescricao(int IdConsulta, string Descricao)
        {
            Consultum ConsultaAtualizada = BuscarPorId(IdConsulta);

            if (ConsultaAtualizada != null)
            {
                Consultum ConsultaBuscada = new()
                {
                    IdPaciente = ConsultaAtualizada.IdPaciente,
                    IdMedico = ConsultaAtualizada.IdMedico,
                    DataHorario = ConsultaAtualizada.DataHorario,
                    Descricao = ConsultaAtualizada.Descricao,
                    IdSituacao = ConsultaAtualizada.IdSituacao,
                    IdConsulta = IdConsulta
                };
                ConsultaBuscada.Descricao = Descricao;
                Ctx.Consulta.Update(ConsultaBuscada);
                Ctx.SaveChanges();
            };
        }

        public void Atualizar(Consultum ConsultaAtualizada, int IdConsultaAtualizada)
        {
            Consultum ConsultaBuscada = BuscarPorId(IdConsultaAtualizada);

            if (ConsultaBuscada != null)
            {
                ConsultaBuscada = new()
                {
                    IdPaciente = ConsultaAtualizada.IdPaciente,
                    IdMedico = ConsultaAtualizada.IdMedico,
                    DataHorario = ConsultaAtualizada.DataHorario,
                    Descricao = ConsultaAtualizada.Descricao,
                    IdSituacao = ConsultaAtualizada.IdSituacao,
                    IdConsulta = IdConsultaAtualizada
                };
                if (ConsultaBuscada.IdSituacao != 3 && ConsultaBuscada.DataHorario < DateTime.Now)
                {
                    ConsultaBuscada.IdSituacao = 2;
                }
                else if (ConsultaBuscada.IdSituacao != 3)
                {
                    ConsultaBuscada.IdSituacao = 1;
                }
                Ctx.Update(ConsultaBuscada);
                Ctx.SaveChanges();
            }
        }

        public Consultum BuscarPorId(int IdConsulta)
        {
            return Ctx.Consulta.Select(C => new Consultum()
            {
                IdConsulta = C.IdConsulta,
                IdSituacao = C.IdSituacao,
                IdPaciente = C.IdPaciente,
                IdMedico = C.IdMedico,
                DataHorario = C.DataHorario,
                Descricao = C.Descricao,
                IdMedicoNavigation = new Medico()
                {
                    IdUsuario = C.IdMedicoNavigation.IdUsuario,
                    IdClinica = C.IdMedicoNavigation.IdClinica,
                    IdEspecialidade = C.IdMedicoNavigation.IdEspecialidade,
                    IdEspecialidadeNavigation = new Especialidade()
                    {
                        Nome = C.IdMedicoNavigation.IdEspecialidadeNavigation.Nome
                    },
                    IdClinicaNavigation = new Clinica()
                    {
                        HorarioDeAbertura = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeAbertura,
                        HorarioDeFechamento = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeFechamento,
                        Endereco = C.IdMedicoNavigation.IdClinicaNavigation.Endereco,
                        RazaoSocial = C.IdMedicoNavigation.IdClinicaNavigation.RazaoSocial,
                        NomeFantasia = C.IdMedicoNavigation.IdClinicaNavigation.NomeFantasia,
                        Cnpj = C.IdMedicoNavigation.IdClinicaNavigation.Cnpj
                    },
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdMedicoNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdMedicoNavigation.IdUsuarioNavigation.DataDeNascimento
                    },
                    Crm = C.IdMedicoNavigation.Crm,
                },
                IdPacienteNavigation = new Paciente()
                {
                    IdUsuario = C.IdPacienteNavigation.IdUsuario,
                    Telefone = C.IdPacienteNavigation.Telefone,
                    Cpf = C.IdPacienteNavigation.Cpf,
                    Endereco = C.IdPacienteNavigation.Endereco,
                    Rg = C.IdPacienteNavigation.Rg,
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdPacienteNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdPacienteNavigation.IdUsuarioNavigation.DataDeNascimento
                    }
                }
            }).FirstOrDefault(C => C.IdConsulta == IdConsulta);
        }

        public void Cancelar(int IdConsultaCancelada)
        {
            Consultum ConsultaAtualizada = BuscarPorId(IdConsultaCancelada);

            if (ConsultaAtualizada != null)
            {
                Consultum ConsultaBuscada = new()
                {
                    IdPaciente = ConsultaAtualizada.IdPaciente,
                    IdMedico = ConsultaAtualizada.IdMedico,
                    DataHorario = ConsultaAtualizada.DataHorario,
                    Descricao = ConsultaAtualizada.Descricao,
                    IdSituacao = ConsultaAtualizada.IdSituacao,
                    IdConsulta = IdConsultaCancelada
                };
                ConsultaBuscada.IdSituacao = 3;
                Ctx.Consulta.Update(ConsultaBuscada);
                Ctx.SaveChanges();
            };
        }

        public void Deletar(int IdConsultaDeletada)
        {
            Consultum ConsultaDeletada = BuscarPorId(IdConsultaDeletada);

            if (ConsultaDeletada != null)
            {
                Consultum ConsultaBuscada = new()
                {
                    IdPaciente = ConsultaDeletada.IdPaciente,
                    IdMedico = ConsultaDeletada.IdMedico,
                    DataHorario = ConsultaDeletada.DataHorario,
                    Descricao = ConsultaDeletada.Descricao,
                    IdSituacao = ConsultaDeletada.IdSituacao,
                    IdConsulta = IdConsultaDeletada
                };
                ConsultaBuscada.IdSituacao = 3;
                Ctx.Consulta.Remove(ConsultaBuscada);
                Ctx.SaveChanges();
            };
        }

        public List<Consultum> ListarPorMedico(int IdUsuarioMedico)
        {
            return Ctx.Consulta.Select(C => new Consultum()
            {
                IdConsulta = C.IdConsulta,
                IdSituacao = C.IdSituacao,
                IdPaciente = C.IdPaciente,
                IdMedico = C.IdMedico,
                DataHorario = C.DataHorario,
                Descricao = C.Descricao,
                IdMedicoNavigation = new Medico()
                {
                    IdUsuario = C.IdMedicoNavigation.IdUsuario,
                    IdClinica = C.IdMedicoNavigation.IdClinica,
                    IdEspecialidade = C.IdMedicoNavigation.IdEspecialidade,
                    IdEspecialidadeNavigation = new Especialidade()
                    {
                        Nome = C.IdMedicoNavigation.IdEspecialidadeNavigation.Nome
                    },
                    IdClinicaNavigation = new Clinica()
                    {
                        HorarioDeAbertura = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeAbertura,
                        HorarioDeFechamento = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeFechamento,
                        Endereco = C.IdMedicoNavigation.IdClinicaNavigation.Endereco,
                        RazaoSocial = C.IdMedicoNavigation.IdClinicaNavigation.RazaoSocial,
                        NomeFantasia = C.IdMedicoNavigation.IdClinicaNavigation.NomeFantasia,
                        Cnpj = C.IdMedicoNavigation.IdClinicaNavigation.Cnpj
                    },
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdMedicoNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdMedicoNavigation.IdUsuarioNavigation.DataDeNascimento
                    },
                    Crm = C.IdMedicoNavigation.Crm,
                },
                IdPacienteNavigation = new Paciente()
                {
                    IdUsuario = C.IdPacienteNavigation.IdUsuario,
                    Telefone = C.IdPacienteNavigation.Telefone,
                    Cpf = C.IdPacienteNavigation.Cpf,
                    Endereco = C.IdPacienteNavigation.Endereco,
                    Rg = C.IdPacienteNavigation.Rg,
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdPacienteNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdPacienteNavigation.IdUsuarioNavigation.DataDeNascimento
                    }
                }
            }).Where(C => C.IdMedicoNavigation.IdUsuario == IdUsuarioMedico).ToList();
        }

        public List<Consultum> ListarPorPaciente(int IdUsuarioPaciente)
        {
            return Ctx.Consulta.Select(C => new Consultum()
            {
                IdConsulta = C.IdConsulta,
                IdSituacao = C.IdSituacao,
                IdPaciente = C.IdPaciente,
                IdMedico = C.IdMedico,
                DataHorario = C.DataHorario,
                Descricao = C.Descricao,
                IdMedicoNavigation = new Medico()
                {
                    IdUsuario = C.IdMedicoNavigation.IdUsuario,
                    IdClinica = C.IdMedicoNavigation.IdClinica,
                    IdEspecialidade = C.IdMedicoNavigation.IdEspecialidade,
                    IdEspecialidadeNavigation = new Especialidade()
                    {
                        Nome = C.IdMedicoNavigation.IdEspecialidadeNavigation.Nome
                    },
                    IdClinicaNavigation = new Clinica()
                    {
                        HorarioDeAbertura = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeAbertura,
                        HorarioDeFechamento = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeFechamento,
                        Endereco = C.IdMedicoNavigation.IdClinicaNavigation.Endereco,
                        RazaoSocial = C.IdMedicoNavigation.IdClinicaNavigation.RazaoSocial,
                        NomeFantasia = C.IdMedicoNavigation.IdClinicaNavigation.NomeFantasia,
                        Cnpj = C.IdMedicoNavigation.IdClinicaNavigation.Cnpj
                    },
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdMedicoNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdMedicoNavigation.IdUsuarioNavigation.DataDeNascimento
                    },
                    Crm = C.IdMedicoNavigation.Crm,
                },
                IdPacienteNavigation = new Paciente()
                {
                    IdUsuario = C.IdPacienteNavigation.IdUsuario,
                    Telefone = C.IdPacienteNavigation.Telefone,
                    Cpf = C.IdPacienteNavigation.Cpf,
                    Endereco = C.IdPacienteNavigation.Endereco,
                    Rg = C.IdPacienteNavigation.Rg,
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdPacienteNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdPacienteNavigation.IdUsuarioNavigation.DataDeNascimento
                    }
                }
            }).Where(C => C.IdPacienteNavigation.IdUsuario == IdUsuarioPaciente).ToList();
        }

        public List<Consultum> ListarTodas()
        {
            return Ctx.Consulta.Select(C => new Consultum() { 
                IdConsulta = C.IdConsulta,
                IdSituacao = C.IdSituacao,
                IdPaciente = C.IdPaciente,
                IdMedico = C.IdMedico,
                DataHorario = C.DataHorario,
                Descricao = C.Descricao,
                IdMedicoNavigation = new Medico()
                {
                    IdUsuario = C.IdMedicoNavigation.IdUsuario,
                    IdClinica = C.IdMedicoNavigation.IdClinica,
                    IdEspecialidade = C.IdMedicoNavigation.IdEspecialidade,
                    IdEspecialidadeNavigation = new Especialidade() { 
                        Nome = C.IdMedicoNavigation.IdEspecialidadeNavigation.Nome
                    },
                    IdClinicaNavigation = new Clinica()
                    {
                        HorarioDeAbertura = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeAbertura,
                        HorarioDeFechamento = C.IdMedicoNavigation.IdClinicaNavigation.HorarioDeFechamento,
                        Endereco = C.IdMedicoNavigation.IdClinicaNavigation.Endereco,
                        RazaoSocial = C.IdMedicoNavigation.IdClinicaNavigation.RazaoSocial,
                        NomeFantasia = C.IdMedicoNavigation.IdClinicaNavigation.NomeFantasia,
                        Cnpj = C.IdMedicoNavigation.IdClinicaNavigation.Cnpj
                    },
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdMedicoNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdMedicoNavigation.IdUsuarioNavigation.DataDeNascimento
                    },
                    Crm = C.IdMedicoNavigation.Crm,
                },
                IdPacienteNavigation = new Paciente(){
                    IdUsuario = C.IdPacienteNavigation.IdUsuario,
                    Telefone = C.IdPacienteNavigation.Telefone,
                    Cpf = C.IdPacienteNavigation.Cpf,
                    Endereco = C.IdPacienteNavigation.Endereco,
                    Rg = C.IdPacienteNavigation.Rg,
                    IdUsuarioNavigation = new Usuario()
                    {
                        Email = C.IdPacienteNavigation.IdUsuarioNavigation.Email,
                        Nome = C.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                        DataDeNascimento = C.IdPacienteNavigation.IdUsuarioNavigation.DataDeNascimento
                    }
                }
            }).ToList();
        }
    }
}
