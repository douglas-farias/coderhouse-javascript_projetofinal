import { importarProdutos } from "../domUtils.js";
import { configurarBusca, buscarProdutos, renderizarResultado, redirecionarBusca, renderizarProdutosPorCategoria } from "./domUtilsAdmin.js";

document.addEventListener('DOMContentLoaded', () => {
    importarProdutos();
    configurarBusca();
});

window.buscarProdutos = buscarProdutos;
window.renderizarResultado = renderizarResultado;
window.redirecionarBusca = redirecionarBusca;
window.renderizarProdutosPorCategoria = renderizarProdutosPorCategoria;

const arrayProdCadastrados = JSON.parse(localStorage.getItem("produtosCadastrados")).produtosCadastrados;

document.getElementById("botaoBuscar").addEventListener("click", function() {
    const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
    const resultadosBusca = buscarProdutos(termosBusca, arrayProdCadastrados);
    renderizarResultado(resultadosBusca, termosBusca);
});

function obterEstatisticas() {
    let estatisticasPorCategoria = [];

    for (let categoria in arrayProdCadastrados) {
        let totalProdutos = 0;
        let totalEstoque = 0;
        let baixoEstoque = [];

        arrayProdCadastrados[categoria].forEach(produto => {
            totalProdutos++;
            totalEstoque += produto.estoque;
            if (produto.estoque <= 50) {
                baixoEstoque.push(produto);
            }
        });

        const estoqueMedio = totalEstoque / totalProdutos;

        estatisticasPorCategoria.push({
            categoria: categoria.replace("categoria", ""),
            arrayProdCadastrados: totalProdutos,
            estoqueMedio: estoqueMedio,
            baixoEstoque: baixoEstoque
        });
    }

    return estatisticasPorCategoria;
}

function atualizarEstatisticas() {
    const estatisticas = obterEstatisticas();

    estatisticas.forEach(estatistica => {
        const categoria = estatistica.categoria.toUpperCase();
        document.getElementById(`categ${categoria}QuantidadeProdutos`).innerText = estatistica.arrayProdCadastrados;
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

if (categoria) {
    renderizarProdutosPorCategoria(categoria, arrayProdCadastrados);
} else if (busca) {
    const resultadosBusca = buscarProdutos(busca, arrayProdCadastrados);
    renderizarResultado(resultadosBusca, busca);
}