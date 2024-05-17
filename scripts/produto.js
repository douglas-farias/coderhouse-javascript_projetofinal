import { produtosCadastrados } from "./listaProdutos.js";

function renderizarItem(produto) {
    const itemImagens = document.getElementsByClassName("conteudo__imagens")[0];
    itemImagens.innerHTML = "";

    const itemInfos = document.getElementsByClassName("conteudo__infos")[0];
    itemInfos.innerHTML = "";

    const sectionItemImagens = document.createElement("section");
    sectionItemImagens.className = "imagens__produto";
    sectionItemImagens.innerHTML = `<div class="imagens__produto">
                                        <img src="${produto.imagem}" alt="${produto.imagemAlt}">
                                    </div>
                                    <!-- <div class="imagens__relacionados">
                                        <img src="" alt="">
                                        <img src="" alt="">
                                        <img src="" alt="">
                                    </div> -->`;

    const sectionItemInfos = document.createElement("section");
    sectionItemInfos.className = "infos__principal";
    sectionItemInfos.innerHTML = `<div class="infos__principal">
                                        <span>
                                            <h5>Categoria</h5>
                                        </span>
                                        <h1 id="infos__nome">${produto.nome}</h1>
                                        <p>${produto.descricao}</p>
                                        <h1 id="infos__preco"> R$ ${produto.precoString}</h1>
                                    </div>
                                    <div class="infos__quantidade">
                                        <button id="quantidade__menos">-</button>
                                        <h4 id="quantidade__valor">1</h4>
                                        <button id="quantidade__mais">+</button>
                                    </div>
                                    <div class="infos_botoes">
                                        <button class="botoes__comprarAgora">Comprar Agora</button>
                                        <button class="botoes__adicionarCarrinho">Adicionar ao Carrinho</button>
                                    </div>`;

    itemImagens.appendChild(sectionItemImagens);

    itemInfos.appendChild(sectionItemInfos);
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
    
renderizarItem(produtoSelecionado)