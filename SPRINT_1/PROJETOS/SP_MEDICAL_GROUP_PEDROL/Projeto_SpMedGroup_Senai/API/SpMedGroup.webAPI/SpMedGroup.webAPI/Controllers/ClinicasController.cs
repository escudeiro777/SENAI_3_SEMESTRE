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
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository CRepositorio { get; set; }

        public ClinicasController()
        {
            CRepositorio = new ClinicaRepository();
        }

        [HttpPost]
        [Authorize( Roles = "1")]
        public IActionResult Cadastrar(Clinica NovaClinica)
        {
            try
            {
                CRepositorio.Cadastrar(NovaClinica);
                return StatusCode(201);
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpGet("{IdClinica}")]
        public IActionResult BuscarPorId(int IdClinica)
        {
            try
            {
                if (CRepositorio.BuscarPorId(IdClinica) != null)
                {
                    return Ok(CRepositorio.BuscarPorId(IdClinica));
                }
                else return NotFound("Id de clínica inexistente");
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
                return Ok(CRepositorio.ListarTodas());
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPut("{IdClinicaAtualizada}")]
        [Authorize( Roles = "1")]
        public IActionResult Atualizar(Clinica ClinicaAtualizada, int IdClinicaAtualizada)
        {
            try
            {
                if (CRepositorio.BuscarPorId(IdClinicaAtualizada) != null)
                {
                    CRepositorio.Atualizar(ClinicaAtualizada, IdClinicaAtualizada);
                    return NoContent();
                }
                else return NotFound("Id de clínica inexistente");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpDelete("{IdClinicaDeletada}")]
        [Authorize( Roles = "1")]
        public IActionResult Deletar(int IdClinicaDeletada)
        {
            try
            {
                if (CRepositorio.BuscarPorId(IdClinicaDeletada) != null)
                {
                    CRepositorio.Deletar(IdClinicaDeletada);
                    return NoContent();
                }
                else return BadRequest("Id de clínica inexistente");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}