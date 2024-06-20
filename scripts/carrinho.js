import { atualizarQuantidadeCarrinhoHeader, atualizarUsuarioLogadoHeader, abrirPopupAcesso, fecharPopupAcesso, abrirPopupPerfil, fecharPopupPerfil, login, logout } from "./domUtils.js";

window.atualizarQuantidadeCarrinhoHeader = atualizarQuantidadeCarrinhoHeader;
window.atualizarUsuarioLogadoHeader = atualizarUsuarioLogadoHeader;
window.abrirPopupAcesso = abrirPopupAcesso;
window.fecharPopupAcesso = fecharPopupAcesso;
window.abrirPopupPerfil = abrirPopupPerfil;
window.fecharPopupPerfil = fecharPopupPerfil;
window.login = login;
window.logout = logout;

atualizarQuantidadeCarrinhoHeader();

let itensCarrinho = [];
let somaSubtotalItens = 0;
let valorDesconto = 0;

const listaCupons = [
    { codigo: "CUPOM10", valor: 0.1 },
    { codigo: "CUPOM15", valor: 0.15 },
    { codigo: "CUPOM25", valor: 0.25 },
    { codigo: "CUPOM50", valor: 0.5 },
];

let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;

function obterCarrinho() {
    let carrinhoTemp = JSON.parse(localStorage.getItem("carrinhoTemp")) || [];
    itensCarrinho = usuarioLogado ? usuarioLogado.carrinho : carrinhoTemp;
    return itensCarrinho;
}

obterCarrinho();

function salvarCarrinho() {
    if (usuarioLogado) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let indiceUsuario = usuarios.findIndex(u => u.email === usuarioLogado.email);
        usuarios[indiceUsuario].carrinho = itensCarrinho;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    } else {
        localStorage.setItem("carrinhoTemp", JSON.stringify(itensCarrinho));
    }
}

function renderizarCarrinho() {
    const containerLista = document.getElementsByClassName("conteudo__lista")[0];
    containerLista.innerHTML = "";

    if (itensCarrinho.length === 0) {
        const mensagemCarrinhoVazio = document.createElement("div");
        mensagemCarrinhoVazio.id = "lista__carrinhoVazio";
        mensagemCarrinhoVazio.innerHTML = `<h2>ainda não há produtos no seu carrinho.</h2>`;
        containerLista.appendChild(mensagemCarrinhoVazio);
        return;
    }

    somaSubtotalItens = 0;

    itensCarrinho.forEach((item, indice) => {
        const divItem = document.createElement("div");
        divItem.className = "conteudo__item";
        divItem.innerHTML = `
            <div class="item__imagem">
                <img src="${item.item.imagem}" alt="${item.item.imagemAlt}">
            </div>
            <div id="item__info">
                <a href="produto.html?id=${item.item.id}" id="item__nome-link">
                    <h3 class="item__nome">${item.item.nome.toUpperCase()}</h3>
                </a>
                <h3 class="item__categoria">CATEGORIA ${item.item.categoria}</h3>
            </div>
            <h3 class="item__preco">R$&nbsp${item.item.precoString}</h3>
            <div class="item__quantidade">
                <button id="quantidade__subtrair" data-index="${indice}" ${item.quantidadeItem == 1 ? 'disabled' : ''}>-</button>
                <h4 id="quantidade__qtde">${item.quantidadeItem}</h4>
                <button id="quantidade__somar" data-index="${indice}">+</button>
            </div>
            <h3 class="item__subtotal">R$&nbsp${(item.quantidadeItem * item.item.precoFloat).toFixed(2).replace(".", ",")}</h3>
            <button class="quantidade__deletar" data-index="${indice}">
                <img src="../assets/icons/black-bold_fechar.png" alt="Excluir item"></img>
            </button>`;
        
        containerLista.appendChild(divItem);

        somaSubtotalItens += (item.quantidadeItem * item.item.precoFloat);
    });

    document.querySelectorAll("#quantidade__subtrair").forEach(botao => {
        botao.addEventListener("click", function () {
            const indice = this.getAttribute("data-index");
            alterarQuantidade(indice, -1);
            atualizarQuantidadeCarrinhoHeader();
        });
    });

    document.querySelectorAll("#quantidade__somar").forEach(botao => {
        botao.addEventListener("click", function () {
            const indice = this.getAttribute("data-index");
            alterarQuantidade(indice, 1);
            atualizarQuantidadeCarrinhoHeader();
        });
    });

    document.querySelectorAll(".quantidade__deletar").forEach(botao => {
        botao.addEventListener("click", function () {
            const indice = this.getAttribute("data-index");
            removerItem(indice);
            atualizarQuantidadeCarrinhoHeader();
        });
    });

    atualizarSubtotalItens();   
}

