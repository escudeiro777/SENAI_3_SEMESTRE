using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SpMedGroup.webAPI.Domains
{
    public partial class Consultum
    {
        public int IdConsulta { get; set; }
        public byte IdSituacao { get; set; }
        [Required(ErrorMessage = "Id do paciente necessário")]
        public int IdPaciente { get; set; }
        [Required(ErrorMessage = "Id do médico necessário")]
        public short IdMedico { get; set; }
        [Required(ErrorMessage = "Data e horário necessários")]
        public DateTime DataHorario { get; set; }
        public string Descricao { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
