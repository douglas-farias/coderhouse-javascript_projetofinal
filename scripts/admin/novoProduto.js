import { importarProdutos } from "../domUtils.js";
import { configurarBusca, buscarProdutos, renderizarResultado, redirecionarBusca, renderizarProdutosPorCategoria } from "./domUtilsAdmin.js";

document.addEventListener('DOMContentLoaded', () => {
    importarProdutos();
});

window.configurarBusca = configurarBusca;
window.buscarProdutos = buscarProdutos;
window.renderizarResultado = renderizarResultado;
window.redirecionarBusca = redirecionarBusca;
window.renderizarProdutosPorCategoria = renderizarProdutosPorCategoria;

document.getElementById("botaoBuscar").addEventListener("click", function() {
    const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
    const resultadosBusca = buscarProdutos(termosBusca, arrayProdCadastrados);
    renderizarResultado(resultadosBusca, termosBusca);
});

const arrayProdCadastrados = JSON.parse(localStorage.getItem("produtosCadastrados")).produtosCadastrados;