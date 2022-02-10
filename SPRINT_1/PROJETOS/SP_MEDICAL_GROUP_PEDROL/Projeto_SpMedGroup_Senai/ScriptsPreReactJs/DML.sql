USE SpMedGroup;
GO

--Dados da tabela de clínicas
INSERT INTO Clinica(NomeFantasia, CNPJ, RazaoSocial, Endereco)
VALUES ('Clinica Possarle', '86.400.902/0001-30', 'SP Medical Group', 'Av. Barão Limeira, 532, São Paulo, SP');
GO

SELECT * FROM Clinica;

--Dados da tabela de tipos de usuários
INSERT INTO TipoUsuario(TituloTipoUsuario)
VALUES ('Administrador'), ('Médico'), ('Paciente');
GO

SELECT * FROM TipoUsuario;

--Dados da tabela de usuários
INSERT INTO Usuario(IdTipoUsuario, Email, Senha, Nome, DataDeNascimento)
VALUES (3, 'ligia@gmail.com', '94839859000', 'Ligia', '1983-10-13'),
(3, 'alexandre@gmail.com', '73556944057', 'Alexandre', '2001-07-23'),
(3, 'fernando@gmail.com', '16839338002', 'Fernando', '1978-10-10'),
(3, 'henrique@gmail.com', '14332654765', 'Henrique', '1985-10-13'),
(3, 'joao@hotmail.com', '91305348010', 'João', '1985-08-27'),
(3, 'bruno@gmail.com', '79799299004', 'Bruno', '1972-03-21'),
(3, 'mariana@outlook.com', '13771913039', 'Mariana','2018-03-05'),
(2, 'ricardo.lemos@spmedicalgroup.com.br', '54356-SP', 'Ricardo Lemos', NULL),
(2, 'roberto.possarle@spmedicalgroup.com.br', '53452-SP', 'Roberto Possarle', NULL),
(2, 'helena.souza@spmedicalgroup.com.br', '65463-SP', 'Helena Strada', NULL);
GO

SELECT * FROM Usuario;

--Dados da tabela de pacientes
INSERT INTO Paciente (IdUsuario, Telefone, RG, CPF, Endereco)
VALUES (1, '11 3456-7654', '43522543-5', '94839859000', 'Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'),
(2, '11 98765-6543', '32654345-7', '73556944057', 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
(3, '11 97208-4453', '54636525-3', '16839338002', 'Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200'),
(4, '11 3456-6543', '54366362-5', '14332654765', 'R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
(5, '11 7656-6377', '53254444-1', '91305348010', 'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'),
(6, '11 95436-8769', '54566266-7', '79799299004', 'Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001'),
(7, NULL, '54566266-8', '13771913039', 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
GO

SELECT * FROM Paciente;

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

SELECT * FROM Especialidade;

--Dados da tabela de médicos
INSERT INTO Medico(IdUsuario, IdClinica, IdEspecialidade, CRM)
VALUES (8, 1, 2, '54356-SP'),
(9, 1, 17, '53452-SP'),
(10, 1, 16, '65463-SP');
GO

SELECT * FROM Medico;
select * FROM Paciente;

--Dados da tabela de situações
INSERT INTO Situacao(Nome)
VALUES ('Agendada'), ('Realizada'), ('Cancelada');
GO

--Dados da tabela de consultas
INSERT INTO Consulta(IdSituacao, IdPaciente, IdMedico, DataHorario)
VALUES (2, 21, 12, '20/01/2020 15:00:00'),
(3, 16, 11, '06/01/2020 10:00:00'),
(2, 17, 11, '07/02/2020 11:00:00'),
(2, 16, 11, '06/02/2018 10:00:00'),
(3, 18, 10, '07/02/2019 11:00:00'),
(1, 21, 12, '08/03/2020 15:00:00'),
(1, 18, 10, '09/03/2020 11:00:00');
GO

SELECT * FROM Consulta;

INSERT INTO Usuario(IdTipoUsuario, Email, Senha, DataDeNascimento, Nome)
VALUES (1, 'admin@admin.com', 'admin123', '2021-09-28', 'Administrador');
GO