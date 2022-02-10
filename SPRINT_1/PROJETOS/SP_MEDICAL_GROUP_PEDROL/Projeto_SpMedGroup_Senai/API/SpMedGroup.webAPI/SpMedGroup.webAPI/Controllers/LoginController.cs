using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository URepositorio { get; set; }

        public LoginController()
        {
            URepositorio = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Logar(LoginViewModel Login)
        {
            try
            {
                Usuario UsuarioLogin = URepositorio.Logar(Login.Email, Login.Senha);
                if (UsuarioLogin != null)
                {
                    var Claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Email, UsuarioLogin.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, UsuarioLogin.IdUsuario.ToString()),
                        new Claim(ClaimTypes.Role, UsuarioLogin.IdTipoUsuario.ToString()),
                        new Claim("Role", UsuarioLogin.IdTipoUsuario.ToString())
                    };
                    var Chave = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("SpMedGroupSeguro"));

                    var Credenciais = new SigningCredentials(Chave, SecurityAlgorithms.HmacSha256);

                    var Token = new JwtSecurityToken(
                            issuer: "SpMedGroup.webAPI",
                            audience: "SpMedGroup.webAPI",
                            claims: Claims,
                            expires: DateTime.Now.AddMinutes(30),
                            signingCredentials: Credenciais
                        );

                    return Ok(new
                    {
                        TokenRetorno = new JwtSecurityTokenHandler().WriteToken(Token)
                    });
                }
                else return NotFound("Email e/ou senha incorretos");
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro);
                throw;
            }
        }
    }
}
