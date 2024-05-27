import { renderizarProdutos } from './vitrine.js';
import { atualizarUsuarioLogadoHeader, atualizarQuantidadeCarrinhoHeader, abrirPopupAcesso, fecharPopupAcesso, abrirPopupPerfil, fecharPopupPerfil, login, logout } from "./domUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');
const filtro = urlParams.get('filtro');

if (categoria) {
    renderizarProdutos('categoria', categoria);
} else if (filtro) {
    renderizarProdutos(filtro);
}

window.atualizarUsuarioLogadoHeader = atualizarUsuarioLogadoHeader;
window.atualizarQuantidadeCarrinhoHeader = atualizarQuantidadeCarrinhoHeader;
window.abrirPopupAcesso = abrirPopupAcesso;
window.fecharPopupAcesso = fecharPopupAcesso;
window.abrirPopupPerfil = abrirPopupPerfil;
window.fecharPopupPerfil = fecharPopupPerfil;
window.login = login;
window.logout = logout;