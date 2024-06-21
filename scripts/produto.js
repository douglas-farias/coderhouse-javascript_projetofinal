import { importarProdutos, atualizarQuantidadeCarrinhoHeader, atualizarUsuarioLogadoHeader, abrirPopupAcesso, fecharPopupAcesso, abrirPopupPerfil, fecharPopupPerfil, login, logout } from "./domUtils.js";

document.addEventListener('DOMContentLoaded', () => {
    importarProdutos();
});

window.atualizarQuantidadeCarrinhoHeader = atualizarQuantidadeCarrinhoHeader;
window.atualizarUsuarioLogadoHeader = atualizarUsuarioLogadoHeader;
window.abrirPopupAcesso = abrirPopupAcesso;
window.fecharPopupAcesso = fecharPopupAcesso;
window.abrirPopupPerfil = abrirPopupPerfil;
window.fecharPopupPerfil = fecharPopupPerfil;
window.fecharPopupContinuar = fecharPopupContinuar;
window.fecharPopupVerCarrinho = fecharPopupVerCarrinho;
window.login = login;
window.logout = logout;

// RENDERIZAÇÃO DO PRODUTO SELECIONADO

function renderizarItem(produto) {
    const tituloHead = document.getElementById("tituloHead");
    tituloHead.innerText = `EC_${produto.nome}`;

    const itemContainer = document.getElementsByClassName("conteudo")[0];

    const sectionBotoes = document.getElementsByClassName("conteudo__botoes")[0];

    const sectionItemImagens = document.createElement("section");
    sectionItemImagens.className = "conteudo__imagens";
    sectionItemImagens.innerHTML = `<figure class="imagens__produto">
                                        <img src="${produto.imagem}" alt="${produto.imagemAlt}">
                                        <img src="${produto.imagem2}" alt="${produto.imagemAlt2}">
                                    </figure>
                                    <!-- <ul class="imagens__relacionados">
                                        <li><img src="${produto.imagem}" alt=""></li>
                                        <li><img src="${produto.imagem}" alt=""></li>
                                        <li><img src="${produto.imagem}" alt=""></li>
                                    </ul> -->`;

    const sectionItemInfos = document.createElement("section");
    sectionItemInfos.className = "conteudo__infos";
    sectionItemInfos.innerHTML = `<div class="infos__principal">
                                        <a href="vitrine.html?categoria=${produto.categoria}">
                                            <h5>CATEGORIA ${produto.categoria}</h5>
                                        </a>
                                        <h1 id="infos__nome">${produto.nome}</h1>
                                        <p id="infos__descricao">${produto.descricao}</p>
                                        <h1 id="infos__preco"> R$&nbsp${produto.precoString}</h1>
                                    </div>`;

    itemContainer.insertBefore(sectionItemInfos, sectionBotoes);
    itemContainer.insertBefore(sectionItemImagens, sectionItemInfos);
};

const urlParams = new URLSearchParams(window.location.search);
const itemID = urlParams.get('id');

const arrayProdCadastrados = JSON.parse(localStorage.getItem("produtosCadastrados")).produtosCadastrados;

let produtoSelecionado = "";
for (const chave in arrayProdCadastrados) {
    const produto = arrayProdCadastrados[chave].find(prod => prod.id === itemID);
    if (produto) {
        produtoSelecionado = produto;
        break;
    }
}

renderizarItem(produtoSelecionado);

// BOTÃO DE QUANTIDADE E VISUALIZADOR DE SUBTOTAL

let opcoesResultadoSubtotal = [];

function calculoSubtotal() {
    let subtotalFloat = (quantidadeItem.innerText * produtoSelecionado.precoFloat).toFixed(2);

    opcoesResultadoSubtotal[0] = subtotalFloat.toString().replace(".", ",");
    opcoesResultadoSubtotal[1] = parseFloat(subtotalFloat);

    return opcoesResultadoSubtotal;
}

let quantidadeItem = document.getElementById("quantidade__qtde");
let quantidadeItemFormatado = parseInt(quantidadeItem.innerText);

let botaoSubtrair1 = document.getElementById("quantidade__subtrair1");
let botaoSomar1 = document.getElementById("quantidade__somar1");

function verficadorQuantidade() {
    if (quantidadeItemFormatado === 1) {
        botaoSubtrair1.setAttribute("disabled", "disabled");
    } else {
        botaoSubtrair1.removeAttribute("disabled");
    }
}

botaoSubtrair1.onclick = () => {
    quantidadeItemFormatado -= 1;
    quantidadeItem.innerText = quantidadeItemFormatado;
    verficadorQuantidade();

    subtotal.innerHTML = `R$&nbsp${calculoSubtotal()[0]}`;
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
    objectItemSelecionado.quantidadeItem = parseInt(quantidadeItem.innerText);

    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;
    let carrinhoTemp = JSON.parse(localStorage.getItem("carrinhoTemp")) || [];

    if (usuarioLogado) {
        let itemExistente = usuarioLogado.carrinho.find(item => item.item.id === objectItemSelecionado.item.id);

        if (itemExistente) {
            itemExistente.quantidadeItem += objectItemSelecionado.quantidadeItem;
        } else {
            usuarioLogado.carrinho.push(objectItemSelecionado);
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    } else {
        let itemExistente = carrinhoTemp.find(item => item.item.id === objectItemSelecionado.item.id);

        if (itemExistente) {
            itemExistente.quantidadeItem += objectItemSelecionado.quantidadeItem;
        } else {
            carrinhoTemp.push(objectItemSelecionado);
        }

        localStorage.setItem("carrinhoTemp", JSON.stringify(carrinhoTemp));
    }

    abrirPopupConclusao();
}

const popupConclusao = document.querySelector(".container__conclusao");

function abrirPopupConclusao() {
    popupConclusao.classList.add("container__conclusao--exibir");
}

function fecharPopupContinuar() {
    popupConclusao.classList.remove("container__conclusao--exibir");
    window.location.href = `vitrine.html?categoria=${produtoSelecionado.categoria}`;
}

function fecharPopupVerCarrinho() {
    popupConclusao.classList.remove("container__conclusao--exibir");
    window.location.href = "carrinho.html";
}