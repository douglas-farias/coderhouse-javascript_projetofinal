// domUtilsAdmin.js
export function configurarBusca() {
    document.getElementById("botaoBuscar").addEventListener("click", function() {
        const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
        redirecionarBusca(termosBusca);
    });
}

export function combinarProdutos(produtosCadastrados) {
    let todosProdutos = [];
    for (let categoria in produtosCadastrados) {
        todosProdutos = todosProdutos.concat(produtosCadastrados[categoria]);
    }
    return todosProdutos;
}

export function buscarProdutos(termosBusca, produtosCadastrados) {
    const todosProdutos = combinarProdutos(produtosCadastrados);
    return todosProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(termosBusca) ||
        produto.descricao.toLowerCase().includes(termosBusca) ||
        produto.categoria.toLowerCase().includes(termosBusca)
    );
}

export function filtrarProdutos(tipoFiltro, valorFiltro, produtosCadastrados) {
    const conteudoTitulo = document.getElementById("conteudo__titulo");
    conteudoTitulo.innerHTML = "";

    let todosProdutos = combinarProdutos(produtosCadastrados);
    let resultados = [];

    if (tipoFiltro === "categoria") {
        conteudoTitulo.innerHTML = `CATEGORIA ${valorFiltro.toUpperCase()}`;
        resultados = todosProdutos.filter(produto => produto.categoria.toLowerCase() === valorFiltro.toLowerCase());
    } else if (tipoFiltro === "busca") {
        conteudoTitulo.innerHTML = `BUSCA: ${valorFiltro.toUpperCase()}`;
        resultados = buscarProdutos(valorFiltro, produtosCadastrados);
    } else if (tipoFiltro === "ofertas") {
        conteudoTitulo.innerHTML = `OFERTAS`;
        resultados = todosProdutos.filter(produto => produto.oferta === true);
    } else if (tipoFiltro === "novidades") {
        conteudoTitulo.innerHTML = `NOVIDADES`;
        resultados = todosProdutos.filter(produto => produto.novidade === true);
    } else if (tipoFiltro === "estoque") {
        conteudoTitulo.innerHTML = `BAIXO ESTOQUE`;
        resultados = todosProdutos.filter(produto => produto.estoque <= 50);
    } else {
        resultados = todosProdutos;
    }
    
    renderizarResultado(resultados, valorFiltro);
}

export function renderizarResultado(resultados, termosBusca) {
    const conteudoContainer = document.getElementById("conteudoContainer");
    conteudoContainer.innerHTML = "";

    resultados.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.className = "conteudo__produto";
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.imagemAlt}" class="produto__imagem">
            <h2 class="produto__nome">${produto.nome}</h2>
            <p class="produto__preco">Preço: ${produto.precoString}</p>
            <p class="produto__estoque">Estoque: ${produto.estoque}</p>
            <a href="edicaoProduto.html?id=${produto.id}"><button class="produto__botaoEditar">Editar</button></a>
        `;
        conteudoContainer.appendChild(produtoDiv);
    });
}

export function redirecionarBusca(termosBusca) {
    if (termosBusca) {
        window.location.href = `filtro.html?busca=${encodeURIComponent(termosBusca)}`;
    }
}

export function renderizarProdutosPorCategoria(categoria, produtosCadastrados) {
    const todosProdutos = combinarProdutos(produtosCadastrados);
    const resultados = todosProdutos.filter(produto => produto.categoria.toLowerCase() === categoria.toLowerCase());
    renderizarResultado(resultados, categoria);
}