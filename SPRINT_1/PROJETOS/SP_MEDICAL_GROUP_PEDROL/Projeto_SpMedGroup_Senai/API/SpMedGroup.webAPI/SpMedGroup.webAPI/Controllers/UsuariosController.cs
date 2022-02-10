using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.webAPI.Domains;
using SpMedGroup.webAPI.Interfaces;
using SpMedGroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository URepositorio { get; set; }

        public UsuariosController()
        {
            URepositorio = new UsuarioRepository();
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult Cadastrar(Usuario NovoUsuario)
        {
            try
            {
                if (NovoUsuario.DataDeNascimento > DateTime.Now)
                {
                    return BadRequest("O usuário deve ter uma data de nascimento menor ou igual a atual");
                }
                URepositorio.Cadastrar(NovoUsuario);
                return StatusCode(201);
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet]
        [Authorize(Roles = "1")]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(URepositorio.ListarTodos());
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet("{IdUsuario}")]
        [Authorize (Roles = "1,2,3")]
        public IActionResult BuscarPorId(int IdUsuario)
        {
            try
            {
                if (URepositorio.BuscarPorId(IdUsuario) != null)
                {
                    return Ok(URepositorio.BuscarPorId(IdUsuario));
                }
                else return NotFound("Id de usuário inexistente");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPut("{IdUsuarioAtualizado}")]
        [Authorize( Roles = "1")]
        public IActionResult Atualizar(int IdUsuarioAtualizado, Usuario UsuarioAtualizado)
        {
            try
            {
                if (UsuarioAtualizado.DataDeNascimento > DateTime.Now)
                {
                    return BadRequest("O usuário deve ter uma data de nascimento menor ou igual a atual");
                }
                if (URepositorio.BuscarPorId(IdUsuarioAtualizado) != null)
                {
                    URepositorio.Atualizar(UsuarioAtualizado, IdUsuarioAtualizado);
                    return NoContent();
                }
                else return NotFound("Id de usuário inexistente");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpDelete("{IdUsuarioDeletado}")]
        [Authorize( Roles = "1")]
        public IActionResult Deletar(int IdUsuarioDeletado)
        {
            try
            {
                if (URepositorio.BuscarPorId(IdUsuarioDeletado) != null)
                {
                    URepositorio.Deletar(IdUsuarioDeletado);
                    return NoContent();
                }
                else return NotFound("Id de usuário inexistente");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}
