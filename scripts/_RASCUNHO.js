function alterarQuantidade(indice, delta) {
    const item = itensCarrinho[indice];
    item.quantidadeItem = Math.max(1, parseInt(item.quantidadeItem) + delta);
    item.subtotal = item.quantidadeItem * item.item.precoFloat;

    if (usuarioLogado) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let indiceUsuario = usuarios.findIndex(u => u.email === usuarioLogado.email);
        usuarios[indiceUsuario].carrinho = usuarioLogado.carrinho;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } else {
        localStorage.setItem("carrinhoTemp", JSON.stringify(itensCarrinho));
    }

    renderizarCarrinho();
}

function removerItem(indice) {
    const item = itensCarrinho[indice];
    if (usuarioLogado) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let indiceUsuario = usuarios.findIndex(u => u.email === usuarioLogado.email);
        usuarios[indiceUsuario].carrinho = usuarioLogado.carrinho.filter((_, i) => i !== indice);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } else {
        localStorage.setItem("carrinhoTemp", JSON.stringify(itensCarrinho.filter((_, i) => i !== indice)));
    }

    renderizarCarrinho();
    atualizarQuantidadeCarrinhoHeader();
    habilitarBotaoFinalizar();
}
