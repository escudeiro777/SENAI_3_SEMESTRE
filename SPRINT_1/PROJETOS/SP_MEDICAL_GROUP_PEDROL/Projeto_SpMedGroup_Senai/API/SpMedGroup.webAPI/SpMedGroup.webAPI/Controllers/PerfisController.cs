using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedGroup.webAPI.Interfaces;
using SpMedGroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PerfisController : ControllerBase
    {
        private IUsuarioRepository URepositorio { get; set; }

        public PerfisController()
        {
            URepositorio = new UsuarioRepository();
        }

        [HttpGet]
        [Authorize(Roles = "1,2,3")]
        public IActionResult AcessarImgPerfil()
        {
            try
            {
                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                if (URepositorio.RetornarImgPerfil(IdUsuario) != null)
                {
                    return Ok(URepositorio.RetornarImgPerfil(IdUsuario));
                }
                else return NotFound("Imagem de perfil inexistente para esse usuário");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }

        [HttpPost]
        [Authorize(Roles = "1,2,3")]
        public IActionResult AdicionarImgPerfil(IFormFile Img)
        {
            try
            {
                if (Img.Length > 10000000000000)
                {
                    return BadRequest("Tamanho da imagem não deve exceder 10MB");
                }
                else
                {
                    int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                    string MimeType = Img.FileName.Split(".").Last();
                    if (MimeType == "png" || MimeType == "jpeg" || MimeType == "jpg")
                    {
                        URepositorio.SalvarImgPerfil(Img, IdUsuario, MimeType);
                        return Ok();
                    }
                    else return BadRequest("Imagens devem ser dos tipos 'png', 'jpeg' ou 'jpg'");
                }
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}