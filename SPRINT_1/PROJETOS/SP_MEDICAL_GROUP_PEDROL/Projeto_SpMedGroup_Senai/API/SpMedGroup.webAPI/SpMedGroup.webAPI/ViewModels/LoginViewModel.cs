using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email necessário")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Senha necessária")]
        public string Senha { get; set; }
    }
}
