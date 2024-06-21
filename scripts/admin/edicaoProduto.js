import { produtosCadastrados } from "../listaProdutos.js";
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
    const resultadosBusca = buscarProdutos(termosBusca, produtosCadastrados);
    renderizarResultado(resultadosBusca, termosBusca);
});

function extrairNomeImagem(caminhoImg) {
    const splitCaminho = caminhoImg.split("/");
    return splitCaminho[splitCaminho.length - 1];
}

function renderizarItem(produto) {
    const tituloHead = document.getElementById("tituloHead");
    tituloHead.innerText = `EC_Edição ${produto.nome}`;

    const nomeImg1 = extrairNomeImagem(produto.imagem);
    const nomeImg2 = extrairNomeImagem(produto.imagem2);

    const itemContainer = document.getElementsByClassName("container__formulario")[0];

    const precoFloat = parseFloat(produto.precoString.replace(",", ".")).toFixed(2);

    itemContainer.innerHTML = `
        <form action="" class="formulario">
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
                        <input type="text" name="precoFloat" id="precoFloat" placeholder="0.00" value="${precoFloat}" disabled>
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
                            <input id="nomeArquivoImagem1" placeholder="nome-do-arquivo1.png" value="${nomeImg1}" disabled>
                            <label for="imagem" id="labelImg1">Alterar imagem 1</label>
                            <input type="file" name="imagem" id="imagem"required>
                        </div>
                        <label for="imagemAlt">Descição da imagem</label>
                        <input type="text" name="imagemAlt" id="imagemAlt" placeholder="Breve descição da imagem" value="${produto.imagemAlt}" required>
                    </div>
                    <div class="container__uploadImg2">
                        <p>IMAGEM 2</p>
                        <div id="uploadImg2">
                            <input id="nomeArquivoImagem1" placeholder="nome-do-arquivo2.png" value="${nomeImg2}" disabled>
                            <label for="imagem2" id="labelImg2">Alterar imagem 2</label>
                            <input type="file" name="imagem2" id="imagem2"required>
                        </div>
                        <label for="imagemAlt2">Descição da imagem 2</label>
                        <input type="text" name="imagemAlt2" id="imagemAlt2" placeholder="Breve descição da imagem 2" value="${produto.imagemAlt2}" required>
                    </div>
                </div>
            </fieldset>
            <fieldset class="formulario__oferta">
                <h3><legend>OFERTA</legend></h3>
                <div class="divOferta">
                    <div class="oferta__input" id="ofertaInput">
                        <p>Produto em oferta?</p>                             
                        <label for="ofertaFalse">
                            <input type="radio" name="oferta" value="false" id="ofertaFalse" ${!produto.novidade ? 'checked' : ''}>NÃO
                        </label>
                        <label for="ofertaTrue">
                            <input type="radio" name="oferta" value="true" id="ofertaTrue" ${produto.oferta ? 'checked' : ''}>SIM
                        </label>
                    </div>
                    <div class="oferta__preco">
                        <label for="precoComOferta">Novo preço: R$</label>
                        <input type="text" name="precoComOferta" id="precoComOferta" placeholder="0.00" disabled>
                    </div>
                </div>
            </fieldset>
            <fieldset class="formulario__novidade">
                <h3><legend>NOVIDADE</legend></h3>
                <div class="novidade__container">
                    <p>O produto é uma novidade?</p>
                    <label>
                        <input type="radio" name="novidade" value="true" id="novidade" ${produto.novidade ? 'checked' : ''}> SIM
                    </label>
                    <label>
                        <input type="radio" name="novidade" value="false" id="novidade" ${!produto.novidade ? 'checked' : ''}> NÃO
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
            <button type="submit" class="formulario__botao">SALVAR EDIÇÃO</button>
        </form>
    `;

    const formProduto = document.getElementById("formProduto");
    const inputImagem = document.getElementById("imagem");
    const imagemAtual = document.getElementById("imagemAtual");

    inputImagem.addEventListener("change", function(event) {
        const arquivo = event.target.files[0];
        if (arquivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagemAtual.src = e.target.result;
                produto.imagem = e.target.result;
            };
            reader.readAsDataURL(arquivo);
        }
    });

    formProduto.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Produto atualizado:", produto);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const itemID = urlParams.get('id');

let produtoSelecionado = "";
for (const chave in produtosCadastrados) {
    const produto = produtosCadastrados[chave].find(prod => prod.id === itemID);
    if (produto) {
        produtoSelecionado = produto;
        break;
    }
}

renderizarItem(produtoSelecionado);