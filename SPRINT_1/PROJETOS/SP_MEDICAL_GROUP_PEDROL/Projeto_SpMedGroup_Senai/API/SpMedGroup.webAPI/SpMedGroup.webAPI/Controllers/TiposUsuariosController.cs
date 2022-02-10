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
    public class TiposUsuariosController : ControllerBase
    {
        private ITipoUsuarioRepository TpURepositorio { get; set; }

        public TiposUsuariosController()
        {
            TpURepositorio = new TipoUsuarioRepository();
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult Cadastrar(TipoUsuario NovoTipoUsuario)
        {
            try
            {
                TpURepositorio.Cadastrar(NovoTipoUsuario);
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
                return Ok(TpURepositorio.ListarTodas());
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet("{IdTipoUsuario}")]
        [Authorize(Roles = "1")]
        public IActionResult BuscarPorId(int IdTipoUsuario)
        {
            try
            {
                if (TpURepositorio.BuscarPorId(IdTipoUsuario) != null)
                {
                    return Ok(TpURepositorio.BuscarPorId(IdTipoUsuario));
                }
                else return NotFound("Id de tipo de usuário inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpDelete("{IdTipoUsuarioDeletado}")]
        [Authorize(Roles = "1")]
        public IActionResult Deletar(int IdTipoUsuarioDeletado)
        {
            try
            {
                if (TpURepositorio.BuscarPorId(IdTipoUsuarioDeletado) != null)
                {
                    TpURepositorio.Deletar(IdTipoUsuarioDeletado);
                    return NoContent();
                }
                else return NotFound("Id de tipo de usuário inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPut("{IdTipoUsuarioAtualizado}")]
        [Authorize(Roles = "1")]
        public IActionResult Atualizar(int IdTipoUsuarioAtualizado, TipoUsuario TipoUsuarioAtualizado)
        {
            try
            {
                if (TpURepositorio.BuscarPorId(IdTipoUsuarioAtualizado) != null)
                {
                    TpURepositorio.Atualizar(TipoUsuarioAtualizado, IdTipoUsuarioAtualizado);
                    return NoContent();
                }
                else return NotFound("Id de tipo de usuário inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}