function alterarQuantidade(indice, delta) {
    const item = itensCarrinho[indice];
    item.quantidadeItem = Math.max(1, parseInt(item.quantidadeItem) + delta);
    item.subtotal = item.quantidadeItem * item.item.precoFloat;

    salvarCarrinho();
    renderizarCarrinho();
}

function removerItem(indice) {
    itensCarrinho.splice(indice, 1);

    salvarCarrinho();
    renderizarCarrinho();
    atualizarQuantidadeCarrinhoHeader();
    habilitarBotaoFinalizar();
}

function atualizarSubtotalItens() {
    const modificadorHTMLSubtotalItens = document.getElementById("somaValores__valorItens");
    modificadorHTMLSubtotalItens.innerHTML = `R$&nbsp${somaSubtotalItens.toFixed(2).replace(".", ",")}`;
    obterFreteSelecionado();
}

function obterCupomDesconto() {
    const inputCupom = document.getElementById("cupomInserido");
    const descontoHTML = document.getElementById("somaValores__valorDesconto");
    descontoHTML.innerHTML = "";

    valorDesconto = 0;

    const cupom = listaCupons.find((c) => c.codigo === inputCupom.value);

    if (cupom) {
        valorDesconto = parseFloat(cupom.valor * somaSubtotalItens);
        descontoHTML.innerHTML = `- R$&nbsp${valorDesconto.toFixed(2).replace(".", ",")}`
    } else {
        inputCupom.value = "CÓDIGO INVÁLIDO";
        descontoHTML.innerHTML = `R$&nbsp0,00`;
    }

    obterFreteSelecionado();
}

function calcularDataEntrega(opcaoFrete, elementoPrevisao) {
    const dataAtual = new Date();

    const diasFrete = {
        padrao: { min: 10, max: 15 },
        expressa: { min: 3, max: 5 }
    };

    const dataEntregaMin = new Date(dataAtual);
    dataEntregaMin.setDate(dataAtual.getDate() + diasFrete[opcaoFrete].min);

    const dataEntregaMax = new Date(dataAtual);
    dataEntregaMax.setDate(dataAtual.getDate() + diasFrete[opcaoFrete].max);

    const formatoData = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        return `${dia}/${mes}`;
    };

    const dataEntregaMinFormatada = formatoData(dataEntregaMin);
    const dataEntregaMaxFormatada = formatoData(dataEntregaMax);

    elementoPrevisao.innerHTML = `${dataEntregaMinFormatada} a ${dataEntregaMaxFormatada}.`;
}

