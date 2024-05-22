// RENDERIZAÇÃO DO PRODUTO SELECIONADO

import { produtosCadastrados } from "./listaProdutos.js";

function renderizarItem(produto) {
    const tituloHead = document.getElementById("tituloHead");
    tituloHead.innerText = `EC_${produto.nome}`;

    const itemContainer = document.getElementsByClassName("conteudo")[0];

    const sectionBotoes = document.getElementsByClassName("conteudo__botoes")[0];

    const sectionItemImagens = document.createElement("section");
    sectionItemImagens.className = "conteudo__imagens";
    sectionItemImagens.innerHTML = `<figure class="imagens__produto">
                                        <img src="${produto.imagem}" alt="${produto.imagemAlt}">
                                    </figure>
                                    <ul class="imagens__relacionados">
                                        <li><img src="${produto.imagem}" alt=""></li>
                                        <li><img src="${produto.imagem}" alt=""></li>
                                        <li><img src="${produto.imagem}" alt=""></li>
                                    </ul>`;

    const sectionItemInfos = document.createElement("section");
    sectionItemInfos.className = "conteudo__infos";
    sectionItemInfos.innerHTML = `<div class="infos__principal">
                                        <span>
                                            <h5>${produto.categoria}</h5>
                                        </span>
                                        <h1 id="infos__nome">${produto.nome}</h1>
                                        <p id="infos__descricao">${produto.descricao}</p>
                                        <h1 id="infos__preco"> R$&nbsp${produto.precoString}</h1>
                                    </div>`;

    itemContainer.insertBefore(sectionItemInfos, sectionBotoes);
    itemContainer.insertBefore(sectionItemImagens, sectionItemInfos);
};

const urlParams = new URLSearchParams(window.location.search);
const itemID = urlParams.get('id');

let produtoSelecionado = "";
    for (const chave in produtosCadastrados) {
        const produto = produtosCadastrados[chave].find(prod => prod.id === itemID);
        if (produto) {
            produtoSelecionado = produto;
            break;
        }
    }
    
renderizarItem(produtoSelecionado);

    // BOTÃO DE QUANTIDADE E VISUALIZADOR DE SUBTOTAL

    let opcoesResultadoSubtotal = [];

    function calculoSubtotal() {
        let subtotalFloat = (quantidadeItem.innerText * produtoSelecionado.precoFloat).toFixed(2)

        opcoesResultadoSubtotal[0] = subtotalFloat.toString().replace(".",",");
        opcoesResultadoSubtotal[1] = parseFloat(subtotalFloat);

        return opcoesResultadoSubtotal;
    }

let quantidadeItem = document.getElementById("quantidade__qtde");
let quantidadeItemFormatado = parseInt(quantidadeItem.innerText);

let botaoSubtrair1 = document.getElementById("quantidade__subtrair1");
let botaoSomar1 = document.getElementById("quantidade__somar1");

function verficadorQuantidade(){
    if (quantidadeItemFormatado === 1 ) {
        botaoSubtrair1.setAttribute("disabled", "disabled");
    } else {
        botaoSubtrair1.removeAttribute("disabled");
    };
}

botaoSubtrair1.onclick = () => {
    quantidadeItemFormatado -= 1;
    quantidadeItem.innerText = quantidadeItemFormatado;
    verficadorQuantidade();

    subtotal.innerHTML = `R$&nbsp${calculoSubtotal()[0]}`
};

botaoSomar1.onclick = () => {
    quantidadeItemFormatado += 1;
    quantidadeItem.innerText = quantidadeItemFormatado;
    verficadorQuantidade();

    subtotal.innerHTML = `R$&nbsp${calculoSubtotal()[0]}`;
};

const subtotal = document.getElementById("envio__subtotal");
subtotal.innerHTML = `R$&nbsp${calculoSubtotal()[0]}`;

// BOTÕES DE ENVIO PARA CARRINHO

const botaoAdicionarCarrinho = document.getElementById("envio__adicionarCarrinho");

const objectItemSelecionado = {
    item: produtoSelecionado,
};

botaoAdicionarCarrinho.onclick = () => {
    objectItemSelecionado.quantidadeItem = quantidadeItem.innerText;

    const itemJSON = JSON.stringify(objectItemSelecionado);

    localStorage.setItem(`produto_${produtoSelecionado.id}`, itemJSON);
}