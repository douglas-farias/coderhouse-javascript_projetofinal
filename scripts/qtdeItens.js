function obterSomaQuantidades() {
    let somaQuantidades = 0;

    for (let i = 0; i < localStorage.length; i++) {
        let chave = localStorage.key(i);
        if (chave.startsWith("produto_")) {
            const itemString = localStorage.getItem(chave);
            const item = JSON.parse(itemString);
            somaQuantidades += parseInt(item.quantidadeItem);
        }
    }

    return somaQuantidades;
}

const somaQuantidades = obterSomaQuantidades();

function quantidadeCarrinhoHeader() {
    let quantidadeCarrinho = document.getElementById("quantidadeCarrinho");
    if (quantidadeCarrinho) {
        quantidadeCarrinho.innerHTML = somaQuantidades;
    }
}

document.addEventListener('DOMContentLoaded', quantidadeCarrinhoHeader);

export { somaQuantidades, quantidadeCarrinhoHeader };