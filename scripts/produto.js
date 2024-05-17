import { produtosCadastrados } from "./listaProdutos.js";

function renderizarItem(produto) {
    const itemContainer = document.getElementsByClassName("conteudo")[0];

    const sectionBotoes = document.getElementsByClassName("conteudo__botoes")[0];

    const sectionItemImagens = document.createElement("section");
    sectionItemImagens.className = "conteudo__imagens";
    sectionItemImagens.innerHTML = `<div class="imagens__produto">
                                        <img src="${produto.imagem}" alt="${produto.imagemAlt}">
                                    </div>
                                    <!-- <div class="imagens__relacionados">
                                        <img src="" alt="">
                                        <img src="" alt="">
                                        <img src="" alt="">
                                    </div> -->`;

    const sectionItemInfos = document.createElement("section");
    sectionItemInfos.className = "conteudo__infos";
    sectionItemInfos.innerHTML = `<div class="infos__principal">
                                        <span>
                                            <h5>Categoria</h5>
                                        </span>
                                        <h1 id="infos__nome">${produto.nome}</h1>
                                        <p>${produto.descricao}</p>
                                        <h1 id="infos__preco"> R$ ${produto.precoString}</h1>
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
    verficadorQuantidade()
};

botaoSomar1.onclick = () => {
    quantidadeItemFormatado += 1;
    quantidadeItem.innerText = quantidadeItemFormatado;
    verficadorQuantidade()
};