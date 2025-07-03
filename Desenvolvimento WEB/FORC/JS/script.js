let numeroOrcamento = 1;

function carregarNumeroOrcamento() {
  const salvo = localStorage.getItem('numeroOrcamento');
  numeroOrcamento = salvo ? parseInt(salvo) + 1 : 1;
  localStorage.setItem('numeroOrcamento', numeroOrcamento);
  document.getElementById('orcamento_numero').innerText = `Orçamento Nº: ORC-${numeroOrcamento.toString().padStart(4, '0')}`;
}

function calcularTotal() {
  const maoObra = parseFloat(document.getElementById('mao_obra').value) || 0;
  const pecas = parseFloat(document.getElementById('pecas').value) || 0;
  const custo = parseFloat(document.getElementById('custo').value) || 0;

  const total = maoObra + pecas;
  const lucroTotal = total - custo;
  const lucroPecas = pecas - custo;

  const lucroDiv = document.getElementById('lucro_total');
  lucroDiv.innerHTML = `
    Lucro das Peças: <span style="color:${lucroPecas >= 0 ? 'green' : 'red'}">R$ ${lucroPecas.toFixed(2)}</span><br>
    Lucro Total: <span style="color:${lucroTotal >= 0 ? 'green' : 'red'}">R$ ${lucroTotal.toFixed(2)}</span>
  `;

  document.getElementById('valor_total').innerText = `Total Cobrado: R$ ${total.toFixed(2)}`;

  return total;
}


function salvarOrcamento() {
  const orcamento = obterDadosOrcamento();
  let historico = JSON.parse(localStorage.getItem('historicoOrcamentos')) || [];
  historico.push(orcamento);
  localStorage.setItem('historicoOrcamentos', JSON.stringify(historico));
  alert("Orçamento salvo!");
  mostrarHistorico();
}

function obterDadosOrcamento() {
  const total = calcularTotal();
  return {
    numero: numeroOrcamento,
    cliente: document.getElementById('cliente').value,
    equipamento: document.getElementById('equipamento').value,
    servico: document.getElementById('servico').value,
    maoObra: parseFloat(document.getElementById('mao_obra').value) || 0,
    pecas: parseFloat(document.getElementById('pecas').value) || 0,
    custo: parseFloat(document.getElementById('custo').value) || 0,
    prazo: document.getElementById('prazo').value,
    obs: document.getElementById('obs').value,
    status: document.getElementById('status').value,
    total: total.toFixed(2)
  };
}

function mostrarHistorico() {
  const historico = JSON.parse(localStorage.getItem('historicoOrcamentos')) || [];
  const div = document.getElementById('historico');
  div.innerHTML = '';
  historico.forEach((orc, index) => {
    div.innerHTML += `<div><strong>ORC-${orc.numero.toString().padStart(4, '0')}</strong> - ${orc.cliente} (${orc.status}) - R$ ${orc.total} <button data-index="${index}" class="ver-btn">Ver</button></div>`;
  });

  document.querySelectorAll('.ver-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const historico = JSON.parse(localStorage.getItem('historicoOrcamentos')) || [];
      preencherCampos(JSON.stringify(historico[index]));
    });
  });
}

function preencherCampos(orcStr) {
  const orc = JSON.parse(orcStr);
  document.getElementById('cliente').value = orc.cliente;
  document.getElementById('equipamento').value = orc.equipamento;
  document.getElementById('servico').value = orc.servico;
  document.getElementById('mao_obra').value = orc.maoObra;
  document.getElementById('pecas').value = orc.pecas;
  document.getElementById('custo').value = orc.custo;
  document.getElementById('prazo').value = orc.prazo;
  document.getElementById('obs').value = orc.obs;
  document.getElementById('status').value = orc.status;
  calcularTotal();
}

function duplicarUltimo() {
  const historico = JSON.parse(localStorage.getItem('historicoOrcamentos')) || [];
  if (historico.length > 0) preencherCampos(JSON.stringify(historico[historico.length - 1]));
}

