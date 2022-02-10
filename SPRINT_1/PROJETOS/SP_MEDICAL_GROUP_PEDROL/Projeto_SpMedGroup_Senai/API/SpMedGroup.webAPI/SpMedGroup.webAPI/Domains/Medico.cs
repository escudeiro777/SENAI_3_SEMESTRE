using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SpMedGroup.webAPI.Domains
{
    public partial class Medico
    {
        public Medico()
        {
            Consulta = new HashSet<Consultum>();
        }

        public short IdMedico { get; set; }
        [Required(ErrorMessage = "Id de usuário necessário")]
        public int IdUsuario { get; set; }
        public short? IdClinica { get; set; }
        public byte? IdEspecialidade { get; set; }
        [Required(ErrorMessage = "CRM necessário")]
        public string Crm { get; set; }

        public virtual Clinica IdClinicaNavigation { get; set; }
        public virtual Especialidade IdEspecialidadeNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
