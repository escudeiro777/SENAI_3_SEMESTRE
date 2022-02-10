using Microsoft.AspNetCore.Http;
using SpMedGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Interfaces
{
    /// <summary>
    /// Interface para a definição dos métodos da entidade de usuario
    /// </summary>
    interface IUsuarioRepository
    {
        /// <summary>
        /// Método para o cadastro de um novo usuário
        /// </summary>
        /// <param name="NovoUsuario">Novo usuário recebido</param>
        void Cadastrar(Usuario NovoUsuario);

        /// <summary>
        /// Método para a leitura de todos os usuários
        /// </summary>
        /// <returns>Uma lista com todos os usuários</returns>
        List<Usuario> ListarTodos();

        /// <summary>
        /// Método para a leitura de um usuário específico
        /// </summary>
        /// <param name="IdUsuario">Id do usuário buscado</param>
        /// <returns>Usuário encontrado</returns>
        Usuario BuscarPorId(int IdUsuario);

        /// <summary>
        /// Método para o update de um usuário 
        /// </summary>
        /// <param name="UsuarioAtualizado">Usuário atualizado</param>
        /// <param name="IdUsuarioAtualizado">Id do usuário a ser atualizado</param>
        void Atualizar(Usuario UsuarioAtualizado, int IdUsuarioAtualizado);

        /// <summary>
        /// Método para a remoção de um usuário
        /// </summary>
        /// <param name="IdUsuarioDeletado">Id do usuário a ser removido</param>
        void Deletar(int IdUsuarioDeletado);

        /// <summary>
        /// Método para o login(leitura por email e senha) de um usuário
        /// </summary>
        /// <param name="Email">Email do usuário buscado</param>
        /// <param name="Senha">Senha do usuário buscado</param>
        /// <returns>Usuário encontrado</returns>
        Usuario Logar(string Email, string Senha);

        /// <summary>
        /// Método para salvar a imagem de perfil de um usuário 
        /// </summary>
        /// <param name="Img">Imagem de perfil no formato de arquivo</param>
        /// <param name="IdUsuario">Id do usuário relativo a imagem</param>
        public void SalvarImgPerfil(IFormFile Img, int IdUsuario, string MimeType);

        /// <summary>
        /// Método para acessar a imagem de perfil de um usuário
        /// </summary>
        /// <param name="IdUsuario">Id do usuário relativo a imagem</param>
        /// <returns>Imagem em string de base 64</returns>
        public string RetornarImgPerfil(int IdUsuario);
    }
}
