import { renderizarProdutos } from './vitrine.js';
import { produtosCadastrados } from "./listaProdutos.js";
import { importarProdutos, atualizarUsuarioLogadoHeader, abrirPopupAcesso, fecharPopupAcesso, abrirPopupPerfil, fecharPopupPerfil, login, logout, atualizarQuantidadeCarrinhoHeader } from "./domUtils.js";

document.addEventListener('DOMContentLoaded', () => {
    importarProdutos();
});

window.atualizarQuantidadeCarrinhoHeader = atualizarQuantidadeCarrinhoHeader;
window.atualizarUsuarioLogadoHeader = atualizarUsuarioLogadoHeader;
window.abrirPopupAcesso = abrirPopupAcesso;
window.fecharPopupAcesso = fecharPopupAcesso;
window.abrirPopupPerfil = abrirPopupPerfil;
window.fecharPopupPerfil = fecharPopupPerfil;
window.login = login;
window.logout = logout;

function realizarBuscaProdutos() {
    const termosBusca = document.getElementById('buscaProdutos').value.toLowerCase();
    window.location.href = `./pages/vitrine.html?busca=${termosBusca}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector(".feed__slider");
    const sliderContainer = document.querySelector(".slider__imagens");
    const slides = document.querySelectorAll(".slider__imagens li");
    const indicators = document.querySelectorAll(".slider__indicadores li");
    const totalSlides = slides.length;

    let slideAtual = 0;

    function atualizarIndicadores() {
        indicators.forEach((indicator, index) => {
            if (index === slideAtual) {
                indicator.classList.add('ativo');
            } else {
                indicator.classList.remove('ativo');
            }
        });
    }

    function moverSlider() {
        slideAtual++;
        if (slideAtual >= totalSlides) {
            slideAtual = 0;
        }
        const offset = -slideAtual * slider.offsetWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
        atualizarIndicadores();
    }

    setInterval(moverSlider, 3000);

    window.addEventListener('resize', () => {
        const offset = -slideAtual * slider.offsetWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
    });

    const botaoAnterior = document.getElementById("slider__botaoAnterior");
    const botaoProximo = document.getElementById("slider__botaoProximo");

    botaoAnterior.addEventListener('click', () => {
        slideAtual--;
        if (slideAtual < 0) {
            slideAtual = totalSlides - 1;
        }
        const offset = -slideAtual * slider.offsetWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
        atualizarIndicadores();
    });

    botaoProximo.addEventListener('click', () => {
        slideAtual++;
        if (slideAtual >= totalSlides) {
            slideAtual = 0;
        }
        const offset = -slideAtual * slider.offsetWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
        atualizarIndicadores();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            slideAtual = index;
            const offset = -slideAtual * slider.offsetWidth;
            sliderContainer.style.transform = `translateX(${offset}px)`;
            atualizarIndicadores();
        });
    });

    atualizarIndicadores();

    document.getElementById('botaoBuscar').addEventListener('click', realizarBuscaProdutos);

    const buscaProdutosInput = document.getElementById("buscaProdutos");
    if (buscaProdutosInput) {
        buscaProdutosInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                realizarBuscaProdutos();
            }
        });
    }
});

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