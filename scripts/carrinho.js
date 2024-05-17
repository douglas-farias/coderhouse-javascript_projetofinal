let itensCarrinho = [];

function obterCarrinho() {

    for (let i = 0; i < localStorage.length; i++) {
        let chave = localStorage.key(i);

        if (chave.startsWith("produto_")) {
            const itemString = localStorage.getItem(chave);
            const item = JSON.parse(itemString);
            itensCarrinho.push(item);
        }
    }

    return itensCarrinho;
};

obterCarrinho()

function renderizarCarrinho() {

    const containerLista = document.getElementsByClassName("conteudo__lista")[0];
    containerLista.innerHTML = "";    
    
    itensCarrinho.forEach(item => {
        const divItem = document.createElement("div");
        divItem.className = "conteudo__item"
        divItem.innerHTML = `<div class="item__imagem">
                                <img src="${item.item.imagem}" alt="${item.item.imagemAlt}">
                            </div>

                            <div>
                                <h3 id="item__nome">${item.item.nome}</h3>
                                <h3 id="item__preco">R$&nbsp${item.item.precoString}</h3>
                            </div>

                            <div class="item__quantidade">
                                <button id="quantidade__subtrair${item.item.id}">-</button>
                                <h4 id="quantidade__qtde${item.item.id}">${item.quantidadeItem}</h4>
                                <button id="quantidade__somar${item.item.id}">+</button>
                                <button id="quantidade__deletar${item.item.id}">Remover</button>
                            </div>


                            <div>
                                <h3 class="item_subtotal${item.item.id}">R$&nbsp${item.subtotalString}</h3>
                            </div>`

        containerLista.appendChild(divItem)
    });
}

renderizarCarrinho()