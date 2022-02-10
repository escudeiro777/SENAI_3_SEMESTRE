USE SpMedGroup;
GO

--Altera��es pr� API em rela��o aos nome de usu�rios

--Exibe todas as informa��es da tabela de cl�nicas
SELECT * FROM Clinica;
GO

--Exibe todas as informa��es da tabela de tipos de usu�rios
SELECT * FROM TipoUsuario;
GO

--Exibe todas as informa��es da tabela de usu�rios com sua data de nascimento convertida para o padr�o brasileiro de 10 d�gitos
SELECT IdUsuario, Nome, IdTipoUsuario, Email, Senha, CONVERT(VARCHAR(10), DataDeNascimento, 103)[DataDeNascimento], (CAST((DATEDIFF(DAY, CONVERT(DATE, DataDeNascimento, 103), CONVERT(DATE, GETDATE(), 103))/365.25) AS TINYINT))[Idade], ImagemPerfil FROM Usuario;
GO

--Exibe todas as informa��es da tabela de pacientes com sua data de nascimento convertida para o padr�o brasileiro de 10 d�gitos
SELECT IdPaciente, Paciente.IdUsuario, Nome, CONVERT(VARCHAR(10), DataDeNascimento, 103)[DataDeNascimento], Telefone, RG, CPF, Endereco FROM Paciente
LEFT JOIN Usuario
ON Paciente.IdUsuario = Usuario.IdUsuario;
GO

--Exibe todas as informa��es da tabela de especialidades
SELECT * FROM Especialidade;
GO

--Exibe todas as informa��es da tabela de m�dicos
SELECT * FROM Medico;
GO

--Exibe todas as informa��es da tabela de situa��es
SELECT * FROM Situacao;
GO

--Exibe todas as informa��es da tabela de consultas
SELECT * FROM Consulta;
GO

--Exibe a rela��o da tabela de consultas com a de pacientes, m�dicos e situa��es
SELECT SUBSTRING(CONVERT(VARCHAR(50),DataHorario, 103), 1, 10)[Data], RIGHT(DataHorario, 7)[Hora], Descricao[Descri��o], dbo.NomeMed(Consulta.IdConsulta)[M�dico], dbo.NomePac(Consulta.IdConsulta)[Paciente], Situacao.Nome[Situa��o] FROM Consulta
LEFT JOIN Medico
ON Consulta.IdMedico = Medico.IdMedico
LEFT JOIN Paciente 
ON Consulta.IdPaciente = Paciente.IdPaciente
LEFT JOIN Situacao
ON Consulta.IdSituacao = Situacao.IdSituacao
GO

--Exibe a rela��o da tabela de m�dicos com a tabela de especialidades
SELECT Usuario.Nome[M�dico], Especialidade.Nome[Especialidade] FROM Medico
LEFT JOIN Especialidade
ON Medico.IdEspecialidade = Especialidade.IdEspecialidade
LEFT JOIN Usuario
ON Medico.IdUsuario = Usuario.IdUsuario;
GO

--Exibe a rela��o da tabela de m�dicos com a tabela de cl�nicas
SELECT Usuario.Nome[M�dico], Clinica.NomeFantasia[Nome Fantasia da cl�nica], Clinica.RazaoSocial[Razao Social da cl�nica], Clinica.CNPJ[CNPJ da cl�nica] FROM Medico
LEFT JOIN Clinica
ON Medico.IdClinica = Clinica.IdClinica
LEFT JOIN Usuario
ON Usuario.IdUsuario = Medico.IdUsuario;
GO

--Mostrar a quantidade de usu�rios
SELECT COUNT(IdUsuario)[Contagem de usu�rios] FROM Usuario;
GO

--Fun��es a seguir

--Fun��o para checar se o ID de usu�rio de um m�dico ou paciente corresponde com o seu devido tipo na hora de cria-lo 
CREATE FUNCTION ChecagemValidadeIdUsuario(@IdUsuarioChecagem INT)
RETURNS VARCHAR(30)
AS BEGIN 
RETURN (SELECT TipoUsuario.TituloTipoUsuario FROM TipoUsuario 
RIGHT JOIN Usuario 
ON TipoUsuario.IdTipoUsuario = Usuario.IdTipoUsuario 
WHERE Usuario.IdUsuario = @IdUsuarioChecagem)
END;
GO

--Fun��o para retornar a quantidade de m�dicos de uma determinada especialidade
CREATE FUNCTION CalculoQuantMedicosEsp(@Especialidade VARCHAR(70))
RETURNS SMALLINT
AS BEGIN 
RETURN(SELECT COUNT(IdMedico) FROM Medico
RIGHT JOIN Especialidade
ON Especialidade.IdEspecialidade = Medico.IdEspecialidade
WHERE Especialidade.Nome = @Especialidade)
END;
GO
--Teste da fun��o anterior
SELECT Especialidade.Nome ,dbo.CalculoQuantMedicosEsp(Especialidade.Nome)[N�mero de m�dicos] FROM Especialidade;
GO

--Fun��o para que retorne a idade do usu�rio a partir de uma determinada stored procedure
CREATE FUNCTION CalculoIdade(@DataNasc DATE)
RETURNS TINYINT
AS BEGIN 
RETURN(SELECT DATEDIFF(DAY, CONVERT(DATE, @DataNasc, 103), CONVERT(DATE, GETDATE(), 103))/365.25)
END;
GO
--Teste da fun��o anterior
SELECT Usuario.IdUsuario, dbo.CalculoIdade(Usuario.DataDeNascimento)[Idade] FROM Usuario
LEFT JOIN Medico
ON Usuario.IdUsuario = Medico.IdUsuario
LEFT JOIN Paciente
ON Usuario.IdUsuario = Paciente.IdUsuario;
GO

--Fun��es pr� API

--Retornar o nome de um m�dico de uma consulta
CREATE FUNCTION NomeMed(@IdConsulta INT)
RETURNS VARCHAR(100)
AS BEGIN 
RETURN (SELECT Usuario.Nome FROM Consulta 
		LEFT JOIN Medico
		ON Consulta.IdMedico = Medico.IdMedico
		LEFT JOIN Usuario
		ON Usuario.IdUsuario = Medico.IdUsuario
		WHERE Consulta.IdConsulta = @IdConsulta)
END;
GO

CREATE FUNCTION NomePac(@IdConsulta INT)
RETURNS VARCHAR(100)
AS BEGIN 
RETURN (SELECT Usuario.Nome FROM Consulta 
		LEFT JOIN Paciente
		ON Consulta.IdPaciente = Paciente.IdPaciente
		LEFT JOIN Usuario
		ON Usuario.IdUsuario = Paciente.IdUsuario
		WHERE Consulta.IdConsulta = @IdConsulta)
END;
GO