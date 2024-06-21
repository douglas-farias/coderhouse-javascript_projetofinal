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

document.getElementById("botaoBuscar").addEventListener("click", function() {
    const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
    const resultadosBusca = buscarProdutos(termosBusca, arrayProdCadastrados);
    renderizarResultado(resultadosBusca, termosBusca);
});

const arrayProdCadastrados = JSON.parse(localStorage.getItem("produtosCadastrados")).produtosCadastrados;

function carregarProdutos() {
    const produtosJSON = localStorage.getItem("produtosCadastrados");
    return produtosJSON ? JSON.parse(produtosJSON) : { produtosCadastrados: { categoriaA: [], categoriaB: [], categoriaC: [], categoriaD: [] } };
}

function salvarProdutos(produtos) {
    localStorage.setItem("produtosCadastrados", JSON.stringify(produtos));
}

function gerarNovoId(produtosCadastrados) {
    let maiorId = 0;
    for (let categoria in produtosCadastrados) {
        produtosCadastrados[categoria].forEach(produto => {
            const idNumerico = parseInt(produto.id, 10);
            if (idNumerico > maiorId) {
                maiorId = idNumerico;
            }
        });
    }
    return (maiorId + 1).toString().padStart(4, '0');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("formularioProduto").addEventListener("submit", adicionarProduto);
});

function adicionarProduto(event) {
    event.preventDefault();

    const produtos = carregarProdutos();
    const categoria = document.getElementById("categoria").value;

    const novoProduto = {
        id: gerarNovoId(produtos.produtosCadastrados),
        nome: document.getElementById("nome").value,
        categoria: categoria,
        descricao: document.getElementById("descricao").value,
        precoString: document.getElementById("precoString").value,
        precoFloat: parseFloat(document.getElementById("precoString").value.replace(",", ".")),
        imagem: document.getElementById("imagem").files[0] ? URL.createObjectURL(document.getElementById("imagem").files[0]) : "",
        imagemAlt: document.getElementById("imagemAlt").value,
        imagem2: document.getElementById("imagem2").files[0] ? URL.createObjectURL(document.getElementById("imagem2").files[0]) : "",
        imagemAlt2: document.getElementById("imagemAlt2").value,
        oferta: document.querySelector('input[name="oferta"]:checked').value === "true",
        precoComOferta: document.getElementById("precoComOferta").value,
        novidade: document.querySelector('input[name="novidade"]:checked').value === "true",
        estoque: parseInt(document.getElementById("estoque").value, 10)
    };

    produtos.produtosCadastrados[`categoria${categoria}`].push(novoProduto);
    salvarProdutos(produtos);

    alert("Produto cadastrado com sucesso!");
    window.location.reload();
}
