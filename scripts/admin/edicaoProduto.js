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

function renderizarItem(produto) {
    const tituloHead = document.getElementById("tituloHead");
    tituloHead.innerText = `EC_Edição ${produto.nome}`;

    const itemContainer = document.getElementsByClassName("container__formulario")[0];

    // Convertendo precoString para precoFloat
    const precoFloat = parseFloat(produto.precoString.replace(",", "."));

    itemContainer.innerHTML = `
        <form id="formProduto" action="">
            <h3>Informações gerais</h3>
            <label for="id">ID:</label>
            <input type="text" name="id" id="id" placeholder="0000" value="${produto.id}" disabled>
            <label for="nome">Nome:</label>
            <input type="text" name="nome" id="nome" placeholder="Nome do produto" value="${produto.nome}" required>
            <label for="categoria">Categoria:</label>
            <select name="categoria" id="categoria" required>
                <option value="A" ${produto.categoria === 'A' ? 'selected' : ''}>Categoria A</option>
                <option value="B" ${produto.categoria === 'B' ? 'selected' : ''}>Categoria B</option>
                <option value="C" ${produto.categoria === 'C' ? 'selected' : ''}>Categoria C</option>
                <option value="D" ${produto.categoria === 'D' ? 'selected' : ''}>Categoria D</option>
            </select>
            <label for="descricao">Descrição:</label>
            <textarea name="descricao" id="descricao" autocapitalize="sentences" minlength="10" maxlength="250" placeholder="Descrição do produto" required>${produto.descricao}</textarea>
            <h3>Valor</h3>
            <label for="precoString">R$</label>
            <input type="text" name="precoString" id="precoString" placeholder="Valor do produto" value="${produto.precoString}" required>
            <label for="precoFloat">R$</label>
            <input type="text" name="precoFloat" id="precoFloat" placeholder="Valor do produto" value="${precoFloat.toFixed(2)}" disabled>
            <h3>Imagem</h3>
            <label for="imagem">Imagem principal</label>
            <img id="imagemAtual" src="${produto.imagem}" alt="${produto.imagemAlt}" style="max-width: 200px; display: block; margin-bottom: 10px;">
            <input type="file" name="imagem" id="imagem" placeholder="Imagem do produto">
            <label for="imagemAlt">Descrição da imagem</label>
            <input type="text" name="imagemAlt" id="imagemAlt" placeholder="Breve descrição da imagem" value="${produto.imagemAlt}" required>
            <h3>Desconto</h3>
            <h4>O produto possui desconto?</h4>
            <label>
                <input type="radio" name="oferta" value="true" ${produto.oferta ? 'checked' : ''}> POSSUI desconto
            </label>
            <label>
                <input type="radio" name="oferta" value="false" ${!produto.oferta ? 'checked' : ''}> NÃO POSSUI desconto
            </label>
            <h4>Insira o novo valor do produto:</h4>
            <label for="precoComOferta">R$</label>
            <input type="text" name="precoComOferta" id="precoComOferta" placeholder="Valor do produto com desconto" disabled>
            <h3>Novidade</h3>
            <h4>O produto é uma novidade?</h4>
            <label>
                <input type="radio" name="novidade" value="true" ${produto.novidade ? 'checked' : ''}> Sim
            </label>
            <label>
                <input type="radio" name="novidade" value="false" ${!produto.novidade ? 'checked' : ''}> Não
            </label>
            <h3>Estoque</h3>
            <label for="estoque">Quantidade em estoque:</label>
            <input type="number" name="estoque" id="estoque" placeholder="Quantidade em estoque" value="${produto.estoque}" required>
            <h3>Finalizar</h3>
            <button>
                <input type="submit" value="Salvar edições">
            </button>
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
