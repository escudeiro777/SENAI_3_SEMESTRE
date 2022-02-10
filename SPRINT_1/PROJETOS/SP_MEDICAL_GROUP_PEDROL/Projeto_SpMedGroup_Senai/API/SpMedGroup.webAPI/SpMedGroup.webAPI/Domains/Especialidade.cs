using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SpMedGroup.webAPI.Domains
{
    public partial class Especialidade
    {
        public Especialidade()
        {
            Medicos = new HashSet<Medico>();
        }

        public byte IdEspecialidade { get; set; }

        [Required(ErrorMessage = "Nome da especialidade necessário")]
        public string Nome { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
