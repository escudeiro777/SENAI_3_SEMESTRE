
using Patrimonio.Domains;
using Xunit;

namespace Patrimonio.Teste.Domains
{
    public class UsuarioDomainTestes
    {
        [Fact] //descricao
        
        public void Deve_Retornar_Usuario()
        {
            // Pré-condição
            Usuario usuario = new Usuario();
            usuario.Email = "paulo@email.com";
            usuario.Senha = "123456789";

            // Procedimento
            bool resultado = true;
            if (usuario.Senha == null || usuario.Email == null)
            {
                resultado = false;
            }
            // Resultado esperado
            Assert.True(resultado);
        }
    }
}
