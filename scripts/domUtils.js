export function atualizarQuantidadeCarrinhoHeader() {
    let somaQuantidades = 0;

    for (let i = 0; i < localStorage.length; i++) {
        let chave = localStorage.key(i);
        if (chave.startsWith("produto_")) {
            const itemString = localStorage.getItem(chave);
            const item = JSON.parse(itemString);
            somaQuantidades += parseInt(item.quantidadeItem);
        }
    }

    let quantidadeCarrinho = document.getElementById("quantidadeCarrinho");
    if (quantidadeCarrinho) {
        quantidadeCarrinho.innerHTML = somaQuantidades;
    }
};

export function atualizarUsuarioLogadoHeader() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const menuSupUsuario = document.querySelector(".menu-sup__usuario");

    if (usuarioLogado) {
        menuSupUsuario.innerHTML=`
        <li><button onclick="abrirPopupPerfil()">Perfil</button></li>
            <li><a href="/assets/pages/carrinho.html">Carrinho</a></li>
            <li id="quantidadeCarrinho">0</li>
        `;
    } else {
        menuSupUsuario.innerHTML=`
            <li><button onclick="abrirPopupAcesso()">Entrar</button></li>
            <li><a href="/assets/pages/carrinho.html">Carrinho</a></li>
            <li id="quantidadeCarrinho">0</li>
        `;
    }
};

export function abrirPopupAcesso() {
    const popupAcesso = document.querySelector(".container__acesso");
    popupAcesso.innerHTML = `
        <div class="acesso__planoDeFundo">
            <div class="acesso__popUp">
                <div class="acesso__login">
                    <h2>E_COMMERCE</h2>
                    <form action="">
                        <input type="text" id="loginEmail" placeholder="email">
                        <input type="password" id="loginSenha" placeholder="senha">
                        <h6 id="acesso__alertaDadosInvalidos"></h6>
                    </form>
                    <button onclick="login()">ENTRAR</button>
                </div>
                <div class="acesso__cadastro">
                    <figure>
                        <img src="" alt="Imagem de Cadastro">
                    </figure>
                    <a href="/assets/pages/cadastro.html">
                        <button>CADASTRAR-SE</button>
                    </a>
                </div>
            </div>
            <button class="popUp__fechar" onclick="fecharPopupAcesso()">[ fechar ]</button>
        </div>
    `;
    popupAcesso.classList.add("container__acesso--exibir");
}

export function fecharPopupAcesso() {
    const popupAcesso = document.querySelector(".container__acesso");
    popupAcesso.classList.remove("container__acesso--exibir");
    popupAcesso.innerHTML = "";
}

export function abrirPopupPerfil() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const popupPerfil = document.querySelector(".container__acesso");
    popupPerfil.innerHTML = `
        <div class="acesso__planoDeFundo">
            <div class="acesso__perfil">
                <div class="perfil__titulo">
                    <h2>PERFIL</h2>
                </div>                
                <div class="perfil__dados">
                    <span>
                        <h3 class="perfil__label">Nome:&nbsp&nbsp</h3><input class="perfil__input" id="inputNome" value="${usuarioLogado.nome}" disabled>
                    </span>
                    <span>
                        <h3 class="perfil__label">Sobrenome:&nbsp&nbsp</h3><input class="perfil__input" id="inputSobrenome" value="${usuarioLogado.sobrenome}" disabled>
                    </span>
                    <span>
                        <h3 class="perfil__label">Endereço:&nbsp&nbsp</h3><input class="perfil__input" id="inputEndereco" value="${usuarioLogado.endereco}" disabled>
                    </span>
                    <span>
                        <h3 class="perfil__label">Complemento:&nbsp&nbsp</h3><input class="perfil__input" id="inputComplemento" value="${usuarioLogado.complemento}" disabled>
                    </span>
                    <span>
                        <h3 class="perfil__label">CEP:&nbsp&nbsp</h3><input class="perfil__input" id="inputCep" value="${usuarioLogado.cep}" disabled>
                    </span>
                    <span>
                        <h3 class="perfil__label">Email:&nbsp&nbsp</h3><h3 class="perfil__input">${usuarioLogado.email}</h3>
                    </span>
                </div>
                <div class="perfil__botoes">
                    <button id="botoesEditar">EDITAR</button>
                    <button id="botoesLogout" onclick="logout()">LOGOUT</button>
                </div>
            </div>
            <button class="popUp__fechar" onclick="fecharPopupAcesso()">[ fechar ]</button>
        </div>
    `;
    popupPerfil.classList.add("container__acesso--exibir");

    function editarPerfil() {
        const inputsDados = document.querySelectorAll("input.perfil__input");
        const botaoEditar = document.getElementById("botoesEditar");

        if (botaoEditar.textContent === "EDITAR") {
            inputsDados.forEach(input => input.removeAttribute("disabled"));
            botaoEditar.textContent = "CONCLUIR";
        } else {
            usuarioLogado.nome = document.getElementById('inputNome').value;
            usuarioLogado.sobrenome = document.getElementById('inputSobrenome').value;
            usuarioLogado.endereco = document.getElementById('inputEndereco').value;
            usuarioLogado.complemento = document.getElementById('inputComplemento').value;
            usuarioLogado.cep = document.getElementById('inputCep').value;

            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

            const usuarios = JSON.parse(localStorage.getItem('usuarios'));
            const indiceUsuario = usuarios.findIndex(u => u.email === usuarioLogado.email);
            usuarios[indiceUsuario] = usuarioLogado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            inputsDados.forEach(input => input.setAttribute('disabled', 'disabled'));
            botaoEditar.textContent = 'EDITAR';
        }
    }

    document.getElementById("botoesEditar").addEventListener("click", editarPerfil);
}


export function fecharPopupPerfil() {
    const popupPerfil = document.querySelector(".container__acesso");
    popupPerfil.classList.remove("container__acesso--exibir");
    popupPerfil.innerHTML = "";
}
export function login() {
    const loginEmail = document.getElementById("loginEmail");
    const loginSenha = document.getElementById("loginSenha");
    const alertaDadosInvalidos = document.getElementById("acesso__alertaDadosInvalidos");

    let usuarios = localStorage.getItem("usuarios");
    usuarios = JSON.parse(usuarios);

    const usuarioAcesso = usuarios.find((u) => u.email === loginEmail.value);

    if(usuarioAcesso && usuarioAcesso.senha === loginSenha.value) {
        usuarioAcesso.login = true;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAcesso));
        alertaDadosInvalidos.innerText = "";
        window.location.reload();
    } else {
        alertaDadosInvalidos.innerText = "email e/ou senha inválidos"
    };
};

export function logout() {
    let usuarioLogado = localStorage.getItem("usuarioLogado")
    usuarioLogado = JSON.parse(usuarioLogado);
    usuarioLogado.login = false;
    localStorage.removeItem("usuarioLogado");
    window.location.reload();
};

document.addEventListener('DOMContentLoaded', () => {
    atualizarQuantidadeCarrinhoHeader();
    atualizarUsuarioLogadoHeader();
});