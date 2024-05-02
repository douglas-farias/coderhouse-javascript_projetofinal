console.log("SEJA BEM VINDO(A)");
alert("Para o uso correto da página, abra o console (botão F12).");

var carrinho = [];
var listaProdutos = [];
var continuar = true;

class Produtos {
    constructor(id, tipo, nome, descricao, preco){
        this.id = id;
        this.tipo = tipo;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }
};

listaProdutos.push(new Produtos("0001", "Tipo A", "Produto 1", "Descrição do prodtuo 1", 9.90));
listaProdutos.push(new Produtos("0002", "Tipo A", "Produto 2", "Descrição do prodtuo 2", 19.90));
listaProdutos.push(new Produtos("0003", "Tipo B", "Produto 3", "Descrição do prodtuo 3", 29.90));
listaProdutos.push(new Produtos("0004", "Tipo B", "Produto 4", "Descrição do prodtuo 4", 39.90));
listaProdutos.push(new Produtos("0005", "Tipo C", "Produto 5", "Descrição do prodtuo 5", 49.90));
listaProdutos.push(new Produtos("0006", "Tipo C", "Produto 6", "Descrição do prodtuo 6", 59.90));
listaProdutos.push(new Produtos("0007", "Tipo D", "Produto 7", "Descrição do prodtuo 7", 69.90));

function menuBoasVindas() {
    let nomeUsuario;
    let escolhaBoasVindas;
    
    while(continuar) {
        escolhaBoasVindas = parseInt(prompt("Seja Bem vindo(a)!\nEscolha da opção desejada:\n\n1.Login (em construção)\n2.Cadastro\n3.Continuar como visitante"));

        const opcoesBoasVindas = {
            1: () => (alert("Página em construção.\nRedirecionando para a página de cadastro."), nomeUsuario = menuCadastro(), menuPrincipal(nomeUsuario)),
            2: () => (nomeUsuario = menuCadastro(), menuPrincipal(nomeUsuario)),
            3: () => (nomeUsuario = "VISITANTE", menuPrincipal(nomeUsuario)),
            default: () => alert("Opção inválida.\nTente novamente."),
        };

        (opcoesBoasVindas[escolhaBoasVindas] || opcoesBoasVindas.default)();
    }
};

function menuCadastro() {
    let usuarioCadastroNome = prompt("CADASTRO\n\nDigite o seu nome:").toUpperCase();
    return usuarioCadastroNome || (alert("Digite o seu nome."), menuCadastro())
};

function usuarioVisitante() {
    let usuarioCadastroNome = "Visitante"
    return usuarioCadastroNome
};

function mostrarProdutos() {
    console.log("PRODUTOS:")
    for (const produto of listaProdutos) {
        console.log(`ID: ${produto.id}\nProduto: ${produto.nome}\nDescrição: ${produto.descricao}\nPreço: ${produto.preco}\n`);
    }
};

function menuPrincipal(nomeUsuario) {
    let escolhaMenuPrincipal;

    while(continuar) {
        escolhaMenuPrincipal = parseInt(prompt(`Olá, ${nomeUsuario}! escolha a opção desejada:\n\n1.Visitar loja\n2.Ver Carrinho\n3.Sair`))

        const opcoesMenuPrincipal = {
            1: () => menuLoja(),
            2: () => menuCarrinho(),
            3: () => (alert ("Sainda da sua conta."), continuar = false),
            default: () => alert("Opção inválida.\nTente novamente."),
        };

        (opcoesMenuPrincipal[escolhaMenuPrincipal] || opcoesMenuPrincipal.default)();
    }
};

function menuLoja() {
    let escolhaMenuLoja;

    while(continuar) {
        escolhaMenuLoja = prompt("LOJA\n\nDigite o ID do produto desejado ou 'VOLTAR' para retornar ao menu principal.\n\n**Confira a lista de produtos e seus ID's no console**").toLocaleLowerCase();

        escolhaMenuLoja === "voltar" && menuPrincipal();

        let produtoEscolhido = listaProdutos.find(produto => produto.id === escolhaMenuLoja);

        produtoEscolhido? escolhaQuantidade(produtoEscolhido) :  alert("Produto não encontrado.\nTente novamente.")
    }
};

function escolhaQuantidade(produto) {
    let quantidade = parseInt(prompt(`Produto: ${produto.nome}\nValor unitário: R$${produto.preco.toFixed(2)}\nDigite a quantidade de unidades desejada:`));
    let totalParcial = quantidade * parseFloat(produto.preco.toFixed(2));

    (Number.isInteger(quantidade) && quantidade > 0) ? (alert(`Adicionado ao carrinho:\n${quantidade} x ${produto.nome}\nTotal parcial: R$${totalParcial.toFixed(2)}`), carrinho.push({produto: produto.nome, quantidade: quantidade, valorParcial: parseFloat(totalParcial)}), menuLoja()) : (alert("Valor de quantidade inválido. Digite uma valor válido (número inteiro)."), escolhaQuantidade(produto))
};

function mostrarCarrinho() {
    console.log("CARRINHO DE COMPRAS:")
    for (const itemCarrinho of carrinho) {
        console.log(`- ${itemCarrinho.quantidade} x ${itemCarrinho.produto} ---  R$${itemCarrinho.valorParcial.toFixed(2)}\n`);
    }
};

function menuCarrinho() {
    carrinho.length === 0 && (alert("CARRINHO\n\nSeu carrinho está vazio."), menuPrincipal());

    mostrarCarrinho();
    let escolhaMenuCarrinho;

    while(continuar) {
        escolhaMenuCarrinho = parseInt(prompt(`CARRINHO DE COMPRAS\n\nConfira os produtos adicionados ao seu carrinho no console e digite a opção desejada:\n\n1.Finalizar compra\n2.Voltar às compras`))

        const opcoesMenuCarrinho = {
            1: () => finalizarCompra(),
            2: () => menuLoja(),
            default: () => alert("Opção inválida.\nTente Novamente"),
        };
        
        (opcoesMenuCarrinho[escolhaMenuCarrinho] || opcoesMenuCarrinho.default)();
    }
}

function finalizarCompra() {
    const valorTotal = carrinho.reduce((soma, o) => soma + o.valorParcial, 0);

    console.log(`VALOR TOTAL: R$${valorTotal.toFixed(2)}`);

    alert(`COMPRA FINALIZADA.\n\nValor total: R$${valorTotal.toFixed(2)}\nConfira a nota fiscal no console.\n\nAgradecemos a preferência!\nVolte Sempre!`);

    continuar = false;
}

mostrarProdutos();

menuBoasVindas()