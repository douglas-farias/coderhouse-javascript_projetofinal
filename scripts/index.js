import { renderizarProdutos } from './vitrine.js';

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');
const filtro = urlParams.get('filtro');

if (categoria) {
    renderizarProdutos('categoria', categoria);
} else if (filtro) {
    renderizarProdutos(filtro);
}