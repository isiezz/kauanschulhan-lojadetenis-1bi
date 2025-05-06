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
  
    // Mostra os itens do carrinho
    carrinho.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
      paymentItemsDiv.appendChild(itemDiv);
    });
  
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
        const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
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
  