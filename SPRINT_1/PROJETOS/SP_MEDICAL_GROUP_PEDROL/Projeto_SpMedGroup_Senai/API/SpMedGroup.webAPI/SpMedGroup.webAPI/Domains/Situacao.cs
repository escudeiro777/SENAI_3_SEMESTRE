using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SpMedGroup.webAPI.Domains
{
    public partial class Situacao
    {
        public Situacao()
        {
            Consulta = new HashSet<Consultum>();
        }

        public byte IdSituacao { get; set; }
        [Required(ErrorMessage = "Nome da situação necessário")]
        public string Nome { get; set; }

        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
