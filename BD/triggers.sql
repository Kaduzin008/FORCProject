-- Atualiza status para "Pendente" ao inserir novo orçamento
DELIMITER //
CREATE TRIGGER trg_default_status
BEFORE INSERT ON orcamentos
FOR EACH ROW
BEGIN
  SET NEW.status = IFNULL(NEW.status, 'Pendente');
END //
DELIMITER ;

-- Define automaticamente o prazo estimado como "5 dias úteis"
-- quando o status do orçamento for alterado para "Aprovado" e o campo estiver vazio.
DELIMITER //
CREATE TRIGGER trg_prazo_padrao_aprovado
BEFORE UPDATE ON orcamentos
FOR EACH ROW
BEGIN
  IF NEW.status = 'Aprovado' AND (NEW.prazo_estimado IS NULL OR NEW.prazo_estimado = '') THEN
    SET NEW.prazo_estimado = '5 dias úteis';
  END IF;
END //
DELIMITER ;