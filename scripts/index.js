import { renderizarProdutos } from './vitrine.js';
import { somaQuantidades } from "./qtdeItens.js";
import { abrirPopupAcesso, fecharPopupAcesso } from "./popupAcesso.js";

function quantidadeCarrinhoHeader() {
    let quantidadeCarrinho = document.getElementById("quantidadeCarrinho");
    quantidadeCarrinho.innerHTML = somaQuantidades;
}

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');
const filtro = urlParams.get('filtro');

if (categoria) {
    renderizarProdutos('categoria', categoria);
} else if (filtro) {
    renderizarProdutos(filtro);
}

quantidadeCarrinhoHeader()

window.abrirPopupAcesso = abrirPopupAcesso;
window.fecharPopupAcesso = fecharPopupAcesso;