function obterFreteSelecionado() {
    const freteSelecionado = document.querySelector('input[name="opcaoFrete"]:checked');
    const subtotalFrete = document.getElementById("somaValores__valorFrete");

    let valorFrete = 0;
    if (freteSelecionado) {
        valorFrete = parseFloat(freteSelecionado.value);
        subtotalFrete.innerHTML = `R$&nbsp${valorFrete.toFixed(2).replace(".", ",")}`;
    } else {
        subtotalFrete.innerHTML = `R$&nbsp0,00`;
    }

    const previsaoEntrega = document.getElementById("previsaoEntrega");
    if (freteSelecionado) {
        calcularDataEntrega(freteSelecionado.id === "fretePadrao" ? "padrao" : "expressa", previsaoEntrega);
        atualizarTotalCompra(valorFrete);
    } else {
        calcularDataEntrega("padrao", previsaoEntrega);
        atualizarTotalCompra(0);
    }

    habilitarBotaoFinalizar();
}

function preencherEndereco() {
    const usuarioEndereco = document.querySelectorAll("h4.endereco__dados");
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    let dadosEndereco = document.getElementById("dadosEndereco");
    let dadosComplemento = document.getElementById("dadosComplemento");
    let dadosCep = document.getElementById("dadosCep");

    if (usuarioLogado) {
        dadosEndereco.innerText = usuarioLogado.endereco;
        dadosComplemento.innerText = usuarioLogado.complemento;
        dadosCep.innerText = usuarioLogado.cep;
    } else {
        usuarioEndereco.innterText = "";
    }
}

function atualizarTotalCompra(valorFrete) {
    const totalCompra = somaSubtotalItens + valorFrete - valorDesconto;
    const modificadorHTMLTotalCompra = document.getElementById("somaValores__valorTotal");
    modificadorHTMLTotalCompra.innerHTML = `R$&nbsp${totalCompra.toFixed(2).replace(".", ",")}`;
}

document.querySelectorAll('input[name="opcaoFrete"]').forEach(radio => {
    radio.addEventListener("change", obterFreteSelecionado);
});

document.getElementById("limparCarrinho").addEventListener("click", function () {
    localStorage.removeItem("carrinhoTemp");
    if (usuarioLogado) {
        usuarioLogado.carrinho = [];
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    }
    obterCarrinho();
    renderizarCarrinho();
    habilitarBotaoFinalizar();
});

document.getElementById("inserirCupom").addEventListener("click", function () {
    obterCupomDesconto();
});

function habilitarBotaoFinalizar() {
    const botaoFinalizarCompra = document.getElementById("finalizarCompra");
    const freteSelecionado = document.querySelector('input[name="opcaoFrete"]:checked');
    (itensCarrinho.length === 0 || !freteSelecionado) ? botaoFinalizarCompra.setAttribute("disabled", "disabled") : botaoFinalizarCompra.removeAttribute("disabled");
}

const popupConclusao = document.querySelector(".container__conclusao");

function abrirPopupConclusao() {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (usuarioLogado) {
        popupConclusao.classList.add("container__conclusao--exibir");

        usuarioLogado.carrinho = [];
        
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let indiceUsuario = usuarios.findIndex(u => u.email === usuarioLogado.email);
        usuarios[indiceUsuario] = usuarioLogado;
        
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        const freteSelecionado = document.querySelector('input[name="opcaoFrete"]:checked');
        const elementoPrevisaoConclusao = document.getElementById("previsaoEntregaConclusao");
        if (freteSelecionado) {
            calcularDataEntrega(freteSelecionado.id === "fretePadrao" ? "padrao" : "expressa", elementoPrevisaoConclusao);
        } else {
            calcularDataEntrega("padrao", elementoPrevisaoConclusao);
        }
    } else {
        abrirPopupAcesso();
    }
}

function fecharPopupConclusao() {
    popupConclusao.classList.remove("container__conclusao--exibir");
    window.location.href = "/index.html";
}

renderizarCarrinho();
preencherEndereco();
habilitarBotaoFinalizar();

document.querySelectorAll('input[name="opcaoFrete"]').forEach(radio => {
    radio.addEventListener("change", function() {
        calcularDataEntrega(this.value);
    });
});

window.abrirPopupConclusao = abrirPopupConclusao;
window.fecharPopupConclusao = fecharPopupConclusao;

export { itensCarrinho };