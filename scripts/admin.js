import { produtosCadastrados } from "./listaProdutos.js";
import { buscarProdutos } from "./domUtils.js";

const conteudoTitulo = document.getElementById("conteudo__titulo");

document.getElementById("botaoBuscar").addEventListener("click", function() {
    const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
    const resultadosBusca = buscarProdutos(termosBusca, produtosCadastrados);
    renderizarResultado(resultadosBusca, termosBusca);
});


function renderizarResultado(resultados, termosBusca) {
    const conteudoContainer = document.getElementById("conteudoContainer");
    conteudoTitulo.innerHTML = "";
    conteudoContainer.innerHTML = "";

    conteudoTitulo.innerHTML = `BUSCA: ${termosBusca.toUpperCase()}`;

    resultados.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.imagemAlt}">
            <h2>${produto.nome}</h2>
            <p>Preço: ${produto.precoString}</p>
            <p>Estoque: ${produto.estoque}</p>
        `;
        conteudoContainer.appendChild(produtoDiv);
    });
}

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

window.buscarProdutos = buscarProdutos;