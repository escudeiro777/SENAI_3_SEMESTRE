CREATE DATABASE SpMedGroup;
GO

USE SpMedGroup;
GO

--Tabela de cl�nicas
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

--Tabela de Tipos de usu�rios
CREATE TABLE TipoUsuario(
	IdTipoUsuario TINYINT PRIMARY KEY IDENTITY(1,1),
	TituloTipoUsuario VARCHAR(30) NOT NULL UNIQUE
);
GO

--Tabela de Usu�rios
CREATE TABLE Usuario(
	IdUsuario INT PRIMARY KEY IDENTITY(1,1),
	IdTipoUsuario TINYINT FOREIGN KEY REFERENCES TipoUsuario(IdTipoUsuario) NOT NULL,
	Email VARCHAR(256) NOT NULL UNIQUE,
	Senha VARCHAR(16) NOT NULL CHECK(LEN(SENHA) >= 8),
	DataDeNascimento DATE 
);
GO

--Tabela de pacientes
CREATE TABLE Paciente(
	IdPaciente INT PRIMARY KEY IDENTITY(1,1),
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario) NOT NULL UNIQUE CHECK(dbo.ChecagemValidadeIdUsuario(Paciente.IdUsuario) = 'Paciente'),
	Nome VARCHAR(100) NOT NULL, 
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

--Tabela de M�dicos
CREATE TABLE Medico(
	IdMedico SMALLINT PRIMARY KEY IDENTITY(1,1),
	IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario) NOT NULL UNIQUE CHECK(dbo.ChecagemValidadeIdUsuario(Medico.IdUsuario) = 'M�dico'),
	IdClinica SMALLINT FOREIGN KEY REFERENCES Clinica(IdClinica),
	IdEspecialidade TINYINT FOREIGN KEY REFERENCES Especialidade(IdEspecialidade),
	CRM CHAR(13) NOT NULL UNIQUE,
	Nome VARCHAR(100) NOT NULL UNIQUE
);
GO

--Tabela de situa��es
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
	Descricao VARCHAR(1000) NOT NULL DEFAULT('N�o especificada')
);
GO

--Pequenas altera��es pr� API

ALTER TABLE Paciente
DROP COLUMN Nome;
GO

ALTER TABLE Medico
DROP CONSTRAINT UQ__Medico__7D8FE3B26D9E8F44;
GO

ALTER TABLE Medico
DROP COLUMN Nome;
GO

ALTER TABLE Usuario
ADD Nome VARCHAR(100);
GO

ALTER TABLE Usuario
ALTER COLUMN Nome VARCHAR(100) NOT NULL;
GO

ALTER TABLE Usuario
ADD ImagemPerfil VARCHAR(257) DEFAULT('padrao.jpg') NOT NULL;
GO