using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de situacao
    /// </summary>
    interface ISituacaoRepository
    {
        /// <summary>
        /// Método para o cadastro de uma nova situação de consulta
        /// </summary>
        /// <param name="NovaSituacao">Nova situação a ser cadastrada</param>
        void Cadastrar(Situacao NovaSituacao);

        /// <summary>
        /// Método para a leitura de todas as situações de consulta
        /// </summary>
        /// <returns>Lista de situações de consulta</returns>
        List<Situacao> ListarTodas();

        /// <summary>
        /// Método para a busca de uma situação de consulta específica
        /// </summary>
        /// <param name="IdSituacao">Id da situação de consulta buscada</param>
        /// <returns>Situação de consulta encontrada</returns>
        Situacao BuscarPorId(int IdSituacao);

        /// <summary>
        /// Método para o update de uma situação de consulta
        /// </summary>
        /// <param name="SituacaoAtualizada">Situação de consulta atualizada</param>
        /// <param name="IdSituacaoAtualizada">Id da situação de consulta a ser atualizada</param>
        void Atualizar(Situacao SituacaoAtualizada, int IdSituacaoAtualizada);

        /// <summary>
        /// Método para a remoção de uma situação de consulta
        /// </summary>
        /// <param name="IdSituacaoDeletada">Id da situação de consulta a ser removida</param>
        void Deletar(int IdSituacaoDeletada);
    }
}
