function renderizarItem() {
    const itemImagens = document.getElementsByClassName("conteudo__imagens");
    itemImagens.innerHTML = "";

    const itemInfos = document.getElementsByClassName("conteudo__infos");
    itemInfos.innerHTML = "";

    const sectionItemImagens = document.createElement("section");
    sectionItemImagens.className = "imagens__produto";
    sectionItemImagens.innerHTML = `<div class="imagens__produto">
                                        <img src="" alt="">
                                    </div>
                                    <!-- <div class="imagens__relacionados">
                                        <img src="" alt="">
                                        <img src="" alt="">
                                        <img src="" alt="">
                                    </div> -->`;

    const sectionItemInfos = document.createElement("section");
    sectionItemInfos.className = "infos__principal";
    sectionItemInfos.innerHTML = `<div class="infos__principal">
                                        <span>
                                            <h5>Categoria</h5>
                                        </span>
                                        <h1 id="infos__nome">Produto 1</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi sit numquam totam, fuga aliquam consequatur.</p>
                                        <h1 id="infos__preco"> R$ 0,00</h1>
                                    </div>
                                    <div class="infos__quantidade">
                                        <button id="quantidade__menos">-</button>
                                        <h4 id="quantidade__valor">1</h4>
                                        <button id="quantidade__mais">+</button>
                                    </div>
                                    <div class="infos_botoes">
                                        <button class="botoes__comprarAgora">Comprar Agora</button>
                                        <button class="botoes__adicionarCarrinho">Adicionar ao Carrinho</button>
                                    </div>`;

    itemImagens.appendChild(sectionItemImagens);

    itemInfos.appendChild(sectionItemInfos);
};

const urlParams = new URLSearchParams(window.location.search);
const itemID = urlParams.get('id');
