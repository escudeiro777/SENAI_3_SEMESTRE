using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de paciente
    /// </summary>
    interface IPacienteRepository
    {
        /// <summary>
        /// Método para a criação de um novo paciente
        /// </summary>
        /// <param name="NovoPaciente">Novo paciente a ser criado</param>
        void Cadastrar(Paciente NovoPaciente);

        /// <summary>
        /// Método para a leitura de todos os pacientes
        /// </summary>
        /// <returns>Lista de pacientes</returns>
        List<Paciente> ListarTodos();

        /// <summary>
        /// Método para a leitura de um paciente específico
        /// </summary>
        /// <param name="IdPaciente">Id do paciente buscado</param>
        /// <returns>Paciente encontrado</returns>
        Paciente BuscarPorId(int IdPaciente);

        /// <summary>
        /// Método para o update de um paciente
        /// </summary>
        /// <param name="PacienteAtualizado">Paciente atualizado</param>
        /// <param name="IdPacienteAtualizado">Id do paciente a ser atualizado</param>
        void Atualizar(Paciente PacienteAtualizado, int IdPacienteAtualizado);

        /// <summary>
        /// Método para a remoção de um paciente
        /// </summary>
        /// <param name="IdPacienteDeletado">Id do paciente a ser removido</param>
        void Deletar(int IdPacienteDeletado);
    }
}
