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
    /// Repositório para a definição da usabilidade dos métodos da entidade de TipoUsuario
    /// </summary>
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        /// <summary>
        /// Objeto do tipo contexto para as interações com o BD
        /// </summary>
        private SpMedGroupContext Ctx = new SpMedGroupContext();

        public void Atualizar(TipoUsuario TipoUsuarioAtualizado, int IdTipoUsuarioAtualizado)
        {
            TipoUsuario TipoUsuarioBuscado = BuscarPorId(IdTipoUsuarioAtualizado);

            if (TipoUsuarioBuscado != null)
            {
                TipoUsuarioBuscado = new()
                {
                    TituloTipoUsuario = TipoUsuarioAtualizado.TituloTipoUsuario,
                    IdTipoUsuario = Convert.ToByte(IdTipoUsuarioAtualizado)
                };
                Ctx.Update(TipoUsuarioBuscado);
                Ctx.SaveChanges();
            }
        }

        public TipoUsuario BuscarPorId(int IdTipoUsuario)
        {
            return Ctx.TipoUsuarios.Select(TpU => new TipoUsuario()
            {
                IdTipoUsuario = TpU.IdTipoUsuario,
                TituloTipoUsuario = TpU.TituloTipoUsuario,
                Usuarios = TpU.Usuarios.Select(U => new Usuario()
                {
                    Email = U.Email,
                    Nome = U.Nome,
                    DataDeNascimento = U.DataDeNascimento
                }).ToList()
            }
            ).FirstOrDefault(TpU => TpU.IdTipoUsuario == IdTipoUsuario);
        }

        public void Cadastrar(TipoUsuario NovoTipoUsuario)
        {
            Ctx.TipoUsuarios.Add(NovoTipoUsuario);
            Ctx.SaveChanges();
        }

        public void Deletar(int IdTipoUsuarioDeletado)
        {
            TipoUsuario TipoUsuarioBuscado = BuscarPorId(IdTipoUsuarioDeletado);

            if (TipoUsuarioBuscado != null)
            {
                TipoUsuario TipoUsuarioDeletado = new()
                {
                    TituloTipoUsuario = TipoUsuarioBuscado.TituloTipoUsuario,
                    IdTipoUsuario = Convert.ToByte(IdTipoUsuarioDeletado)
                };
                Ctx.Remove(TipoUsuarioBuscado);
                Ctx.SaveChanges();
            }
        }

        public List<TipoUsuario> ListarTodas()
        {
            return Ctx.TipoUsuarios.Select(TpU => new TipoUsuario()
            {
                IdTipoUsuario = TpU.IdTipoUsuario,
                TituloTipoUsuario = TpU.TituloTipoUsuario,
                Usuarios = TpU.Usuarios.Select(U => new Usuario()
                {
                    Email = U.Email,
                    Nome = U.Nome,
                    DataDeNascimento = U.DataDeNascimento
                }).ToList()
            }
            ).ToList();
        }
    }
}
