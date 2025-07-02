-- Transação para inserir um novo orçamento junto com os serviços relacionados,
-- garantindo que ambos sejam gravados ou nenhum deles seja aplicado em caso de erro.
START TRANSACTION;

-- Inserir novo orçamento
INSERT INTO orcamentos (id_cliente, data_criacao, prazo_estimado, status, observacoes)
VALUES (1, NOW(), '7 dias', 'Pendente', 'Orçamento gerado via sistema');

-- Suponha que o ID do orçamento gerado foi 10
-- Inserir serviços associados ao orçamento
INSERT INTO orcamento_servicos (id_orcamento, id_servico, id_equipamento)
VALUES (10, 2, 3), (10, 4, 3);

COMMIT;