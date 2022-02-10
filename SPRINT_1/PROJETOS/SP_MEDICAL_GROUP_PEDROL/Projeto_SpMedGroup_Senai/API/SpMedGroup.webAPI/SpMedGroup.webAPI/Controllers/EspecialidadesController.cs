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
    public class EspecialidadesController : ControllerBase
    {
        private IEspecialidadeRepository ERepositorio { get; set; }

        public EspecialidadesController()
        {
            ERepositorio = new EspecialidadeRepository();
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult Cadastrar(Especialidade NovaEspecialidade)
        {
            try
            {
                ERepositorio.Cadastrar(NovaEspecialidade);
                return StatusCode(201);
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(ERepositorio.ListarTodas());
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet("{IdEspecialidade}")]
        public IActionResult BuscarPorId(int IdEspecialidade)
        {
            try
            {
                if (ERepositorio.BuscarPorId(IdEspecialidade) != null)
                {
                    return Ok(ERepositorio.BuscarPorId(IdEspecialidade));
                }
                else return NotFound("Id de especialidade inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpDelete("{IdEspecialidadeDeletada}")]
        [Authorize(Roles = "1")]
        public IActionResult Deletar(int IdEspecialidadeDeletada)
        {
            try
            {
                if (ERepositorio.BuscarPorId(IdEspecialidadeDeletada) != null)
                {
                    ERepositorio.Deletar(IdEspecialidadeDeletada);
                    return NoContent();
                }
                else return NotFound("Id de especialidade inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPut("{IdEspecialidadeAtualizada}")]
        [Authorize(Roles = "1")]
        public IActionResult Atualizar(int IdEspecialidadeAtualizada, Especialidade EspecialidadeAtualizada)
        {
            try
            {
                if (ERepositorio.BuscarPorId(IdEspecialidadeAtualizada) != null)
                {
                    ERepositorio.Atualizar(EspecialidadeAtualizada, IdEspecialidadeAtualizada);
                    return NoContent();
                }
                else return NotFound("Id de especialidade inválido");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}
