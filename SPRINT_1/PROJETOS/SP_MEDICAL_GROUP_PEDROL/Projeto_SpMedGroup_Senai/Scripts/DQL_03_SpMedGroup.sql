USE SpMedGroup;
GO

--Alterações pré API em relação aos nome de usuários

--Exibe todas as informações da tabela de clínicas
SELECT * FROM Clinica;
GO

--Exibe todas as informações da tabela de tipos de usuários
SELECT * FROM TipoUsuario;
GO

--Exibe todas as informações da tabela de usuários com sua data de nascimento convertida para o padrão brasileiro de 10 dígitos
SELECT IdUsuario, Nome, IdTipoUsuario, Email, Senha, CONVERT(VARCHAR(10), DataDeNascimento, 103)[DataDeNascimento], (CAST((DATEDIFF(DAY, CONVERT(DATE, DataDeNascimento, 103), CONVERT(DATE, GETDATE(), 103))/365.25) AS TINYINT))[Idade], ImagemPerfil FROM Usuario;
GO

--Exibe todas as informações da tabela de pacientes com sua data de nascimento convertida para o padrão brasileiro de 10 dígitos
SELECT IdPaciente, Paciente.IdUsuario, Nome, CONVERT(VARCHAR(10), DataDeNascimento, 103)[DataDeNascimento], Telefone, RG, CPF, Endereco FROM Paciente
LEFT JOIN Usuario
ON Paciente.IdUsuario = Usuario.IdUsuario;
GO

--Exibe todas as informações da tabela de especialidades
SELECT * FROM Especialidade;
GO

--Exibe todas as informações da tabela de médicos
SELECT * FROM Medico;
GO

--Exibe todas as informações da tabela de situações
SELECT * FROM Situacao;
GO

--Exibe todas as informações da tabela de consultas
SELECT * FROM Consulta;
GO

--Exibe a relação da tabela de consultas com a de pacientes, médicos e situações
SELECT SUBSTRING(CONVERT(VARCHAR(50),DataHorario, 103), 1, 10)[Data], RIGHT(DataHorario, 7)[Hora], Descricao[Descrição], dbo.NomeMed(Consulta.IdConsulta)[Médico], dbo.NomePac(Consulta.IdConsulta)[Paciente], Situacao.Nome[Situação] FROM Consulta
LEFT JOIN Medico
ON Consulta.IdMedico = Medico.IdMedico
LEFT JOIN Paciente 
ON Consulta.IdPaciente = Paciente.IdPaciente
LEFT JOIN Situacao
ON Consulta.IdSituacao = Situacao.IdSituacao
GO

--Exibe a relação da tabela de médicos com a tabela de especialidades
SELECT Usuario.Nome[Médico], Especialidade.Nome[Especialidade] FROM Medico
LEFT JOIN Especialidade
ON Medico.IdEspecialidade = Especialidade.IdEspecialidade
LEFT JOIN Usuario
ON Medico.IdUsuario = Usuario.IdUsuario;
GO

--Exibe a relação da tabela de médicos com a tabela de clínicas
SELECT Usuario.Nome[Médico], Clinica.NomeFantasia[Nome Fantasia da clínica], Clinica.RazaoSocial[Razao Social da clínica], Clinica.CNPJ[CNPJ da clínica] FROM Medico
LEFT JOIN Clinica
ON Medico.IdClinica = Clinica.IdClinica
LEFT JOIN Usuario
ON Usuario.IdUsuario = Medico.IdUsuario;
GO

--Mostrar a quantidade de usuários
SELECT COUNT(IdUsuario)[Contagem de usuários] FROM Usuario;
GO

--Funções a seguir

--Função para checar se o ID de usuário de um médico ou paciente corresponde com o seu devido tipo na hora de cria-lo 
CREATE FUNCTION ChecagemValidadeIdUsuario(@IdUsuarioChecagem INT)
RETURNS VARCHAR(30)
AS BEGIN 
RETURN (SELECT TipoUsuario.TituloTipoUsuario FROM TipoUsuario 
RIGHT JOIN Usuario 
ON TipoUsuario.IdTipoUsuario = Usuario.IdTipoUsuario 
WHERE Usuario.IdUsuario = @IdUsuarioChecagem)
END;
GO

--Função para retornar a quantidade de médicos de uma determinada especialidade
CREATE FUNCTION CalculoQuantMedicosEsp(@Especialidade VARCHAR(70))
RETURNS SMALLINT
AS BEGIN 
RETURN(SELECT COUNT(IdMedico) FROM Medico
RIGHT JOIN Especialidade
ON Especialidade.IdEspecialidade = Medico.IdEspecialidade
WHERE Especialidade.Nome = @Especialidade)
END;
GO
--Teste da função anterior
SELECT Especialidade.Nome ,dbo.CalculoQuantMedicosEsp(Especialidade.Nome)[Número de médicos] FROM Especialidade;
GO

--Função para que retorne a idade do usuário a partir de uma determinada stored procedure
CREATE FUNCTION CalculoIdade(@DataNasc DATE)
RETURNS TINYINT
AS BEGIN 
RETURN(SELECT DATEDIFF(DAY, CONVERT(DATE, @DataNasc, 103), CONVERT(DATE, GETDATE(), 103))/365.25)
END;
GO
--Teste da função anterior
SELECT Usuario.IdUsuario, dbo.CalculoIdade(Usuario.DataDeNascimento)[Idade] FROM Usuario
LEFT JOIN Medico
ON Usuario.IdUsuario = Medico.IdUsuario
LEFT JOIN Paciente
ON Usuario.IdUsuario = Paciente.IdUsuario;
GO

--Funções pré API

--Retornar o nome de um médico de uma consulta
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