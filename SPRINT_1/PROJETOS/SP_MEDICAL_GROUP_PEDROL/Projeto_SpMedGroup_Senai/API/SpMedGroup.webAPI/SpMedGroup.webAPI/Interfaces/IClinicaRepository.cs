using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de clinica
    /// </summary>
    interface IClinicaRepository
    {
        /// <summary>
        /// Método para a criação de uma clínica 
        /// </summary>
        /// <param name="NovaClinica">Nova clínica a ser criada</param>
        void Cadastrar(Clinica NovaClinica);

        /// <summary>
        /// Método para a listagem de todas as clínicas
        /// </summary>
        /// <returns>Lista de clínicas</returns>
        List<Clinica> ListarTodas();

        /// <summary>
        /// Método para buscar uma clínica específica
        /// </summary>
        /// <param name="IdClinica">Id da clínica buscada</param>
        /// <returns>Clínica encontrada</returns>
        Clinica BuscarPorId(int IdClinica);

        /// <summary>
        /// Método para atualizar uma clínica
        /// </summary>
        /// <param name="ClinicaAtualizada">Clínica atualizada</param>
        /// <param name="IdClinicaAtualizada">Id da clínica a ser atualizada</param>
        void Atualizar(Clinica ClinicaAtualizada, int IdClinicaAtualizada);

        /// <summary>
        /// Método para remover uma clínica
        /// </summary>
        /// <param name="IdClinicaDeletada">Id da clínica a ser removida</param>
        void Deletar(int IdClinicaDeletada);
    }
}
