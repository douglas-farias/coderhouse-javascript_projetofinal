import { somaQuantidades } from "./qtdeItens.js";
import { abrirPopupAcesso, fecharPopupAcesso } from "./popupAcesso.js";

function quantidadeCarrinhoHeader() {
    let quantidadeCarrinho = document.getElementById("quantidadeCarrinho");
    quantidadeCarrinho.innerHTML = somaQuantidades;
}

let itensCarrinho = [];
let somaSubtotalItens = 0;
let valorDesconto = 0;

const listaCupons = [
    { codigo: "CUPOM10", valor: 0.1 },
    { codigo: "CUPOM15", valor: 0.15 },
    { codigo: "CUPOM25", valor: 0.25 },
    { codigo: "CUPOM50", valor: 0.5 },
];

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

    if (itensCarrinho.length === 0) {
        const mensagemCarrinhoVazio = document.createElement("div");
        mensagemCarrinhoVazio.id = "lista__carrinhoVazio";
        mensagemCarrinhoVazio.innerHTML = `<h2>ainda não há produtos no seu carrinho.</h2>`;
        containerLista.appendChild(mensagemCarrinhoVazio);
        return;
    }

    somaSubtotalItens = 0;

    itensCarrinho.forEach((item, indice) => {
        const divItem = document.createElement("div");
        divItem.className = "conteudo__item";
        divItem.innerHTML = `
            <div class="item__imagem">
                <img src="${item.item.imagem}" alt="${item.item.imagemAlt}">
            </div>
            <div id="item__info">
                <a href="produto.html?id=${item.item.id}" id="item__nome-link">
                    <h3 class="item__nome">${item.item.nome.toUpperCase()}</h3>
                </a>
                <h3 class="item__categoria">CATEGORIA ${item.item.categoria}</h3>
            </div>
            <h3 class="item__preco">R$&nbsp${item.item.precoString}</h3>
            <div class="item__quantidade">
                <button id="quantidade__subtrair" data-index="${indice}" ${item.quantidadeItem == 1 ? 'disabled' : ''}>-</button>
                <h4 id="quantidade__qtde">${item.quantidadeItem}</h4>
                <button id="quantidade__somar" data-index="${indice}">+</button>
            </div>
            <h3 class="item__subtotal">R$&nbsp${(item.quantidadeItem * item.item.precoFloat).toFixed(2).replace(".", ",")}</h3>
            <button class="quantidade__deletar" data-index="${indice}">
                <img src="../icons/black-bold_fechar.png" alt="Excluir item"></img>
            </button>`;
        
        containerLista.appendChild(divItem);

        somaSubtotalItens += (item.quantidadeItem * item.item.precoFloat);
    });

    document.querySelectorAll("#quantidade__subtrair").forEach(botao => {
        botao.addEventListener('click', function () {
            const indice = this.getAttribute('data-index');
            alterarQuantidade(indice, -1);
        });
    });

    document.querySelectorAll("#quantidade__somar").forEach(botao => {
        botao.addEventListener('click', function () {
            const indice = this.getAttribute('data-index');
            alterarQuantidade(indice, 1);
        });
    });

    document.querySelectorAll(".quantidade__deletar").forEach(botao => {
        botao.addEventListener('click', function () {
            const indice = this.getAttribute('data-index');
            removerItem(indice);
        });
    });

    atualizarSubtotalItens();
    quantidadeCarrinhoHeader();
}

function alterarQuantidade(indice, delta) {
    const item = itensCarrinho[indice];
    item.quantidadeItem = Math.max(1, parseInt(item.quantidadeItem) + delta);
    item.subtotal = item.quantidadeItem * item.item.precoFloat;

    localStorage.setItem(`produto_${item.item.id}`, JSON.stringify(item));

    renderizarCarrinho();
}

function removerItem(indice) {
    const item = itensCarrinho[indice];
    localStorage.removeItem(`produto_${item.item.id}`);
    itensCarrinho.splice(indice, 1);
    renderizarCarrinho();
}

function atualizarSubtotalItens() {
    const modificadorHTMLSubtotalItens = document.getElementById("somaValores__valorItens");
    modificadorHTMLSubtotalItens.innerHTML = `R$&nbsp${somaSubtotalItens.toFixed(2).replace(".", ",")}`;
    obterFreteSelecionado();
}

function obterCumpomDesconto() {
    const inputCupom = document.getElementById("cupomInserido");
    const descontoHTML = document.getElementById("somaValores__valorDesconto");
    descontoHTML.innerHTML = "";

    valorDesconto = 0;

    const cupom = listaCupons.find((c) => c.codigo === inputCupom.value);

    if (cupom) {
        valorDesconto = parseFloat(cupom.valor * somaSubtotalItens);
        descontoHTML.innerHTML = `- R$&nbsp${valorDesconto.toFixed(2).replace(".", ",")}`
    } else {
        inputCupom.value = "CÓDIGO INVÁLIDO";
        descontoHTML.innerHTML = `R$&nbsp0,00`;
    };

    obterFreteSelecionado();
};

function obterFreteSelecionado() {
    const freteSelecionado = document.querySelector('input[name="opcaoFrete"]:checked');
    const subtotalFrete = document.getElementById("somaValores__valorFrete");

    let valorFrete = 0;
    if (freteSelecionado) {
        valorFrete = parseFloat(freteSelecionado.value);
        subtotalFrete.innerHTML = `R$&nbsp${valorFrete.toFixed(2).replace(".", ",")}`;
    } else {
        subtotalFrete.innerHTML = `R$&nbsp0,00`;
    }

    atualizarTotalCompra(valorFrete);
}

function atualizarTotalCompra(valorFrete) {
    const totalCompra = somaSubtotalItens + valorFrete - valorDesconto;
    const modificadorHTMLTotalCompra = document.getElementById("somaValores__valorTotal");
    modificadorHTMLTotalCompra.innerHTML = `R$&nbsp${totalCompra.toFixed(2).replace(".", ",")}`;
}

document.querySelectorAll('input[name="opcaoFrete"]').forEach(radio => {
    radio.addEventListener("change", obterFreteSelecionado);
});

document.getElementById("limparCarrinho").addEventListener("click", function () {
    localStorage.clear();
    obterCarrinho();
    renderizarCarrinho();
});

document.getElementById("inserirCupom").addEventListener("click", function () {
    obterCumpomDesconto();
})

renderizarCarrinho();

window.abrirPopupAcesso = abrirPopupAcesso;
window.fecharPopupAcesso = fecharPopupAcesso;

export { itensCarrinho };