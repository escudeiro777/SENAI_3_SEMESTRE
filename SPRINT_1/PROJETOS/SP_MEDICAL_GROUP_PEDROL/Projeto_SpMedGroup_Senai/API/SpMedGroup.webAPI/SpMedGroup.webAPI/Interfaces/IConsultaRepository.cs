using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de consulta
    /// </summary>
    interface IConsultaRepository
    {
        /// <summary>
        /// Método para a criação de uma nova consulta
        /// </summary>
        /// <param name="NovaConsulta">Nova consulta a ser agendada</param>
        void Agendar(Consultum NovaConsulta);

        /// <summary>
        /// Método para a listagem de todas as consultas
        /// </summary>
        /// <returns>Lista de consultas</returns>
        List<Consultum> ListarTodas();

        /// <summary>
        /// Método para a busca de uma consulta específica
        /// </summary>
        /// <param name="IdConsulta">Id da consulta buscada</param>
        /// <returns>Consulta encontrada</returns>
        Consultum BuscarPorId(int IdConsulta);

        /// <summary>
        /// Método para o update de uma consulta
        /// </summary>
        /// <param name="ConsultaAtualizada">Consulta atualizada</param>
        /// <param name="IdConsultaAtualizada">Id da consulta a ser atualizada</param>
        void Atualizar(Consultum ConsultaAtualizada, int IdConsultaAtualizada);

        /// <summary>
        /// Método para a remoção de uma consulta
        /// </summary>
        /// <param name="IdConsultaDeletada">Id da consulta a ser removida</param>
        void Deletar(int IdConsultaDeletada);

        /// <summary>
        /// Método para mudar o status de uma consulta para "Cancelada"
        /// </summary>
        /// <param name="IdConsultaCancelada">Id da consulta a ser cancelada</param>
        void Cancelar(int IdConsultaCancelada);

        /// <summary>
        /// Método para a listagem de todas as consultas associadas a um médico específico
        /// </summary>
        /// <param name="IdMedico">Id do médico atrelado as consultas</param>
        /// <returns>Lista das consultas encontradas</returns>
        List<Consultum> ListarPorMedico(int IdMedico);

        /// <summary>
        /// Método para a listagem de todas as consultas associadas a um paciente específico
        /// </summary>
        /// <param name="IdPaciente">Id do paciente atrelado as consultas</param>
        /// <returns>Lista das consultas encontradas</returns>
        List<Consultum> ListarPorPaciente(int IdPaciente);

        /// <summary>
        /// Método para alterar a descrição de uma consulta específica
        /// </summary>
        /// <param name="IdConsulta">Id da consulta a ter sua descrição alterada</param>
        /// <param name="Descricao">Nova descrição</param>
        void AlterarDescricao(int IdConsulta ,string Descricao);
    }
}