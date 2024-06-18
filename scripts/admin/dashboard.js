import { produtosCadastrados } from "../listaProdutos.js";
import { configurarBusca, buscarProdutos, renderizarResultado, redirecionarBusca, renderizarProdutosPorCategoria } from "./domUtilsAdmin.js";

window.configurarBusca = configurarBusca;
window.buscarProdutos = buscarProdutos;
window.renderizarResultado = renderizarResultado;
window.redirecionarBusca = redirecionarBusca;
window.renderizarProdutosPorCategoria = renderizarProdutosPorCategoria;

document.getElementById("botaoBuscar").addEventListener("click", function() {
    const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
    const resultadosBusca = buscarProdutos(termosBusca, produtosCadastrados);
    renderizarResultado(resultadosBusca, termosBusca);
});

function obterEstatisticas() {
    let estatisticasPorCategoria = [];

    for (let categoria in produtosCadastrados) {
        let totalProdutos = 0;
        let totalEstoque = 0;
        let baixoEstoque = [];

        produtosCadastrados[categoria].forEach(produto => {
            totalProdutos++;
            totalEstoque += produto.estoque;
            if (produto.estoque <= 50) {
                baixoEstoque.push(produto);
            }
        });

        const estoqueMedio = totalEstoque / totalProdutos;

        estatisticasPorCategoria.push({
            categoria: categoria.replace("categoria", ""),
            produtosCadastrados: totalProdutos,
            estoqueMedio: estoqueMedio,
            baixoEstoque: baixoEstoque
        });
    }

    return estatisticasPorCategoria;
};

function atualizarEstatisticas() {
    const estatisticas = obterEstatisticas();

    estatisticas.forEach(estatistica => {
        const categoria = estatistica.categoria.toUpperCase();
        document.getElementById(`categ${categoria}QuantidadeProdutos`).innerText = estatistica.produtosCadastrados;
        document.getElementById(`categ${categoria}MediaEstoque`).innerText = estatistica.estoqueMedio.toFixed(2);

        const baixoEstoqueLista = document.getElementById(`categ${categoria}BaixoEstoque`);
        baixoEstoqueLista.innerHTML = "";
        estatistica.baixoEstoque.forEach(produto => {
            const listItem = document.createElement("li");
            listItem.innerText = `${produto.nome}: ${produto.estoque} unidades`;
            baixoEstoqueLista.appendChild(listItem);
        });
    });
}

document.addEventListener("DOMContentLoaded", atualizarEstatisticas);

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get("categoria");
const busca = urlParams.get("busca");