
CREATE DATABASE IF NOT EXISTS projetos_condor;
USE projetos_condor;

CREATE TABLE IF NOT EXISTS projeto (
    CodigoProjeto INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(150),
    Tipo VARCHAR(50), -- 'Mecânico' ou 'Elétrico'
    Ano INT,
    Responsavel VARCHAR(100),
    CaminhoArquivo VARCHAR(255) -- Caminho local do arquivo digitalizado
);
