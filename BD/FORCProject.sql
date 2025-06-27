# Criação do Banco de Dados FORC (Ferramenta de Orçamento Rápido e Cálculo)
CREATE DATABASE IF NOT EXISTS FORC;
USE FORC;

# Criação da Tabela Clientes, com a chave primária sendo o id do cliente, e as outras colunas como nome e telefone
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY, -- id do cliente
    nome VARCHAR(100) -- nome do cliente
);

# Criação da Tabela Equipamentos, com a chave primária sendo o id do equipamento, e as outras colunas como descrição e modelo
CREATE TABLE equipamentos (
    id_equipamento INT AUTO_INCREMENT PRIMARY KEY, -- id do equipamento
    id_cliente INT, -- foreign key que referencia ao cliente dono do equipamento
    descricao VARCHAR(255), -- descrição do equipamento
    modelo VARCHAR(100), -- modelo do equipamento
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

# Criação da Tabela Orçamentos, para armazenar cada orçamento feito, ligado ao cliente
CREATE TABLE orcamentos (
    id_orcamento INT AUTO_INCREMENT PRIMARY KEY, -- id do orçamento
    id_cliente INT, -- foreign key para o cliente que fez o orçamento
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP, -- data de criação do orçamento
    prazo_estimado VARCHAR(100), -- prazo estimado para entrega (texto para flexibilidade)
    status ENUM('pendente', 'aprovado', 'recusado') DEFAULT 'pendente', -- status do orçamento
    observacoes TEXT, -- campo para observações adicionais
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

# Criação da Tabela Serviços, para armazenar tipos de serviços e valores
CREATE TABLE servicos (
    id_servico INT AUTO_INCREMENT PRIMARY KEY, -- id do serviço
    descricao TEXT, -- descrição do serviço prestado
    mao_obra DECIMAL(10,2), -- valor da mão de obra
    valor_pecas DECIMAL(10,2) -- valor das peças
);

# Tabela intermediária para associar um orçamento com serviços e equipamentos envolvidos
CREATE TABLE orcamento_servicos (
    id_orcamento INT, -- foreign key para orçamento
    id_servico INT, -- foreign key para serviço
    id_equipamento INT, -- foreign key para equipamento
    PRIMARY KEY (id_orcamento, id_servico, id_equipamento), -- chave composta para evitar duplicação
    FOREIGN KEY (id_orcamento) REFERENCES orcamentos(id_orcamento),
    FOREIGN KEY (id_servico) REFERENCES servicos(id_servico),
    FOREIGN KEY (id_equipamento) REFERENCES equipamentos(id_equipamento)
);