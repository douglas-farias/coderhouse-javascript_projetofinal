import { importarProdutos } from "../domUtils.js";
import { configurarBusca, filtrarProdutos } from "./domUtilsAdmin.js";

document.addEventListener('DOMContentLoaded', () => {
    importarProdutos();
});

const arrayProdCadastrados = JSON.parse(localStorage.getItem("produtosCadastrados")).produtosCadastrados;

configurarBusca();

const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get("categoria");
const busca = urlParams.get("busca");
const filtro = urlParams.get("filtro");

let tipoFiltro = "";
let valorFiltro = "";

if (categoria) {
    tipoFiltro = "categoria";
    valorFiltro = categoria;
} else if (busca) {
    tipoFiltro = "busca";
    valorFiltro = busca;
} else if (filtro) {
    tipoFiltro = filtro;
    valorFiltro = filtro;
}

filtrarProdutos(tipoFiltro, valorFiltro, arrayProdCadastrados);

export { filtrarProdutos };