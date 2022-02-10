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
    public class SituacoesController : ControllerBase
    {
        private ISituacaoRepository SRepositorio { get; set; }

        public SituacoesController()
        {
            SRepositorio = new SituacaoRepository();
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult Cadastrar(Situacao NovaSituacao)
        {
            try
            {
                SRepositorio.Cadastrar(NovaSituacao);
                return StatusCode(201);
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet]
        [Authorize(Roles = "1,2,3")]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(SRepositorio.ListarTodas());
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet("{IdSituacao}")]
        [Authorize(Roles = "1")]
        public IActionResult BuscarPorId(int IdSituacao)
        {
            try
            {
                Situacao SituacaoBuscada = SRepositorio.BuscarPorId(IdSituacao);
                if (SituacaoBuscada != null)
                {
                    return Ok(SituacaoBuscada);
                }
                else return NotFound("Id de situacao inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpDelete("{IdSituacaoDeletada}")]
        [Authorize(Roles = "1")]
        public IActionResult Deletar(int IdSituacaoDeletada)
        {
            try
            {
                if (SRepositorio.BuscarPorId(IdSituacaoDeletada) != null)
                {
                    SRepositorio.Deletar(IdSituacaoDeletada);
                    return NoContent();
                }
                else return NotFound("Id de situacao inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPut("{IdSituacaoAtualizada}")]
        [Authorize(Roles = "1")]
        public IActionResult Atualizar(int IdSituacaoAtualizada, Situacao SituacaoAtualizada)
        {
            try
            {
                if (SRepositorio.BuscarPorId(IdSituacaoAtualizada) != null)
                {
                    SRepositorio.Atualizar(SituacaoAtualizada, IdSituacaoAtualizada);
                    return NoContent();
                }
                else return NotFound("Id de situação inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}
