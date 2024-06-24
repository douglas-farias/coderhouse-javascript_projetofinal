function importarProdutos() {
  fetch("../listaProdutos.json")
  .then((response) => response.json())
  .then((produtos) => {
    // Converte o objeto JSON em uma string e armazena no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));
    console.log('Produtos armazenados no localStorage:', produtos);
  })
  .catch((error) => {
    console.error('Erro ao buscar produtos:', error);
  });
}