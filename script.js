let totalCarrinho = 0;

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(nomeProduto, preco) {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const itemCarrinho = document.createElement('li');
    itemCarrinho.textContent = `${nomeProduto} - R$${preco.toFixed(2)}`;
    listaCarrinho.appendChild(itemCarrinho);
    
    totalCarrinho += preco;
    document.getElementById('total-carrinho').innerText = totalCarrinho.toFixed(2);
    
    // Calcular frete
    calcularFrete();
}

// Função para calcular o frete
function calcularFrete() {
    const frete = totalCarrinho >= 60 ? 0 : 4; // Frete grátis acima de R$60
    document.getElementById('frete').innerText = frete.toFixed(2);
    
    const valorFinal = totalCarrinho + frete;
    document.getElementById('valor-final').innerText = valorFinal.toFixed(2);
}

// Função para finalizar a compra
function finalizarCompra() {
    const formEntrega = document.createElement('div');
    formEntrega.innerHTML = `
        <h3>Formulário de Entrega</h3>
        <input type="text" id="nome" placeholder="Nome" required>
        <input type="text" id="bairro" placeholder="Bairro" required>
        <input type="text" id="numero" placeholder="Número" required>
        <input type="text" id="rua" placeholder="Rua" required>
        <input type="text" id="referencia" placeholder="Referência">
        <select id="pagamento" onchange="verificarPagamento()">
            <option value="">Selecione Método de Pagamento</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">PIX</option>
            <option value="cartao">Cartão</option>
        </select>
        <div id="troco" style="display:none;">
            <p>Valor Pago: R$ <input type="number" id="valorPago" placeholder="Valor Pago"></p>
            <p>Troco: R$ <span id="trocoValor">0,00</span></p>
        </div>
        <button onclick="enviarPedido()">Enviar Pedido</button>
    `;
    document.body.appendChild(formEntrega);
}

// Função para verificar o método de pagamento
function verificarPagamento() {
    const pagamento = document.getElementById('pagamento').value;
    const trocoDiv = document.getElementById('troco');
    if (pagamento === 'dinheiro') {
        trocoDiv.style.display = 'block';
    } else {
        trocoDiv.style.display = 'none';
    }
}

// Função para enviar pedido
function enviarPedido() {
    const nome = document.getElementById('nome').value;
    const bairro = document.getElementById('bairro').value;
    const numero = document.getElementById('numero').value;
    const rua = document.getElementById('rua').value;
    const referencia = document.getElementById('referencia').value;
    const pagamento = document.getElementById('pagamento').value;
    let mensagemWhatsApp = `Pedido:\n\nNome: ${nome}\nBairro: ${bairro}\nNúmero: ${numero}\nRua: ${rua}\nReferência: ${referencia}\n\n`;

    if (pagamento === 'dinheiro') {
        const valorPago = parseFloat(document.getElementById('valorPago').value);
        const troco = valorPago - totalCarrinho;
        mensagemWhatsApp += `Pagamento: Dinheiro\nValor Pago: R$ ${valorPago.toFixed(2)}\nTroco: R$ ${troco.toFixed(2)}\n`;
    } else if (pagamento === 'pix') {
        mensagemWhatsApp += `Pagamento: PIX\nChave PIX: 27997294468\n`;
    } else if (pagamento === 'cartao') {
        mensagemWhatsApp += `Pagamento: Cartão\n`;
    }

    mensagemWhatsApp += `Total: R$ ${totalCarrinho.toFixed(2)}`;

    // Redireciona para o WhatsApp com a mensagem do pedido
    const urlWhatsApp = `https://wa.me/27997294468?text=${encodeURIComponent(mensagemWhatsApp)}`;
    window.open(urlWhatsApp, '_blank'); // Abre o WhatsApp em uma nova aba

    // Reseta o carrinho e o formulário
    totalCarrinho = 0;
    document.getElementById('lista-carrinho').innerHTML = '';
    document.getElementById('total-carrinho').innerText = '0,00';
    document.getElementById('frete').innerText = '4,00';
    document.getElementById('valor-final').innerText = '4,00';
    alert('Pedido enviado com sucesso!'); // Notificação de sucesso
}