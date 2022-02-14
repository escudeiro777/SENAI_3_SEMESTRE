using Microsoft.AspNetCore.Mvc;
using Moq;
using Patrimonio.Controllers;
using Patrimonio.Domains;
using Patrimonio.Interfaces;
using Patrimonio.ViewModels;
using Xunit;

namespace Patrimonio.Teste.Controllers
{
    public class LoginControllerTestes
    {
        [Fact]
        public void Deve_Retornar_Usuario_Invalido()
        {
            //Pré-condição -- Arrange
            var fakeRepository = new Mock<IUsuarioRepository>();
            fakeRepository
                .Setup(x => x.Login(It.IsAny<string>(), It.IsAny<string>()))
                .Returns((Usuario)null);

            var fakeViewModel = new LoginViewModel();
            fakeViewModel.Email = "samuel@email.com";
            fakeViewModel.Senha = "xoudaxuxaparabaixinhos";

            var controller = new LoginController(fakeRepository.Object);

            //Procedimento -- Act
            var resultado = controller.Login(fakeViewModel);

            //Resultado -- Assert
            Assert.IsType<UnauthorizedObjectResult>(resultado);
        }

        [Fact]
        public void Deve_Retornar_Usuario_Valido()
        {
            

            Usuario fakeUsuario = new Usuario();
            fakeUsuario.Email = "samuel@email.com";
            fakeUsuario.Senha = "vaicorinthians";

            var fakeRepository = new Mock<IUsuarioRepository>();
            fakeRepository
                .Setup(x => x.Login(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(fakeUsuario);

            var fakeViewModel = new LoginViewModel();
            fakeViewModel.Email = "samuel@email.com";
            fakeViewModel.Senha = "xoudaxuxaparabaixinhos";

            var controller = new LoginController(fakeRepository.Object);

            //Procedimento -- Act
            var resultado = controller.Login(fakeViewModel);

            //Resultado -- Assert
            Assert.IsType<OkObjectResult>(resultado);
        }
    }
}
