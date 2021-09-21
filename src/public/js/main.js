document.addEventListener('DOMContentLoaded', function (){

    const inputSearch = $('input[name=input-search]');
    inputSearch.keyup(function (e) {
        let inputValue = e.target.value;

        fetch(`/products/search?q=${inputValue}`)
            .then(res => {
                return res.json()
            })
            .then(result =>renderSearchSuggest(result.data))
    })

    function renderSearchSuggest(data) {
        let searchElement = $('#search-suggest')[0];
        if (data.length) {
            let listProduct = data.map(product => `<li class="list-group-item">${product.name}</li>`)
            // let html = `<ul class="list-group">
            //                 <li class="list-group-item">sản phẩm</li>
            //                 <li class="list-group-item">sản phẩm</li>
            //             </ul>`
            let ul = document.createElement('ul');
            ul.className = "list-group";

            ul.innerHTML = listProduct.join('');
            searchElement.innerHTML= '';
            searchElement.append(ul)

        } else {
            searchElement.innerHTML= '';
        }

        
    }

})