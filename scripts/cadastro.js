function gerarID() {
    let ultimoID = localStorage.getItem("ultimoID");
    if (ultimoID === null) {
        ultimoID = 0
    } else {
        ultimoID = parseInt(ultimoID, 10);
    };

    const proximoID = ultimoID + 1;
    localStorage.setItem("ultimoID", proximoID);

    return `usuario-${proximoID.toString().padStart(4,"0")}`
};

const usuario = {
    id: gerarID(),
    nome: document.getElementById("formulario_nome"),
    sobrenome: document.getElementById("formulario_sobrenome"),
    endereco: document.getElementById("formulario_endereco"),
    cep: document.getElementById("formulario_ceo"),
    email: document.getElementById("formulario_email"),
    senha: document.getElementById("formulario_senha"),
};

// IMPLEMETNAÇÃO FUTURA
// function verificarSenha(){
//     let caracMaisuculas = /[A-Z]/;
//     let caracMinusculas = /[a-z]/;
//     let carcacNumericos = /[0-9]/;
//     let caracEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
// };

const formulario = document.getElementsByClassName("conteudo__formulario")[0];
const camposObrigatorios = formulario.querySelectorAll("input[required]");
const senhaInput1 = document.getElementById("formulario_senha")
const senhaInput2 = document.getElementById("formulario_confirmarSenha")

console.log(camposObrigatorios)

camposObrigatorios.value != "" ? console.log("ok") : console.log("nao")

const botaoCadastrar = document.getElementById("formulario_botaoCadastrar");

function confirmarSenha() {
    const alertaRepetirSenha = document.getElementById("alertaRepetirSenha");

    if (senhaInput1 === senhaInput2) {
        botaoCadastrar.removeAttribute("disabled");
    } else {
        botaoCadastrar.setAttribute("disabled", "disabled");
        alertaRepetirSenha.innerText = "As senhas digitadas não coincidem."
    };
};

confirmarSenha()