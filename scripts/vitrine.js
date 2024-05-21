import { produtosCadastrados } from "./listaProdutos.js";

function renderizarProdutos(filtro, valor) {
    const tituloHead = document.getElementById("tituloHead");

    const tituloFiltro = document.getElementById("conteudo__titulo");
    tituloFiltro.innerText = "";

    const container = document.getElementsByClassName("conteudo__vitrine")[0];
    container.innerHTML = "";

    let produtosFiltrados = [];

    if (filtro === "categoria") {
        tituloFiltro.innerText = `CATEGORIA ${valor.charAt(valor.length - 1).toUpperCase()}`;
        produtosFiltrados = produtosCadastrados[valor];
        tituloHead.innerText = `EC_Categoria ${valor.charAt(valor.length - 1).toUpperCase()}`
    } else if (filtro === "novidades") {
        tituloFiltro.innerText = "Novidades";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.novidade);
        tituloHead.innerText = `EC_Novidades`;
    } else if (filtro === "ofertas") {
        tituloFiltro.innerText = "Ofertas";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.oferta);
        tituloHead.innerText = `EC_Ofertas`;
    }

    produtosFiltrados.forEach(produto => {
        const divProduto = document.createElement("div");
        divProduto.className = "conteudo__produto";
        divProduto.id = `prodtuo__${produto.id}`;

        divProduto.innerHTML = `<figure class="produto__imagem">
                                    <a href="produto.html?id=${produto.id}">
                                        <img src="${produto.imagem}" alt="${produto.imagemAlt}">
                                    </a>
                                </figure>
                                <div>
                                    <h4>${produto.nome}</h4>
                                    <span id="precoProduto${produto.id}">R$ ${produto.precoString}</span>
                                </div>`;

        container.appendChild(divProduto)
    });
};

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');
const filtro = urlParams.get('filtro');

if (categoria) {
    renderizarProdutos('categoria', categoria);
} else if (filtro) {
    renderizarProdutos(filtro);
};

export { renderizarProdutos }