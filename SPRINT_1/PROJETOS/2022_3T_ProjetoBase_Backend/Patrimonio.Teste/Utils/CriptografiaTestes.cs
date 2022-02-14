using Patrimonio.Utils;
using System.Text.RegularExpressions;
using Xunit;

namespace Patrimonio.Teste.Utils
{
    public class CriptografiaTestes
    {
        [Fact]

        public void Deve_Retornar_Hash_Em_BCrypt()
        {
            //Pré-condição -- Arrange
            var senha = Criptografia.GerarHash("123456789");
            var regex = new Regex(@"^\$2[ayb]\$.{56}$");

            //Procedimento -- Act
            var retorno = regex.IsMatch(senha);

            //Resultado -- Assert
            Assert.True(retorno);
        }


        [Fact]
        public void Deve_Retornar_Comparacao_Valida()
        {
            //Pré-condição -- Arrange
            var senha = "123456789";
            var hashBanco = "$2a$11$XxQs31jDPnQf/xulNmTYTuYBQxGjTKQhUYv8iEgaxYx8epGHT6kB.";
            //Procedimento -- Act
            var comparacao = Criptografia.Comparar(senha, hashBanco);

            //Resultado -- Assert
            Assert.True(comparacao);
        }
    }
}
