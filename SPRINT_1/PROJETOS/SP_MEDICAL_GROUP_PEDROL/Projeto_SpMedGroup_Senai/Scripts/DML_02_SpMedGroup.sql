USE SpMedGroup;
GO

--Dados da tabela de clínicas
INSERT INTO Clinica(NomeFantasia, CNPJ, RazaoSocial, Endereco)
VALUES ('Clinica Possarle', '86.400.902/0001-30', 'SP Medical Group', 'Av. Barão Limeira, 532, São Paulo, SP');
GO

--Dados da tabela de tipos de usuários
INSERT INTO TipoUsuario(TituloTipoUsuario)
VALUES ('Administrador'), ('Médico'), ('Paciente');
GO

--Dados da tabela de usuários
INSERT INTO Usuario(IdTipoUsuario, Email, Senha)
VALUES (3, 'ligia@gmail.com', '94839859000'),
(3, 'alexandre@gmail.com', '73556944057'),
(3, 'fernando@gmail.com', '16839338002'),
(3, 'henrique@gmail.com', '14332654765'),
(3, 'joao@hotmail.com', '91305348010'),
(3, 'bruno@gmail.com', '79799299004'),
(3, 'mariana@outlook.com', '13771913039'),
(2, 'ricardo.lemos@spmedicalgroup.com.br', '54356-SP'),
(2, 'roberto.possarle@spmedicalgroup.com.br', '53452-SP'),
(2, 'helena.souza@spmedicalgroup.com.br', '65463-SP');
GO

--Dados da tabela de pacientes
INSERT INTO Paciente (IdUsuario, Nome, DataDeNascimento, Telefone, RG, CPF, Endereco)
VALUES (3, 'Ligia', '13/10/1983', '11 3456-7654', '43522543-5', '94839859000', 'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'),
(4, 'Alexandre', '23/07/2001', '11 98765-6543', '32654345-7', '73556944057', 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
(5, 'Fernando', '10/10/1978', '11 97208-4453', '54636525-3', '16839338002', 'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200'),
(6, 'Henrique', '13/10/1985', '11 3456-6543', '54366362-5', '14332654765', 'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
(7, 'João', '27/08/1975', '11 7656-6377', '53254444-1', '91305348010', 'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'),
(8, 'Bruno', '21/03/1972', '11 95436-8769', '54566266-7', '79799299004', 'Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001'),
(9, 'Mariana', '05/03/2018', NULL, '54566266-8', '13771913039', 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
GO

--Dados da tabela de especialidades
INSERT INTO Especialidade(Nome)
VALUES ('Acupuntura'),
('Anestesiologia'),
('Angiologia'),
('Cardiologia'),
('Cirurgia Cardiovascular'),
('Cirurgia da Mão'),
('Cirurgia do Aparelho Digestivo'),
('Cirurgia Geral'),
('Cirurgia Pediátrica'),
('Cirurgia Plástica'),
('Cirurgia Torácica'),
('Cirurgia Vascular'),
('Dermatologia'),
('Radioterapia'),
('Urologia'),
('Pediatria'),
('Psiquiatria');
GO

--Dados da tabela de médicos
INSERT INTO Medico(IdUsuario, IdClinica, IdEspecialidade, CRM, Nome)
VALUES (10, 1, 52, '54356-SP', 'Ricardo Lemos'),
(11, 1, 66, '53452-SP', 'Roberto Possarle'),
(12, 1, 67, '65463-SP', 'Helena Strada');
GO

--Dados da tabela de situações
INSERT INTO Situacao(Nome)
VALUES ('Agendada'), ('Realizada'), ('Cancelada');
GO

--Dados da tabela de consultas
INSERT INTO Consulta(IdSituacao, IdPaciente, IdMedico, DataHorario)
VALUES (2, 21, 9, '20/01/2020 15:00'),
(3, 16, 8, '06/01/2020 10:00'),
(2, 17, 8, '07/02/2020 11:00'),
(2, 16, 8, '06/02/2018 10:00'),
(3, 18, 7, '07/02/2019 11:00'),
(1, 21, 9, '08/03/2020 15:00'),
(1, 18, 7, '09/03/2020 11:00');
GO

--Ajustes

UPDATE Medico
SET IdEspecialidade = 66
WHERE Nome = 'Helena Strada';
GO

UPDATE Medico
SET IdEspecialidade = 67
WHERE Nome = 'Roberto Possarle';
GO

Update Usuario
SET DataDeNascimento = '13/10/1983'
WHERE Email = 'ligia@gmail.com';
GO

Update Usuario
SET DataDeNascimento = '23/07/2001'
WHERE Email = 'alexandre@gmail.com';
GO

Update Usuario
SET DataDeNascimento = '10/10/1978'
WHERE Email = 'fernando@gmail.com';
GO

Update Usuario
SET DataDeNascimento = '13/10/1985'
WHERE Email = 'henrique@gmail.com';
GO

Update Usuario
SET DataDeNascimento = '27/08/1975'
WHERE Email = 'joao@hotmail.com';
GO

Update Usuario
SET DataDeNascimento = '21/03/1972'
WHERE Email = 'bruno@gmail.com';
GO

Update Usuario
SET DataDeNascimento = '05/03/2018'
WHERE Email = 'mariana@outlook.com';
GO

--Pequenas alterações pré API

UPDATE Usuario
SET Nome = 'Ricardo Lemos'
WHERE IdUsuario = 10;
GO

UPDATE Usuario
SET Nome = 'Roberto Possarle'
WHERE IdUsuario = 11;
GO

UPDATE Usuario
SET Nome = 'Helena Strada'
WHERE IdUsuario = 12;
GO

UPDATE Usuario 
SET Nome = 'Ligia'
WHERE IdUsuario = 3;
GO

UPDATE Usuario 
SET Nome = 'Alexandre'
WHERE IdUsuario = 4;
GO

UPDATE Usuario 
SET Nome = 'Fernando'
WHERE IdUsuario = 5;
GO

UPDATE Usuario 
SET Nome = 'Henrique'
WHERE IdUsuario = 6;
GO

UPDATE Usuario 
SET Nome = 'João'
WHERE IdUsuario = 7;
GO

UPDATE Usuario 
SET Nome = 'Bruno'
WHERE IdUsuario = 8;
GO

UPDATE Usuario 
SET Nome = 'Mariana'
WHERE IdUsuario = 9;
GO

INSERT INTO Usuario(IdTipoUsuario, Email, Senha, DataDeNascimento, Nome)
VALUES (1, 'admin@admin.com', 'admin123', '28/09/2021', 'Administrador');
GO