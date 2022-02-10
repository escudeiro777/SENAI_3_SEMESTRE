using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedGroup.webAPI.ViewModels
{
    public class DescricaoViewModel
    {
        [Required(ErrorMessage = "Descrição necessária")]
        public string Descricao { get; set; }
    }
}
