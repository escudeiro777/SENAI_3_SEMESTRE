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
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizacoesController : ControllerBase
    {
        private ILocalizacaoRepository LRepositorio { get; set; }

        public LocalizacoesController()
        {
            LRepositorio = new LocalizacaoRepository();
        }

        [HttpPost]
        [Authorize(Roles = "1,2,3")]
        public IActionResult Cadastrar(Localizacao NovaLocalizacao)
        {
            try
            {
                LRepositorio.Cadastar(NovaLocalizacao);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(LRepositorio.Listar());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
