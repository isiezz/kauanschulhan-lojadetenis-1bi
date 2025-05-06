// Ao clicar "Adicionar no carrinho"
document.querySelectorAll('.add-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const nome = card.querySelector('h3')?.innerText || `Tênis ${index + 1}`;
    const preco = parseFloat(card.querySelector('.price').innerText.replace('R$', '').replace(',', '.'));
    const img = card.querySelector('img').getAttribute('src');

    const features = Array.from(card.querySelectorAll('.features p')).map(p => p.innerText).join(', ');
    const item = {
      id: index + 1,
      nome,
      preco,
      img, 
      descricao: features
    };

    // Evita duplicatas
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (!carrinho.some(p => p.id === item.id)) {
      carrinho.push(item);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      alert(`${item.nome} adicionado ao carrinho!`);
    } else {
      alert(`${item.nome} já está no carrinho.`);
    }
  });
});