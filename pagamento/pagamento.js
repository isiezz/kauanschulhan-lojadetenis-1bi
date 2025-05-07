// pagamento.js

// pagamento.js

document.addEventListener('DOMContentLoaded', () => {
  const paymentItemsDiv = document.getElementById('payment-items');
  const trocoField = document.getElementById('troco-field');
  const paymentForm = document.getElementById('payment-form');
  const mensagemFinal = document.getElementById('mensagem-final');

  // Carrega os itens do carrinho do localStorage
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    paymentItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    paymentForm.style.display = 'none';
    return;
  }

  // Mostra os itens do carrinho e calcula total
  let total = 0;
  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${item.nome} - Tamanho ${item.tamanho} - Cor ${item.cor} - ${item.quantidade} und. - Subtotal: R$ ${subtotal.toFixed(2)}`;
    paymentItemsDiv.appendChild(itemDiv);
  });

  // Mostra o total geral
  const totalDiv = document.createElement('div');
  totalDiv.style.marginTop = '20px';
  totalDiv.style.fontWeight = 'bold';
  totalDiv.style.fontSize = '18px';
  totalDiv.style.color = '#2c3e50';
  totalDiv.textContent = `Total a pagar: R$ ${total.toFixed(2)}`;
  paymentItemsDiv.appendChild(totalDiv);

  // Mostra/esconde campo de troco
  const radios = document.querySelectorAll('input[name="payment-method"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'dinheiro') {
        trocoField.style.display = 'block';
      } else {
        trocoField.style.display = 'none';
        document.getElementById('troco').value = '';
      }
    });
  });

  // Submissão do formulário
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const metodoPagamento = document.querySelector('input[name="payment-method"]:checked').value;

    if (metodoPagamento === 'dinheiro') {
      const troco = document.getElementById('troco').value;
      if (troco === '' || Number(troco) < total) {
        alert(`Por favor, informe um valor de troco maior ou igual a R$ ${total.toFixed(2)}`);
        return;
      }
    }

    // Simula finalização do pagamento
    mensagemFinal.textContent = 'Pagamento realizado com sucesso! Obrigado pela sua compra.';
    paymentForm.style.display = 'none';
    localStorage.removeItem('carrinho');
  });
});

