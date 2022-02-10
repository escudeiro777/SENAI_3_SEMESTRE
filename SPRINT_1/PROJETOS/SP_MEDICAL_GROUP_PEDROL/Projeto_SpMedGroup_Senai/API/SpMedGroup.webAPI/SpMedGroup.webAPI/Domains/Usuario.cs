using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SpMedGroup.webAPI.Domains
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        [Required(ErrorMessage = "Email necessário")]
        public string Email { get; set; }
        [StringLength(16, MinimumLength = 8, ErrorMessage = "Tamanho da senha deve ser maior que 8 caractéres e não deve exceder 16")]
        [Required(ErrorMessage = "Senha necessária")]
        public string Senha { get; set; }
        [Required(ErrorMessage = "Id do tipo de usuário necessário")]
        public byte IdTipoUsuario { get; set; }
        public DateTime? DataDeNascimento { get; set; }
        [Required(ErrorMessage = "Nome necessário")]
        public string Nome { get; set; }
        public string ImagemPerfil { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual Medico Medico { get; set; }
        public virtual Paciente Paciente { get; set; }
    }
}
