const carrinhoContainer = document.getElementById('carrinho');
let produtos = JSON.parse(localStorage.getItem('carrinho')) || [];

if (produtos.length === 0) {
  carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
} else {
  produtos.forEach(produto => adicionarAoCarrinho(produto));
  adicionarBotaoFinalizar();
}

function adicionarAoCarrinho(produto) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `produto-${produto.id}`;

  const tamanhos = ['36', '37', '38', '39', '40', '41', '42'];
  const cores = ['Preto', 'Branco', 'Azul', 'Vermelho'];

  const tamanhoSelect = tamanhos.map(t => `<option value="${t}">${t}</option>`).join('');
  const corSelect = cores.map(c => `<option value="${c}">${c}</option>`).join('');

  card.innerHTML = `
    <img src="${produto.img}" alt="${produto.nome}" />
    <h3>${produto.nome}</h3>
    <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
    <div class="select-container">
      <label>Tamanho:
        <select name="tamanho">
          ${tamanhoSelect}
        </select>
      </label>
      <label>Cor:
        <select name="cor">
          ${corSelect}
        </select>
      </label>
    </div>
    <p>${produto.descricao || 'Sem descrição disponível.'}</p>
    <button onclick="removerItem(${produto.id})">Remover</button>
  `;

  carrinhoContainer.appendChild(card);
}

function removerItem(id) {
  produtos = produtos.filter(p => p.id !== id);
  localStorage.setItem('carrinho', JSON.stringify(produtos));
  document.getElementById(`produto-${id}`).remove();

  const botao = document.getElementById('botao-pagamento');
  if (produtos.length === 0) {
    carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    if (botao) botao.remove();
  }
}

function adicionarBotaoFinalizar() {
  const botao = document.createElement('button');
  botao.textContent = 'Confirmar Pagamento de Todos os Itens';
  botao.id = 'botao-pagamento';
  botao.onclick = () => {
    if (produtos.length > 0) {
      window.location.href = '../pagamento/pagamento.html';
    } else {
      alert('Todos os itens foram confirmados para pagamento!');
    }
  };
  document.body.appendChild(botao);
}

