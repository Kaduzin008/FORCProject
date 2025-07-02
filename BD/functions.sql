-- Calcular custo total de um serviço
DELIMITER //
CREATE FUNCTION fn_total_servico(id_serv INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  DECLARE total DECIMAL(10,2);
  SELECT (mao_obra + valor_pecas) INTO total
  FROM servicos WHERE id_servico = id_serv;
  RETURN total;
END //
DELIMITER ;

-- Contar orçamentos por cliente
DELIMITER //
CREATE FUNCTION fn_orcamentos_por_cliente(id_cli INT)
RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE qtd INT;
  SELECT COUNT(*) INTO qtd FROM orcamentos WHERE id_cliente = id_cli;
  RETURN qtd;
END //
DELIMITER ;