using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de medico
    /// </summary>
    interface IMedicoRepository
    {
        /// <summary>
        /// Metodo para o cadastro um novo médico
        /// </summary>
        /// <param name="NovoMedico">Novo médico a ser cadastrado</param>
        void Cadastrar(Medico NovoMedico);

        /// <summary>
        /// Método para a leitura de todos os médicos
        /// </summary>
        /// <returns>Lista de médicos</returns>
        List<Medico> ListarTodos();

        /// <summary>
        /// Método para a busca de um médico específico
        /// </summary>
        /// <param name="IdMedico">Id do médico buscado</param>
        /// <returns>Médico encontrado</returns>
        Medico BuscarPorId(int IdMedico);

        /// <summary>
        /// Método para o update de um médico
        /// </summary>
        /// <param name="MedicoAtualizado">Médico atualizado</param>
        /// <param name="IdMedicoAtualizado">Id do médico a ser atualizado</param>
        void Atualizar(Medico MedicoAtualizado, int IdMedicoAtualizado);

        /// <summary>
        /// Método para a remoção de um médico
        /// </summary>
        /// <param name="IdMedicoDeletado">Id do médico a ser removido</param>
        void Deletar(int IdMedicoDeletado);
    }
}
