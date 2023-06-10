function pegarTodosOsProdutosPorCategoria(categoria) {
    fetch("https://diwserver.vps.webdock.cloud/products/category/" + categoria)
        .then(response => response.json())
        .then(json => {
            carregarProdutos(json.products);
        })
}

function pegarTodosOsProdutosPorPesquisa(query) {
    fetch("https://diwserver.vps.webdock.cloud/products/search?page_items=8&query=" + query)
        .then(response => response.json())
        .then(json => {
            carregarProdutos(json);
        })
}

function carregarProdutos(produtos) {

    var containerProdutos = document.querySelector("#card-container");

    produtos.forEach(produto => {
        var card = document.createElement("a");
        card.href = "detalhes.html?id=" + produto.id;
        card.classList.add("card");
        card.innerHTML = '<img class="card-img-top" src="' + produto.image + '" alt="imagem do produto">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + produto.title + '</h5>' +
            '<p class="card-text"> Estrelas: ' + produto.rating['rate'] + '</p>' +
            '<p class="card-text"> Preço: ' + produto.price + '</p>';
        containerProdutos.appendChild(card);
    })
}

var url = new URL(window.location.href);
var categoriaSelecionada = (url.searchParams.get("categoria"));
var query = url.searchParams.get("query");



var categorias = ["Accessories - Jewellery", "Accessories - Belts"];

if (categoriaSelecionada != null) {
    pegarTodosOsProdutosPorCategoria(categoriaSelecionada);
} else if (query == null) {
    var produtos = [];
    categorias.forEach(categoria => {
        pegarTodosOsProdutosPorCategoria(categoria);
    })
} else if (query != null) {
    pegarTodosOsProdutosPorPesquisa(query);
}