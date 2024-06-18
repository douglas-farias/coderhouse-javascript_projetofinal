import { produtosCadastrados } from "./listaProdutos.js";
import { atualizarQuantidadeCarrinhoHeader, atualizarUsuarioLogadoHeader, abrirPopupAcesso, fecharPopupAcesso, abrirPopupPerfil, fecharPopupPerfil, login, logout, buscarProdutos } from "./domUtils.js";

window.atualizarQuantidadeCarrinhoHeader = atualizarQuantidadeCarrinhoHeader;
window.atualizarUsuarioLogadoHeader = atualizarUsuarioLogadoHeader;
window.abrirPopupAcesso = abrirPopupAcesso;
window.fecharPopupAcesso = fecharPopupAcesso;
window.abrirPopupPerfil = abrirPopupPerfil;
window.fecharPopupPerfil = fecharPopupPerfil;
window.login = login;
window.logout = logout;

function renderizarProdutos(filtro, valor) {
    const tituloFiltro = document.getElementById("conteudo__titulo");
    const container = document.querySelector(".conteudo__vitrine");

    container.innerHTML = "";

    let produtosFiltrados = [];

    if (filtro === "categoria") {
        tituloFiltro.innerText = `CATEGORIA ${valor.toUpperCase()}`;
        produtosFiltrados = produtosCadastrados[`categoria${valor}`];
    } else if (filtro === "novidades") {
        tituloFiltro.innerText = "NOVIDADES";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.novidade);
    } else if (filtro === "ofertas") {
        tituloFiltro.innerText = "OFERTAS";
        produtosFiltrados = Object.values(produtosCadastrados).flat().filter(produto => produto.oferta);
    } else if (filtro === "busca") {
        tituloFiltro.innerText = `BUSCA: ${valor.toUpperCase()}`;
        produtosFiltrados = buscarProdutos(valor, produtosCadastrados);
    }

    if (produtosFiltrados.length === 0) {
        container.innerHTML = "<p>Não foram encontrados resultados.</p>";
        return;
    }

    produtosFiltrados.forEach(produto => {
        const divProduto = document.createElement("div");
        divProduto.className = "conteudo__produto";
        divProduto.id = `produto__${produto.id}`;

        divProduto.innerHTML = `<figure class="produto__imagem">
                                    <a href="produto.html?id=${produto.id}">
                                        <img src="${produto.imagem}" alt="${produto.imagemAlt}">
                                    </a>
                                </figure>
                                <div>
                                    <h4>${produto.nome}</h4>
                                    <span>R$ ${produto.precoString}</span>
                                </div>`;

        container.appendChild(divProduto);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');
const filtro = urlParams.get('filtro');
const busca = urlParams.get('busca');

if (categoria) {
    renderizarProdutos('categoria', categoria);
} else if (filtro) {
    renderizarProdutos(filtro);
} else if (busca) {
    renderizarProdutos('busca', busca);
}

const buscaProdutosInput = document.getElementById("buscaProdutos");
if (buscaProdutosInput) {
    buscaProdutosInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const termosBusca = buscaProdutosInput.value.toLowerCase();
            if (termosBusca.trim() === "") {
                alert("Por favor, insira um termo de busca.");
            } else {
                window.location.href = `vitrine.html?busca=${termosBusca}`;
            }
        }
    });
}

export { renderizarProdutos };