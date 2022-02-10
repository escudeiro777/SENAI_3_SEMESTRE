using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de tipo usuario
    /// </summary>
    interface ITipoUsuarioRepository
    {
        /// <summary>
        /// Método para a criação de um novo tipo de usuário
        /// </summary>
        /// <param name="NovoTipoUsuario">Novo tipo de usuário a ser cadastrado</param>
        void Cadastrar(TipoUsuario NovoTipoUsuario);

        /// <summary>
        /// Método para a listagem de todos os tipos de usuário
        /// </summary>
        /// <returns>Lista dos tipos de usuário</returns>
        List<TipoUsuario> ListarTodas();

        /// <summary>
        /// Método para a busca de um tipo de usuário específico
        /// </summary>
        /// <param name="IdTipoUsuario">Id do tipo de usuário buscado</param>
        /// <returns>Tipo de usuário encontrado</returns>
        TipoUsuario BuscarPorId(int IdTipoUsuario);

        /// <summary>
        /// Método para o update de um tipo de usuário
        /// </summary>
        /// <param name="TipoUsuarioAtualizado">Tipo de usuário atualizado</param>
        /// <param name="IdTipoUsuarioAtualizado">Id do tipo de usuário a ser atualizado</param>
        void Atualizar(TipoUsuario TipoUsuarioAtualizado, int IdTipoUsuarioAtualizado);

        /// <summary>
        /// Método para a remoção de um tipo de usuário
        /// </summary>
        /// <param name="IdTipoUsuarioDeletado">Id do tipo de usuário a ser removido</param>
        void Deletar(int IdTipoUsuarioDeletado);
    }
}
