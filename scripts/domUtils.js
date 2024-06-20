export function atualizarUsuarioLogadoHeader() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const menuSupUsuario = document.querySelector(".menu-sup__usuario");

    if (usuarioLogado) {
        menuSupUsuario.innerHTML=`
            <li><button onclick="abrirPopupPerfil()">Perfil</button></li>
            <li><a href="/pages/carrinho.html">Carrinho_</a></li>
            <a href="/pages/carrinho.html"><li id="quantidadeCarrinho">0</li></a>
        `;
    } else {
        menuSupUsuario.innerHTML=`
            <li><button onclick="abrirPopupAcesso()">Entrar</button></li>
            <li><a href="/pages/carrinho.html">Carrinho_</a></li>
            <a href="/pages/carrinho.html"><li id="quantidadeCarrinho">0</li></a>
        `;
    }
}

export function atualizarQuantidadeCarrinhoHeader() {
    let somaQuantidades = 0;

    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;
    let carrinhoTemp = JSON.parse(localStorage.getItem("carrinhoTemp")) || [];

    if (usuarioLogado) {
        somaQuantidades = usuarioLogado.carrinho.reduce((total, item) => total + parseInt(item.quantidadeItem), 0);
    } else {
        for (let i = 0; i < carrinhoTemp.length; i++) {
            somaQuantidades += parseInt(carrinhoTemp[i].quantidadeItem);
        }
    }

    let quantidadeCarrinho = document.getElementById("quantidadeCarrinho");
    if (quantidadeCarrinho) {
        quantidadeCarrinho.innerText = somaQuantidades;
    }
}

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
                        <img src="/assets/images/transparente_logo.png" alt="Logo" id="imagemLogo">
                    </figure>
                    <a href="/pages/cadastro.html">
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
            usuarioLogado.complemento = document.getElementById('inputComplemento').value.trim() || "-";
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

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioAcesso = usuarios.find((u) => u.email === loginEmail.value);

    if (usuarioAcesso && usuarioAcesso.senha === loginSenha.value) {
        let carrinhoTemp = JSON.parse(localStorage.getItem('carrinhoTemp')) || [];
        
        if (carrinhoTemp.length > 0) {
            usuarioAcesso.carrinho = [...usuarioAcesso.carrinho, ...carrinhoTemp];
            localStorage.removeItem('carrinhoTemp');
        }

        usuarioAcesso.login = true;

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAcesso));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alertaDadosInvalidos.innerText = "";
        window.location.reload();
    } else {
        alertaDadosInvalidos.innerText = "email e/ou senha inválidos";
    }
}

export function logout() {
    let usuarioLogado = localStorage.getItem("usuarioLogado");
    usuarioLogado = JSON.parse(usuarioLogado);
    usuarioLogado.login = false;
    localStorage.removeItem("usuarioLogado");
    window.location.reload();
}

export function buscarProdutos(termosBusca, produtosCadastrados) {
    const resultadosBusca = [];

    for (let categoria in produtosCadastrados) {
        produtosCadastrados[categoria].forEach(produto => {
            if (
                produto.nome.toLowerCase().includes(termosBusca) ||
                produto.descricao.toLowerCase().includes(termosBusca) ||
                produto.categoria.toLowerCase().includes(termosBusca)
            ) {
                resultadosBusca.push(produto);
            }
        });
    }

    console.log("Resultados da busca:", resultadosBusca);

    return resultadosBusca;
}

export function realizarBuscaProdutos() {
    const termosBusca = document.getElementById('buscaProdutos').value.toLowerCase();
    if (termosBusca.trim() === "") {
        alert("Por favor, insira um termo de busca.");
    } else {
        window.location.href = `/pages/vitrine.html?busca=${termosBusca}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarUsuarioLogadoHeader();
    atualizarQuantidadeCarrinhoHeader();

    const botaoBuscar = document.getElementById('botaoBuscar');
    const buscaProdutosInput = document.getElementById('buscaProdutos');
    
    if (botaoBuscar) {
        botaoBuscar.addEventListener('click', realizarBuscaProdutos);
    }

    if (buscaProdutosInput) {
        buscaProdutosInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                realizarBuscaProdutos();
            }
        });
    }
});