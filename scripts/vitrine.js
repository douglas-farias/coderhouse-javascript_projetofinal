import { produtosCadastrados } from "./listaProdutos.js";

function renderizarProdutos(filtro, valor) {
    const tituloFiltro = document.getElementById("conteudo__titulo");
    tituloFiltro.innerText = "";

    const container = document.getElementsByClassName("conteudo__vitrine");
    container.innerHTML = "";

    let produtosFiltrados = [];

    if (filtro === "categoria") {
        tituloFiltro.innerText = `Categoria ${valor.charAt(valor.length - 1).toUpperCase()}`;
        produtosFiltrados = produtos[valor];
    } else if (filtro === "novidades") {
        tituloFiltro.innerText = "Novidades";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.novidade);
    } else if (filtro === "ofertas") {
        tituloFiltro.innerText = "Ofertas";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.oferta);
    }
}