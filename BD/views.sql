-- View 1: Lista de orçamentos com nome do cliente e status
CREATE VIEW vw_orcamentos_clientes AS
SELECT o.id_orcamento, c.nome AS cliente, o.data_criacao, o.status
FROM orcamentos o
JOIN clientes c ON o.id_cliente = c.cliente_id;

-- View 2: Equipamentos por cliente
CREATE VIEW vw_equipamentos_por_cliente AS
SELECT c.nome, e.descricao, e.modelo
FROM equipamentos e
JOIN clientes c ON e.id_cliente = c.cliente_id;

-- View 3: Detalhes de serviços por orçamento
CREATE VIEW vw_detalhes_orcamento_servicos AS
SELECT o.id_orcamento, s.descricao, s.mao_obra, s.valor_pecas, (s.mao_obra + s.valor_pecas) AS total
FROM orcamento_servicos os
JOIN servicos s ON os.id_servico = s.id_servico
JOIN orcamentos o ON os.id_orcamento = o.id_orcamento;

-- View 4: Orçamentos aprovados
CREATE VIEW vw_orcamentos_aprovados AS
SELECT o.id_orcamento, c.nome, o.prazo_estimado
FROM orcamentos o
JOIN clientes c ON o.id_cliente = c.cliente_id
WHERE o.status = 'Aprovado';