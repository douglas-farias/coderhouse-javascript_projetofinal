let itensCarrinho = [];

function obterCarrinho() {
    itensCarrinho = [];

    for (let i = 0; i < localStorage.length; i++) {
        let chave = localStorage.key(i);
        if (chave.startsWith("produto_")) {
            const itemString = localStorage.getItem(chave);
            const item = JSON.parse(itemString);
            itensCarrinho.push(item);
        }
    }
    return itensCarrinho;
}

obterCarrinho();

function renderizarCarrinho() {
    const containerLista = document.getElementsByClassName("conteudo__lista")[0];
    containerLista.innerHTML = "";
}

    if (itensCarrinho.length === 0) {
        const mensagemCarrinhoVazio = document.createElement("div");
        mensagemCarrinhoVazio.id = "lista__carrinhoVazio";
        mensagemCarrinhoVazio.innerHTML = `<h2>Ainda não há produtos no seu carrinho.</h2>`;
        containerLista.appendChild(mensagemCarrinhoVazio);
        return;
    } else {itensCarrinho.forEach((item, index) => {
                const divItem = document.createElement("div");
                divItem.className = "conteudo__item";
                divItem.innerHTML = `
                    <div class="item__imagem">
                        <img src="${item.item.imagem}" alt="${item.item.imagemAlt}">
                    </div>
                    <div>
                        <h3 class="item__nome">${item.item.nome}</h3>
                        <h3 class="item__preco">R$&nbsp${item.item.precoString}</h3>
                    </div>
                    <div class="item__quantidade">
                        <button class="quantidade__subtrair" data-index="${index}" ${item.quantidadeItem == 1 ? 'disabled' : ''}>-</button>
                        <h4 class="quantidade__qtde">${item.quantidadeItem}</h4>
                        <button class="quantidade__somar" data-index="${index}">+</button>
                        <button class="quantidade__deletar" data-index="${index}">Remover</button>
                    </div>
                    <div>
                        <h3 class="item__subtotal">R$&nbsp${(item.quantidadeItem * item.item.precoFloat).toFixed(2).replace(".", ",")}</h3>
                    </div>`;
                
                containerLista.appendChild(divItem);
            });

        // Adiciona event listeners aos botões de quantidade
        document.querySelectorAll('.quantidade__subtrair').forEach(botao => {
            botao.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                alterarQuantidade(index, -1);
            });
        });

        document.querySelectorAll('.quantidade__somar').forEach(botao => {
            botao.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                alterarQuantidade(index, 1);
            });
        });

        document.querySelectorAll('.quantidade__deletar').forEach(botao => {
            botao.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                removerItem(index);
            });
        });
    }
}

function alterarQuantidade(index, delta) {
    const item = itensCarrinho[index];
    item.quantidadeItem = Math.max(1, parseInt(item.quantidadeItem) + delta); // Garante que a quantidade mínima seja 1
    item.subtotal = item.quantidadeItem * item.item.precoFloat;

    // Atualiza o localStorage
    localStorage.setItem(`produto_${item.item.id}`, JSON.stringify(item));

    // Re-renderiza o carrinho
    renderizarCarrinho();
}

function removerItem(index) {
    const item = itensCarrinho[index];
    localStorage.removeItem(`produto_${item.item.id}`);
    itensCarrinho.splice(index, 1);
    renderizarCarrinho();
}

renderizarCarrinho();