function enviarWhatsApp() {
  const orc = obterDadosOrcamento();
  const texto = `ORÇAMENTO:\n\nOrçamento Nº: ORC-${orc.numero.toString().padStart(4, '0')}\nCliente: ${orc.cliente}\nEquipamento: ${orc.equipamento}\nServiço: ${orc.servico}\nMão de Obra: R$ ${orc.maoObra.toFixed(2)}\nPeças: R$ ${orc.pecas.toFixed(2)}\nTotal: R$ ${orc.total}\nPrazo: ${orc.prazo}\nStatus: ${orc.status}\nObservações: ${orc.obs}\n\nAtenciosamente,\nAssistência Técnica`;
  const link = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  window.open(link, '_blank');
}

async function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const orc = obterDadosOrcamento();

  let y = 10;
  doc.text(`ORÇAMENTO - ORC-${orc.numero.toString().padStart(4, '0')}`, 10, y); y += 10;
  doc.text(`Cliente: ${orc.cliente}`, 10, y); y += 10;
  doc.text(`Equipamento: ${orc.equipamento}`, 10, y); y += 10;

  const linhasServico = doc.splitTextToSize(orc.servico, 180);
  doc.text('Serviço:', 10, y);
  y += 7;
  doc.text(linhasServico, 10, y);
  y += linhasServico.length * 7;

  doc.text(`Mão de Obra: R$ ${orc.maoObra.toFixed(2)}`, 10, y); y += 10;
  doc.text(`Peças: R$ ${orc.pecas.toFixed(2)}`, 10, y); y += 10;
  doc.text(`Custo: R$ ${orc.custo.toFixed(2)}`, 10, y); y += 10;
  doc.text(`Lucro: R$ ${(orc.maoObra + orc.pecas - orc.custo).toFixed(2)}`, 10, y); y += 10;
  doc.text(`Total: R$ ${orc.total}`, 10, y); y += 10;
  doc.text(`Prazo: ${orc.prazo}`, 10, y); y += 10;
  doc.text(`Status: ${orc.status}`, 10, y); y += 10;

  const linhasObs = doc.splitTextToSize(orc.obs, 180);
  doc.text('Observações:', 10, y);
  y += 7;
  doc.text(linhasObs, 10, y);
  y += linhasObs.length * 7;

  doc.save(`orcamento_ORC-${orc.numero.toString().padStart(4, '0')}.pdf`);
}

function filtrarHistorico() {
  const filtro = document.getElementById('filtro').value.toLowerCase();
  const historico = JSON.parse(localStorage.getItem('historicoOrcamentos')) || [];
  const div = document.getElementById('historico');
  div.innerHTML = '';
  historico.filter(orc =>
    orc.cliente.toLowerCase().includes(filtro) ||
    orc.status.toLowerCase().includes(filtro)
  ).forEach((orc, index) => {
    div.innerHTML += `<div><strong>ORC-${orc.numero.toString().padStart(4, '0')}</strong> - ${orc.cliente} (${orc.status}) - R$ ${orc.total} <button data-index="${index}" class="ver-btn">Ver</button></div>`;
  });

  document.querySelectorAll('.ver-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const historico = JSON.parse(localStorage.getItem('historicoOrcamentos')) || [];
      preencherCampos(JSON.stringify(historico[index]));
    });
  });
}

async function carregarHistoricoDoJson() {
  try {
    const resposta = await fetch('dados.json');
    const dados = await resposta.json();
    const historicoExistente = JSON.parse(localStorage.getItem('historicoOrcamentos')) || [];

    if (historicoExistente.length === 0 && dados.orcamentos) {
      localStorage.setItem('historicoOrcamentos', JSON.stringify(dados.orcamentos));
      mostrarHistorico();
    }
  } catch (erro) {
    console.error('Erro ao carregar dados do JSON:', erro);
  }
}

window.onload = () => {
  carregarNumeroOrcamento();
  carregarHistoricoDoJson(); 
  mostrarHistorico();        
};
