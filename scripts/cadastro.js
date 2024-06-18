document.addEventListener('DOMContentLoaded', inicializarFormulario);

// DECLARAÇÃO DAS PRINCIPAIS CONSTANTES
const formulario = document.getElementsByClassName("conteudo__formulario")[0];

const usuarioNome = document.getElementById("formulario__nome");
const usuarioSobrenome = document.getElementById("formulario__sobrenome");
const usuarioCEP = document.getElementById("formulario__cep");
const usuarioLogradouro = document.getElementById("formulario__logradouro");
const usuarioNumero = document.getElementById("formulario__numero");
const usuarioComplemento = document.getElementById("formulario__complemento");
const usuarioBairro = document.getElementById("formulario__bairro");
const usuarioCidadeUf = document.getElementById("formulario__cidadeUf");
const usuarioEmail = document.getElementById("formulario__email");
const senhaInput1 = document.getElementById("formulario__senha");
const senhaInput2 = document.getElementById("formulario__confirmarSenha");

const camposObrigatorios = Array.from(formulario.querySelectorAll("input[required]"));

const senhaAlertaRepetir = document.getElementById("formulario__alertaSenhaRepetir");
const emailAltertaRepetido = document.getElementById("formulario__alertaEmailRepetido");
const botaoCadastrar = document.getElementById("formulario__botaoCadastrar");

// FUNÇÕES
const preencherEndereco = (resultadoBusca) => {
    usuarioLogradouro.value = resultadoBusca.logradouro;
    usuarioBairro.value = resultadoBusca.bairro;
    usuarioCidadeUf.value = `${resultadoBusca.localidade}, ${resultadoBusca.uf}`;
};

const buscarCep = async () => {
    const url = `http://viacep.com.br/ws/${usuarioCEP.value}/json/`;
    const promisseViaCep = await fetch(url);
    const resultadoBusca = await promisseViaCep.json();
    preencherEndereco(resultadoBusca);
};

usuarioCEP.addEventListener("focusout", buscarCep);

function inicializarFormulario() {
    camposObrigatorios.forEach(campo => {
        campo.addEventListener("input", validarFormulario);
    });

    document.querySelector(".conteudo__formulario").addEventListener("submit", cadastrarUsuario);
};

function validarFormulario() {
    let emailInserido = usuarioEmail.value;

    let usuariosJSON = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioEncontrado = usuariosJSON.find(usuario => usuario.email === emailInserido);

    if (usuariosJSON) {
        !usuarioEncontrado ? emailAltertaRepetido.innerText = "" : emailAltertaRepetido.innerText = "Email já cadastrado.";
    };

    let formularioPreenchido = true;
    let senhasRepetidas = senhaInput1.value === senhaInput2.value;

    camposObrigatorios.forEach(campo => {
        if (!campo.value.trim()) {
            formularioPreenchido = false;
        }
    });

    senhasRepetidas ? senhaAlertaRepetir.innerText = "" : senhaAlertaRepetir.innerText = "As senhas digitadas não coincidem."; 

    (formularioPreenchido && !usuarioEncontrado && senhasRepetidas) ? botaoCadastrar.removeAttribute("disabled") : botaoCadastrar.setAttribute("disabled", "disabled");
};

function gerarID() {
    let ultimoID = localStorage.getItem("ultimoID");
    if (ultimoID === null) {
        ultimoID = 0
    } else {
        ultimoID = parseInt(ultimoID, 10);
    }

    const proximoID = ultimoID + 1;
    localStorage.setItem("ultimoID", proximoID);

    return `u${proximoID.toString().padStart(4,"0")}`;
};

function cadastrarUsuario(evento) {
    evento.preventDefault();

    let carrinhoUsuario = [];

    const usuario = {
        id: gerarID(),
        nome: usuarioNome.value,
        sobrenome: usuarioSobrenome.value,
        cep: usuarioCEP.value,
        endereco: `${usuarioLogradouro.value}, ${usuarioNumero.value}`,
        complemento: usuarioComplemento.value.trim() || "-",
        bairro: usuarioBairro.value,
        cidadeUF: usuarioCidadeUf.value,
        email: usuarioEmail.value,
        senha: senhaInput1.value,
        login: true,
        carrinho: carrinhoUsuario,
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    abrirPopupConclusao();
    document.querySelector(".conteudo__formulario").reset();
    botaoCadastrar.disabled = true;
};

const popupConclusao = document.querySelector(".container__conclusao");

function abrirPopupConclusao() {
    popupConclusao.classList.add("container__conclusao--exibir");
};

function fecharPopupConclusao() {
    popupConclusao.classList.remove("container__conclusao--exibir");
    window.location.href = "../../index.html";
};

function abrirAcessoAdmin() {
    let pedidoUsuarioAdmin = prompt("Insira o usuário do administrador:");

    if (pedidoUsuarioAdmin === "admin") {
        let pedidoSenhaAdmin = prompt("Insira a senha do administrador:");
        pedidoSenhaAdmin === "admin" ? window.location.href = "./admin/dashboard.html" : alert("Senha inválida. Acesso negado.");
    } else {
        alert("Usuário inválido. Acesso negado.")
    };
};

window.cadastrarUsuario = cadastrarUsuario;
window.fecharPopupConclusao = fecharPopupConclusao;
window.abrirAcessoAdmin = abrirAcessoAdmin;