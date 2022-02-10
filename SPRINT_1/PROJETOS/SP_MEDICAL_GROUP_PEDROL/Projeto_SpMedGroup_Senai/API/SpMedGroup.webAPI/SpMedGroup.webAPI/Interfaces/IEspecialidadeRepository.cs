using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de especialidade
    /// </summary>
    interface IEspecialidadeRepository
    {
        /// <summary>
        /// Método para o cadastro de uma nova especialidade
        /// </summary>
        /// <param name="NovaEspecialidade">Especialidade a ser cadastrada</param>
        void Cadastrar(Especialidade NovaEspecialidade);

        /// <summary>
        /// Método para a a leitura de todas as especialidades 
        /// </summary>
        /// <returns>Lista de especialidades</returns>
        List<Especialidade> ListarTodas();

        /// <summary>
        /// Método para a busca de uma especialidade específica
        /// </summary>
        /// <param name="IdEspecialidade">Id da especialidade buscada</param>
        /// <returns>Especialidade encontrada</returns>
        Especialidade BuscarPorId(int IdEspecialidade);

        /// <summary>
        /// Método para o update de uma especialidade
        /// </summary>
        /// <param name="EspecialidadeAtualizada">Especialidade atualizada</param>
        /// <param name="IdEspecialidadeAtualizada">Id da especialidade a ser atualizada</param>
        void Atualizar(Especialidade EspecialidadeAtualizada, int IdEspecialidadeAtualizada);

        /// <summary>
        /// Método para a remoção de uma especialidade
        /// </summary>
        /// <param name="IdEspecialidadeDeletada">Especialidade a ser removida</param>
        void Deletar(int IdEspecialidadeDeletada);
    }
}