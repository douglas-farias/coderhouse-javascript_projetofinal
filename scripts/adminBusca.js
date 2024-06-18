import { produtosCadastrados } from "./listaProdutos.js";
import { configurarBusca, buscarProdutos, renderizarResultado, redirecionarBusca, renderizarProdutosPorCategoria } from "./domUtilsAdmin.js";

window.configurarBusca = configurarBusca;
window.buscarProdutos = buscarProdutos;
window.renderizarResultado = renderizarResultado;
window.redirecionarBusca = redirecionarBusca;
window.renderizarProdutosPorCategoria = renderizarProdutosPorCategoria;

const urlParams = new URLSearchParams(window.location.search);
const termosBusca = urlParams.get('busca');

document.getElementById("botaoBuscar").addEventListener("click", function() {
    const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
    redirecionarBusca(termosBusca);
});

if (termosBusca) {
    const resultadosBusca = buscarProdutos(termosBusca, produtosCadastrados);
    renderizarResultado(resultadosBusca, termosBusca);
}

export { renderizarResultado };