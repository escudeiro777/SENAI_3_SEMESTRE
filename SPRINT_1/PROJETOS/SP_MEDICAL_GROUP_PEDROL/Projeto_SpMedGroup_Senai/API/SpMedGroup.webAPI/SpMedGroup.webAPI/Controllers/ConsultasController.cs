using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.webAPI.Domains;
using SpMedGroup.webAPI.Interfaces;
using SpMedGroup.webAPI.Repositories;
using SpMedGroup.webAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository CRepositorio { get; set; }

        public ConsultasController()
        {
            CRepositorio = new ConsultaRepository();
        }

        [HttpPatch("Cancelar/{IdConsultaCancelada}")]
        [Authorize(Roles = "1")]
        public IActionResult CancelarConsulta(int IdConsultaCancelada)
        {
            try
            {
                if (CRepositorio.BuscarPorId(IdConsultaCancelada) != null)
                {
                    CRepositorio.Cancelar(IdConsultaCancelada);
                    return NoContent();
                }
                else return NotFound("Id de consulta inválido!");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult AgendarConsulta(Consultum NovaConsulta)
        {
            try
            {
                if (NovaConsulta.DataHorario <= DateTime.Now)
                {
                    return BadRequest("As consultas devem ser agendadas para horários futuros");
                }
                else
                {
                    CRepositorio.Agendar(NovaConsulta);
                    return StatusCode(201);
                }
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPatch("AlterarDescricao/{IdConsulta}")]
        [Authorize(Roles = "2")]
        public IActionResult AlterarDescricao(DescricaoViewModel NovaDescricao, int IdConsulta)
        {
            try
            {
                CRepositorio.AlterarDescricao(IdConsulta, NovaDescricao.Descricao);
                return NoContent();
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet]
        [Authorize( Roles = "1")]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(CRepositorio.ListarTodas());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("ListarMinhas")]
        [Authorize( Roles = "2,3")]
        public IActionResult ListarMinhas()
        {
            try
            {
                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                if (HttpContext.User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.Role).Value == "2")
                {
                   return Ok(CRepositorio.ListarPorMedico(IdUsuario));
                }
                else
                {
                    return Ok(CRepositorio.ListarPorPaciente(IdUsuario));
                }
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet("{IdConsulta}")]
        [Authorize( Roles = "1")]
        public IActionResult BuscarPorId(int IdConsulta)
        {
            try
            {
                if (CRepositorio.BuscarPorId(IdConsulta) != null)
                {
                    return Ok(CRepositorio.BuscarPorId(IdConsulta));
                }
                else return NotFound("Id de consulta não encontrado");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPut("{IdConsultaAtualizada}")]
        [Authorize( Roles = "1")]
        public IActionResult Atualizar(int IdConsultaAtualizada, Consultum ConsultaAtualizada)
        {
            try
            {
                if (ConsultaAtualizada.DataHorario <= DateTime.Now)
                {
                    return BadRequest("As consultas devem ser agendadas para horários futuros");
                }
                else
                {
                    if (CRepositorio.BuscarPorId(IdConsultaAtualizada) != null)
                    {
                        CRepositorio.Atualizar(ConsultaAtualizada, IdConsultaAtualizada);
                        return NoContent();
                    }
                    else return NotFound("Id de consulta inexistente");
                }
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpDelete("{IdConsultaDeletada}")]
        [Authorize( Roles = "1")]
        public IActionResult Deletar(int IdConsultaDeletada)
        {
            try
            {
                if (CRepositorio.BuscarPorId(IdConsultaDeletada) != null)
                {
                    CRepositorio.Deletar(IdConsultaDeletada);
                    return NoContent();
                }
                else return NotFound("Id de consulta não existente");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}
