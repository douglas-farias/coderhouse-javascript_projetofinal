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

function carregarProdutos() {
    const produtosJSON = localStorage.getItem("produtosCadastrados");
    return produtosJSON ? JSON.parse(produtosJSON) : { produtosCadastrados: { categoriaA: [], categoriaB: [], categoriaC: [], categoriaD: [] } };
}

function salvarProdutos(produtos) {
    localStorage.setItem("produtosCadastrados", JSON.stringify(produtos));
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemID = urlParams.get('id');
    const produtos = carregarProdutos();
    let produtoSelecionado = null;

    for (const chave in produtos.produtosCadastrados) {
        produtoSelecionado = produtos.produtosCadastrados[chave].find(prod => prod.id === itemID);
        if (produtoSelecionado) {
            break;
        }
    }

    if (produtoSelecionado) {
        renderizarItem(produtoSelecionado, produtos);
    }
});

function renderizarItem(produto, produtos) {
    const tituloHead = document.getElementById("tituloHead");
    tituloHead.innerText = `EC_Edição ${produto.nome}`;

    const itemContainer = document.getElementById("containerFormulario");

    itemContainer.innerHTML = `
        <form id="formProduto" class="formulario">
            <fieldset class="formulario__geral">
                <h3 id="geral__titulo"><legend>GERAL</legend></h3>
                <div id="divId">
                    <label for="id">ID</label>
                    <input type="text" name="id" id="id" placeholder="0000" value="${produto.id}" disabled>
                </div>
                <label for="nome">Nome</label>
                <input type="text" name="nome" id="nome" placeholder="Nome do produto" value="${produto.nome}" required>
                <label for="categoria">Categoria</label>
                <select name="categoria" id="categoria" title="Categoria:" required>
                    <option value="A" ${produto.categoria === 'A' ? 'selected' : ''}>Categoria A</option>
                    <option value="B" ${produto.categoria === 'B' ? 'selected' : ''}>Categoria B</option>
                    <option value="C" ${produto.categoria === 'C' ? 'selected' : ''}>Categoria C</option>
                    <option value="D" ${produto.categoria === 'D' ? 'selected' : ''}>Categoria D</option>
                </select>
                <label for="descricao">Descrição</label>
                <textarea name="descricao" id="descricao" autocapitalize="sentences" minlength="10" maxlength="250" placeholder="Descrição do produto" required>${produto.descricao}</textarea>
            </fieldset>
            <fieldset class="formulario__valor">
                <h3><legend>PREÇO</legend></h3>
                <div class="divPrecos">
                    <div class="preco__container">
                        <label for="precoString">R$</label>
                        <input type="text" name="precoString" id="precoString" placeholder="0,00" value="${produto.precoString}" required>
                    </div>
                    <div class="preco__container">
                        <label for="precoFloat">R$</label>
                        <input type="text" name="precoFloat" id="precoFloat" placeholder="0.00" value="${produto.precoFloat.toFixed(2)}" disabled>
                    </div>
                </div>
            </fieldset>
            <fieldset class="formulario__imagem" id="formularioImagem">
                <h3><legend>IMAGENS</legend></h3>
                <div class="container__imgsPreview">
                    <img src="${produto.imagem}" alt="${produto.imagemAlt}" id="thumbImagem1">
                    <img src="${produto.imagem2}" alt="${produto.imagemAlt2}" id="thumbImagem2">
                </div>
                <div class="container__upload">
                    <div class="container__uploadImg1">
                        <p>IMAGEM 1</p>
                        <div id="uploadImg1">
                            <input id="nomeArquivoImagem1" placeholder="nome-do-arquivo1.png" value="${extrairNomeImagem(produto.imagem)}" disabled>
                            <label for="imagem" id="labelImg1">Alterar imagem 1</label>
                            <input type="file" name="imagem" id="imagem">
                        </div>
                        <label for="imagemAlt">Descrição da imagem</label>
                        <input type="text" name="imagemAlt" id="imagemAlt" placeholder="Breve descrição da imagem" value="${produto.imagemAlt}" required>
                    </div>
                    <div class="container__uploadImg2">
                        <p>IMAGEM 2</p>
                        <div id="uploadImg2">
                            <input id="nomeArquivoImagem2" placeholder="nome-do-arquivo2.png" value="${extrairNomeImagem(produto.imagem2)}" disabled>
                            <label for="imagem2" id="labelImg2">Alterar imagem 2</label>
                            <input type="file" name="imagem2" id="imagem2">
                        </div>
                        <label for="imagemAlt2">Descrição da imagem 2</label>
                        <input type="text" name="imagemAlt2" id="imagemAlt2" placeholder="Breve descrição da imagem 2" value="${produto.imagemAlt2}" required>
                    </div>
                </div>
            </fieldset>
            <fieldset class="formulario__oferta">
                <h3><legend>OFERTA</legend></h3>
                <div class="divOferta">
                    <div class="oferta__input" id="ofertaInput">
                        <p>Produto em oferta?</p>
                        <label for="ofertaFalse">
                            <input type="radio" name="oferta" value="false" id="ofertaFalse" ${!produto.oferta ? 'checked' : ''}>NÃO
                        </label>
                        <label for="ofertaTrue">
                            <input type="radio" name="oferta" value="true" id="ofertaTrue" ${produto.oferta ? 'checked' : ''}>SIM
                        </label>
                    </div>
                    <div class="oferta__preco">
                        <label for="precoComOferta">Novo preço: R$</label>
                        <input type="text" name="precoComOferta" id="precoComOferta" placeholder="0.00" value="${produto.precoComOferta}" ${!produto.oferta ? 'disabled' : ''}>
                    </div>
                </div>
            </fieldset>
            <fieldset class="formulario__novidade">
                <h3><legend>NOVIDADE</legend></h3>
                <div class="novidade__container">
                    <p>O produto é uma novidade?</p>
                    <label>
                        <input type="radio" name="novidade" value="true" ${produto.novidade ? 'checked' : ''}> SIM
                    </label>
                    <label>
                        <input type="radio" name="novidade" value="false" ${!produto.novidade ? 'checked' : ''}> NÃO
                    </label>
                </div>
            </fieldset>
            <fieldset class="formulario__estoque">
                <h3><legend>ESTOQUE</legend></h3>
                <div class="estoque__container">
                    <label for="estoque">Quantidade em estoque:</label>
                    <input type="number" name="estoque" id="estoque" placeholder="Quantidade em estoque" value="${produto.estoque}" required>
                </div>
            </fieldset>
            <div class="formulario__botoesEdicao">
                <button type="submit" class="formulario__botao" id="botaoSalvar">SALVAR EDIÇÃO</button>
                <button type="button" class="formulario__botao" id="botaoExcluir">EXCLUIR PRODUTO</button>
            </div>
        </form>
    `;

    document.getElementById("formProduto").addEventListener("submit", function(event) {
        event.preventDefault();
        atualizarProduto(produto, produtos);
    });

    document.getElementById("botaoExcluir").addEventListener("click", function() {
        let confirmarExclusao;
        do {
            confirmarExclusao = parseInt(prompt(`Deseja excluir ${produto.nome}? Selecione a opção desejada:\n\n   1. Sim\n   2. Não\n\nATENÇÃO: Após a exclusão não será possível recuperar o produto excluído.`));
            
            if (confirmarExclusao === 1) {
                excluirProduto(produto, produtos);
                break;
            } else if (confirmarExclusao === 2) {
                alert("O produto não foi excluído.");
                break;
            } else {
                alert("Opção inválida.");
            }
        } while (confirmarExclusao !== 1 && confirmarExclusao !== 2);
    });
}

