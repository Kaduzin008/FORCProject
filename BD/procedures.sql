-- Inserir novo cliente
DELIMITER //
CREATE PROCEDURE sp_inserir_cliente(IN nome_cliente VARCHAR(100))
BEGIN
  INSERT INTO clientes (nome) VALUES (nome_cliente);
END //
DELIMITER ;

-- Atualizar status de orçamento
DELIMITER //
CREATE PROCEDURE sp_atualizar_status(IN id INT, IN novo_status VARCHAR(50))
BEGIN
  UPDATE orcamentos SET status = novo_status WHERE id_orcamento = id;
END //
DELIMITER ;