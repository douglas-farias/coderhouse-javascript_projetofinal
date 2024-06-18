export function configurarBusca() {
    document.getElementById("botaoBuscar").addEventListener("click", function() {
        const termosBusca = document.getElementById("buscaProdutos").value.toLowerCase();
        const resultadosBusca = buscarProdutosPorCategoria(termosBusca, produtosCadastrados);
        renderizarResultado(resultadosBusca, termosBusca);
    });
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
    };

    return resultadosBusca;
}

export function renderizarResultado(resultados, termosBusca) {
    const conteudoTitulo = document.getElementById("conteudo__titulo");
    const conteudoContainer = document.getElementById("conteudoContainer");
    conteudoTitulo.innerHTML = "";
    conteudoContainer.innerHTML = "";

    conteudoTitulo.innerHTML = `BUSCA: ${termosBusca.toUpperCase()}`;

    resultados.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.imagemAlt}">
            <h2>${produto.nome}</h2>
            <p>Preço: ${produto.precoString}</p>
            <p>Estoque: ${produto.estoque}</p>
        `;
        conteudoContainer.appendChild(produtoDiv);
    });
}

export function redirecionarBusca(termosBusca) {
    if (termosBusca) {
        window.location.href = `busca.html?busca=${encodeURIComponent(termosBusca)}`;
    }
}

export function renderizarProdutosPorCategoria(categoria, produtosCadastrados) {
    const conteudoTitulo = document.getElementById("conteudo__titulo");
    const conteudoContainer = document.getElementById("conteudoContainer");
    conteudoTitulo.innerHTML = "";
    conteudoContainer.innerHTML = "";

    conteudoTitulo.innerHTML = `CATEGORIA ${categoria.toUpperCase()}`;

    let produtosFiltrados = produtosCadastrados[`categoria${categoria}`];

    produtosFiltrados.forEach(produto => {
        const produtoDiv = document.createElement("div");
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.imagemAlt}">
            <h2>${produto.nome}</h2>
            <p>Preço: ${produto.precoString}</p>
            <p>Estoque: ${produto.estoque}</p>
        `;
        conteudoContainer.appendChild(produtoDiv);
    });
}
