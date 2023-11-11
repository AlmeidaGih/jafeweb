window.onload = function () {

    $("#nav-placeholder").load("/header", function(){

        let openShopping = document.querySelector('#cartDark');
        let closeShopping = document.querySelector('.closeShopping');

        openShopping.addEventListener('click', ()=>{
            body.classList.add('active');
        })

        closeShopping.addEventListener('click', ()=>{
            body.classList.remove('active');
        })

        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            const divsProduct = document.querySelectorAll('.product-content');

            data.forEach((item, index) => {
                console.log(index)
                const divProduct = divsProduct[index];
    
                if (divProduct) {
                    const h2 = divProduct.querySelector('h2');
                    const h3 = divProduct.querySelector('h3');
                    const h4 = divProduct.querySelector('h4');
                    const p = divProduct.querySelector('p');
        
                    if (h2 && h3) {
                        h2.textContent = `${item.NAME_PRODUCT}`;
                        h3.textContent = `${h3.textContent} ${item.PRICE_PRODUCT}`;
                        h4.textContent = `${item.DESCRIPTION_PRODUCT}`;
                        p.textContent = `${item.NAME_IMAGE_PRODUCT}`;
                        $(divProduct).find('p').hide();
                    
                    }
                }
            });
        })
        .catch(error => console.error('Erro ao obter dados:', error));

        
    });

    let list = document.querySelector('.list');
    let listCard = document.querySelector('.listCard');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');

    
    

    /*function reloadCard(){
        listCard.innerHTML = '';
        let count = 0;
        let totalPrice = 0;
        listCards.forEach((value, key)=>{
            totalPrice = totalPrice + value.price;
            count = count + value.quantity;
            if(value != null){
                let newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div><img src="image/${value.image}"/></div>
                    <div>${value.name}</div>
                    <div>${value.price.toLocaleString()}</div>
                    <div>
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>`;
                    listCard.appendChild(newDiv);
            }
        })
        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    }*/
}

function addToCart(btn){

    if ($('.card ul li').length >= 1) {
        console.log("O elemento #filho existe em #pai");
    } else {
        const idDiv = $(btn).closest('div').attr('id');
        const imagePath = $('#' + idDiv).find('p').text();
        const nameProd = $('#' + idDiv).find('h2').text();
        const priceProd = parseInt($('#' + idDiv).find('h3').text().replace(/[^0-9.]/g, ""));

        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="images/${imagePath}"/></div>
            <div>${nameProd}</div>
            <div>${priceProd.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity()">-</button>
                <div class="count"></div>
                <button onclick="changeQuantity()">+</button>
            </div>`;
            listCard.appendChild(newDiv);
    }
    
}