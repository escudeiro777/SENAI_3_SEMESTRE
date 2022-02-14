using Microsoft.AspNetCore.Mvc;
using Moq;
using Patrimonio.Controllers;
using Patrimonio.Domains;
using Patrimonio.Interfaces;
using System;
using System.Collections.Generic;
using Xunit;

namespace Patrimonio.Teste.Controllers
{
    public class EquipamentosControllerTestes
    {
        [Fact]
        public void Deve_Retornar_Uma_Lista_De_Equipamentos()
        {
            //Pré-Condição -- Arrange
            List<Equipamento> lista = new List<Equipamento>();
            Equipamento equipamento1 = new Equipamento();
            equipamento1.Id = 1;
            equipamento1.NomePatrimonio = "Notebook";
            equipamento1.Imagem = "";
            equipamento1.Descricao = "Notebook Azul";
            equipamento1.DataCadastro = DateTime.Now;
            equipamento1.Ativo = true;

            lista.Add(equipamento1);

            var fakeRepository = new Mock<IEquipamentoRepository>();
            fakeRepository.Setup(e => e.Listar())
                .Returns(lista);

            var controller = new EquipamentosController(fakeRepository.Object);

            //Procedimento -- Act

            var resultado = controller.GetEquipamentos();

            //Resultado -- Assert
            Assert.IsType<OkObjectResult>(resultado);
        }

        [Fact]
        public void Deve_Buscar_Um_Equipamento_Por_ID()
        {
            //Pré-condição -- Arrange

            Equipamento fakeEquipamento = new Equipamento();
            fakeEquipamento.Id = 400;

            var fakeRepo = new Mock<IEquipamentoRepository>();
            fakeRepo
                .Setup(e => e.BuscarPorID(It.IsAny<int>()))
                .Returns(fakeEquipamento);

            var controller = new EquipamentosController(fakeRepo.Object);

            //Procedimento -- Act
            var resultado = controller.GetEquipamento(fakeEquipamento.Id);

            //Resultado -- Assert
            Assert.IsType<OkObjectResult>(resultado);
        }
    }
}
