import { produtosCadastrados } from "./listaProdutos.js";
import { configurarBusca, buscarProdutos, renderizarResultado, redirecionarBusca, renderizarProdutosPorCategoria } from "./domUtilsAdmin.js";

window.configurarBusca = configurarBusca;
window.buscarProdutos = buscarProdutos;
window.renderizarResultado = renderizarResultado;
window.redirecionarBusca = redirecionarBusca;
window.renderizarProdutosPorCategoria = renderizarProdutosPorCategoria;

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');
const busca = urlParams.get('busca');

document.getElementById("botaoBuscar").addEventListener("click", function() {
    const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
    redirecionarBusca(termosBusca);
});

if (categoria) {
    renderizarProdutosPorCategoria(categoria, produtosCadastrados);
} else if (busca) {
    const resultadosBusca = buscarProdutos(busca, produtosCadastrados);
    renderizarResultado(resultadosBusca, busca);
}

export { renderizarProdutosPorCategoria };