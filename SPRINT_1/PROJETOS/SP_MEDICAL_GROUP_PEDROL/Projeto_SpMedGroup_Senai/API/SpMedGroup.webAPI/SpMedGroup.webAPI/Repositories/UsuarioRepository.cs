using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SpMedGroup.webAPI.Contexts;
using SpMedGroup.webAPI.Domains;
using SpMedGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Repositories
{
    /// <summary>
    /// Repositório para a definição da usabilidade dos métodos da entidade de Usuario
    /// </summary>
    public class UsuarioRepository : IUsuarioRepository
    {
        /// <summary>
        /// Objeto do tipo contexto para as interações com o BD
        /// </summary>
        private SpMedGroupContext Ctx = new SpMedGroupContext();

        public void Atualizar(Usuario UsuarioAtualizado, int IdUsuarioAtualizado)
        {
            Usuario UsuarioBuscado = BuscarPorId(IdUsuarioAtualizado);

            if (UsuarioBuscado != null)
            {
                UsuarioBuscado.Nome = UsuarioAtualizado.Nome;
                UsuarioBuscado.Email = UsuarioAtualizado.Email;
                UsuarioBuscado.Senha = UsuarioAtualizado.Senha;
                UsuarioBuscado.DataDeNascimento = UsuarioAtualizado.DataDeNascimento;
                UsuarioBuscado.IdTipoUsuario = UsuarioAtualizado.IdTipoUsuario;
                UsuarioBuscado.IdUsuario = IdUsuarioAtualizado;

                Ctx.Usuarios.Update(UsuarioBuscado);
                Ctx.SaveChanges();
            }
        }

        public Usuario BuscarPorId(int IdUsuario)
        {
            return Ctx.Usuarios.Select(U => new Usuario()
            {
                IdUsuario = U.IdUsuario,
                Nome = U.Nome,
                Email = U.Email,
                IdTipoUsuario = U.IdTipoUsuario,
                DataDeNascimento = U.DataDeNascimento,
                Medico = U.Medico,
                Paciente = U.Paciente,
                ImagemPerfil = U.ImagemPerfil
            }).FirstOrDefault(U => U.IdUsuario == IdUsuario);
        }

        public void Cadastrar(Usuario NovoUsuario)
        {
            Ctx.Usuarios.Add(NovoUsuario);
            Ctx.SaveChanges();
        }

        public void Deletar(int IdUsuarioDeletado)
        {
            Ctx.Remove(BuscarPorId(IdUsuarioDeletado));
            Ctx.SaveChanges();
        }

        public List<Usuario> ListarTodos()
        {
            return Ctx.Usuarios.Select(U => new Usuario() { 
                IdUsuario = U.IdUsuario,
                Nome = U.Nome,
                Email = U.Email,
                IdTipoUsuario = U.IdTipoUsuario,
                DataDeNascimento = U.DataDeNascimento,
                Medico = U.Medico,
                Paciente = U.Paciente,
                ImagemPerfil = U.ImagemPerfil
            }).ToList();
        }

        public Usuario Logar(string Email, string Senha)
        {
            return Ctx.Usuarios.FirstOrDefault(U => U.Email == Email && U.Senha == Senha);
        }

        public string RetornarImgPerfil(int IdUsuario)
        {
            string NomeArquivo = Ctx.Usuarios.FirstOrDefault(U => U.IdUsuario == IdUsuario).ImagemPerfil;
            string Caminho = Path.Combine("PerfilImgs", NomeArquivo);
            if (File.Exists(Caminho))
            {
                Byte[] BytesImg = File.ReadAllBytes(Caminho);
                return Convert.ToBase64String(BytesImg);
            }
            else return null;
        }

        public void SalvarImgPerfil(IFormFile Img, int IdUsuario, string MimeType)
        {
            string NomeArquivo = $"{IdUsuario}.{MimeType}";

            using (var Stream = new FileStream(Path.Combine("PerfilImgs", NomeArquivo), FileMode.Create))
            {
                Img.CopyTo(Stream);
            }

            Usuario UsuarioNovaFoto = Ctx.Usuarios.FirstOrDefault(U => U.IdUsuario == IdUsuario);
            UsuarioNovaFoto.ImagemPerfil = NomeArquivo;

            Ctx.Usuarios.Update(UsuarioNovaFoto);
            Ctx.SaveChanges();
        }
    }
}