document.addEventListener('DOMContentLoaded', inicializarFormulario);

// DECLARAÇÃO DaAS PRINCIPAIS CONSTANTES
const formulario = document.getElementsByClassName("conteudo__formulario")[0];

const usuarioNome = document.getElementById("formulario__nome");
const usuariosobreNome = document.getElementById("formulario__sobrenome");
const usuarioEndereco = document.getElementById("formulario__endereco");
const usuarioCEP = document.getElementById("formulario__cep");
const usuarioEmail = document.getElementById("formulario__email");
const senhaInput1 = document.getElementById("formulario__senha");
const senhaInput2 = document.getElementById("formulario__confirmarSenha");

const camposObrigatorios = Array.from(formulario.querySelectorAll("input[required]"));

const senhaAlertaRepetir = document.getElementById("formulario__alertaSenhaRepetir");
const botaoCadastrar = document.getElementById("formulario__botaoCadastrar");

// FUNÇÕES
function inicializarFormulario() {
    camposObrigatorios.forEach(campo => {
        campo.addEventListener("input", validarFormulario);
    });

    document.querySelector(".conteudo__formulario").addEventListener("submit", cadastrarUsuario);
};

function validarFormulario() {
    let formularioPreenchdio = true;
    let senhasRepetidas = senhaInput1.value === senhaInput2.value;

    camposObrigatorios.forEach(campo => {
        if (!campo.value.trim()) {
            formularioPreenchdio = false;
        };
    });

    senhasRepetidas ? senhaAlertaRepetir.innerText = "" : senhaAlertaRepetir.innerText = "As senhas digitadas não coincidem."; 

    (formularioPreenchdio && senhasRepetidas) ? botaoCadastrar.removeAttribute("disabled") : botaoCadastrar.setAttribute("disabled", "disabled");
}

function gerarID() {
    let ultimoID = localStorage.getItem("ultimoID");
    if (ultimoID === null) {
        ultimoID = 0
    } else {
        ultimoID = parseInt(ultimoID, 10);
    };

    const proximoID = ultimoID + 1;
    localStorage.setItem("ultimoID", proximoID);

    return `u-${proximoID.toString().padStart(4,"0")}`;
};

function cadastrarUsuario(evento) {
    evento.preventDefault();

    const usuario = {
        id: gerarID(),
        nome: usuarioNome.value,
        sobrenome: usuariosobreNome.value,
        endereco: usuarioEndereco.value,
        cep: usuarioCEP.value,
        email: usuarioEmail.value,
        senha: senhaInput1.value,
        login: false,
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert('Usuário cadastrado com sucesso!');
    document.querySelector('.conteudo__formulario').reset();
    botaoCadastrar.disabled = true;
}



// IMPLEMETNAÇÃO FUTURA
// function verificarSenha(){
//     let caracMaisuculas = /[A-Z]/;
//     let caracMinusculas = /[a-z]/;
//     let carcacNumericos = /[0-9]/;
//     let caracEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
// };




console.log(camposObrigatorios)