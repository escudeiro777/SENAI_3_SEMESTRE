CREATE DATABASE SpMedGroup;
GO

USE SpMedGroup;
GO

CREATE FUNCTION ChecagemValidadeIdUsuario(@IdUsuarioChecagem INT)
RETURNS VARCHAR(30)
AS BEGIN 
RETURN (SELECT TipoUsuario.TituloTipoUsuario FROM TipoUsuario 
RIGHT JOIN Usuario 
ON TipoUsuario.IdTipoUsuario = Usuario.IdTipoUsuario 
WHERE Usuario.IdUsuario = @IdUsuarioChecagem)
END;
GO

--Tabela de clínicas
CREATE TABLE Clinica(
	IdClinica SMALLINT PRIMARY KEY IDENTITY(1,1),
	CNPJ CHAR(18) NOT NULL UNIQUE,
	HorarioDeAbertura TIME,
	HorarioDeFechamento TIME,
	Endereco VARCHAR(300) NOT NULL UNIQUE,
	RazaoSocial VARCHAR(200),
	NomeFantasia VARCHAR(200),
);
GO

--Tabela de Tipos de usuários
CREATE TABLE TipoUsuario(
	IdTipoUsuario TINYINT PRIMARY KEY IDENTITY(1,1),
	TituloTipoUsuario VARCHAR(30) NOT NULL UNIQUE
);
GO

--Tabela de Usuários
CREATE TABLE Usuario(
	IdUsuario INT PRIMARY KEY IDENTITY(1,1),
	IdTipoUsuario TINYINT FOREIGN KEY REFERENCES TipoUsuario(IdTipoUsuario) NOT NULL,
	Email VARCHAR(256) NOT NULL UNIQUE,
	Senha VARCHAR(16) NOT NULL CHECK(LEN(SENHA) >= 8),
	DataDeNascimento DATE,
	Nome VARCHAR(100) NOT NULL,
	ImagemPerfil VARCHAR(257) DEFAULT('padrao.jpg') NOT NULL
);
GO

--Tabela de pacientes
CREATE TABLE Paciente(
	IdPaciente INT PRIMARY KEY IDENTITY(1,1),
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario) NOT NULL UNIQUE CHECK(dbo.ChecagemValidadeIdUsuario(Paciente.IdUsuario) = 'Paciente'),
	Telefone VARCHAR(13),
	RG CHAR(10) NOT NULL UNIQUE,
	CPF CHAR(11) NOT NULL UNIQUE,
	Endereco VARCHAR(300) NOT NULL,
);
GO

--Tabela de Especialidades
CREATE TABLE Especialidade(
	IdEspecialidade TINYINT PRIMARY KEY IDENTITY(1,1),
	Nome VARCHAR(70) NOT NULL UNIQUE
);
GO

--Tabela de Médicos
CREATE TABLE Medico(
	IdMedico SMALLINT PRIMARY KEY IDENTITY(1,1),
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario) NOT NULL UNIQUE CHECK(dbo.ChecagemValidadeIdUsuario(Medico.IdUsuario) = 'Médico'),
	IdClinica SMALLINT FOREIGN KEY REFERENCES Clinica(IdClinica),
	IdEspecialidade TINYINT FOREIGN KEY REFERENCES Especialidade(IdEspecialidade),
	CRM CHAR(13) NOT NULL UNIQUE
);
GO

--Tabela de situações
CREATE TABLE Situacao(
	IdSituacao TINYINT PRIMARY KEY IDENTITY(1,1),
	Nome VARCHAR(30)
);
GO

--Tabela de Consultas
CREATE TABLE Consulta(
	IdConsulta INT PRIMARY KEY IDENTITY(1,1),
	IdSituacao TINYINT FOREIGN KEY REFERENCES Situacao(IdSituacao) NOT NULL,
	IdPaciente INT FOREIGN KEY REFERENCES Paciente(IdPaciente) NOT NULL,
	IdMedico SMALLINT FOREIGN KEY REFERENCES Medico(IdMedico) NOT NULL,
	DataHorario DATETIME NOT NULL,
	Descricao VARCHAR(1000) NOT NULL DEFAULT('Não especificada')
);
GO