function atualizarProduto(produto, produtos) {
    produto.nome = document.getElementById("nome").value;
    produto.categoria = document.getElementById("categoria").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.precoString = document.getElementById("precoString").value;
    produto.precoFloat = parseFloat(document.getElementById("precoString").value.replace(",", "."));
    produto.imagemAlt = document.getElementById("imagemAlt").value;
    produto.imagemAlt2 = document.getElementById("imagemAlt2").value;
    produto.oferta = document.querySelector('input[name="oferta"]:checked').value === "true";
    produto.precoComOferta = document.getElementById("precoComOferta").value;
    produto.novidade = document.querySelector('input[name="novidade"]:checked').value === "true";
    produto.estoque = parseInt(document.getElementById("estoque").value, 10);

    if (document.getElementById("imagem").files[0]) {
        produto.imagem = URL.createObjectURL(document.getElementById("imagem").files[0]);
    } if (document.getElementById("imagem2").files[0]) {
        produto.imagem2 = URL.createObjectURL(document.getElementById("imagem2").files[0]);
    }

    salvarProdutos(produtos);
    alert("Produto atualizado com sucesso!");
    window.location.href = "./dashboard.html";
}

function excluirProduto(produto, produtos) {
    const categoria = `categoria${produto.categoria}`;
    produtos.produtosCadastrados[categoria] = produtos.produtosCadastrados[categoria].filter(p => p.id !== produto.id);

    salvarProdutos(produtos);
    alert("Produto excluído com sucesso!");
    window.location.href = "./dashboard.html";
}

function extrairNomeImagem(caminhoImg) {
    const splitCaminho = caminhoImg.split("/");
    return splitCaminho[splitCaminho.length - 1];
}