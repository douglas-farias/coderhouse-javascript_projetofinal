import { produtosCadastrados } from "./listaProdutos.js";

function renderizarProdutos(filtro, valor) {
    const tituloFiltro = document.getElementById("conteudo__titulo");
    tituloFiltro.innerText = "";

    const container = document.getElementsByClassName("conteudo__vitrine")[0];
    container.innerHTML = "";

    let produtosFiltrados = [];

    if (filtro === "categoria") {
        tituloFiltro.innerText = `Categoria ${valor.charAt(valor.length - 1).toUpperCase()}`;
        produtosFiltrados = produtosCadastrados[valor];
    } else if (filtro === "novidades") {
        tituloFiltro.innerText = "Novidades";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.novidade);
    } else if (filtro === "ofertas") {
        tituloFiltro.innerText = "Ofertas";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.oferta);
    }

    produtosFiltrados.forEach(produto => {
        const divProduto = document.createElement("div");
        divProduto.className = "conteudo__produto";
        divProduto.id = `prodtuo__${produto.id}`;

        divProduto.innerHTML = `<a href="produto.html?id=${produto.id}">
                                    <img src="${produto.imagem}" alt="${produto.imagemAlt}">
                                </a>
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