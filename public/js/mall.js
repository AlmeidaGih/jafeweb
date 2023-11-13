window.onload = function () {

    $("#nav-placeholder").load("/header", function(){

        let openShopping = document.querySelector('#cartDark');
        let closeShopping = document.querySelector('.closeShopping');
        let listCard = document.querySelector('.listCard');
        let spanCart = document.querySelector('.quantityItem');
        let userIcon = document.querySelector('#navUser');
        let btnCancelModal = document.querySelector('.cancel');
        let loginTitle = document.querySelector('#loginTitle');
        let cadTitle = document.querySelector('#cadTitle');

        openShopping.addEventListener('click', ()=>{
            body.classList.add('active');
        });

        closeShopping.addEventListener('click', ()=>{
            body.classList.remove('active');
        });

        userIcon.addEventListener('click', ()=>{
            document.querySelector('.modal').style.display = 'block';
            document.querySelector('#frmLogin').style.display = 'block';
            document.querySelector('#loginTitle').style.color = '#8A593F';
            document.querySelector('#loginTitle').style.backgroundColor = '#EDD5C2';
            document.querySelector('#loginTitle').style.borderRadius = "12px 2px 2px 2px";
        });

        btnCancelModal.addEventListener('click', ()=>{
            document.querySelector('.modal').style.display = 'none';
        });

        loginTitle.addEventListener('click', ()=>{
            console.log("aaaaa")
            document.querySelector('#loginTitle').style.borderRadius = "12px 2px 2px 2px";
            document.querySelector('#frmLogin').style.display = 'block';
            document.querySelector('#frmCad').style.display = 'none';
        });

        cadTitle.addEventListener('click', ()=>{
            document.querySelector('#cadTitle').style.borderRadius = "12px 2px 2px 2px";
            document.querySelector('#frmLogin').style.display = 'none';
            document.querySelector('#frmCad').style.display = 'block';
        });

        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            const divsProduct = document.querySelectorAll('.product-content');

            data.forEach((item, index) => {
                
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

        $(".product-content").find("img").on('click', function() {
            // Código que precisa ser executado quando #seuElemento é clicado
            addToCart($(this), listCard, spanCart);
        });

        if ($('.card ul li').length >= 1) {
            $("#quantBtn").find("button").on('click', function() {
                // Código que precisa ser executado quando #seuElemento é clicado
                changeQuantity($(this));
            });
        }
    });

    let list = document.querySelector('.list');
    
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

function addToCart(btn, listCard, spanCart){
    if ($('.card ul li').length >= 1) {
        var liAdded = new Array();
        const idDiv = $(btn).closest('div').attr('id');

        $('.card ul').find('li').each(function(){
            var currentLi = $(this);
            var nameProd = $(currentLi).find("#textProd").text().split(" ");
            var prodSemAcentuacao = nameProd[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            liAdded.push(prodSemAcentuacao);
        });

        var prodDiv = idDiv.split("-"); 
        var prodExist = liAdded.includes(prodDiv[0])
        
        if(prodExist == false){
            const imagePath = $('#' + idDiv).find('p').text();
            const nameProd = $('#' + idDiv).find('h2').text();
            const priceProd = parseInt($('#' + idDiv).find('h3').text().replace(/[^0-9.]/g, ""));

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${imagePath}"/></div>
                <div id="textProd">${nameProd}</div>
                <div id="priceProd">R$${priceProd.toLocaleString()}</div>
                <div id="quantBtn">
                <button onclick="changeQuantity(this)">-</button>
                <div class="count">1</div>
                <button onclick="changeQuantity(this)">+</button>
                </div>`;
            listCard.appendChild(newDiv);
            var totalSplit = $(".total").text().split("R$");
            var newTotal = parseInt(totalSplit[1]) + priceProd
            $('.total').text("R$" + newTotal);
            var newValCart = parseInt($(spanCart).text()) + 1;
            $(spanCart).text(newValCart);
        }else{
            const priceProd = parseInt($('#' + idDiv).find('h3').text().replace(/[^0-9.]/g, ""));
            $('.card ul').find('li').each(function(){
                var currentLi = $(this);
                var nameProd = $(currentLi).find("#textProd").text().split(" ");
                var prodSemAcentuacao = nameProd[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                if(prodSemAcentuacao == prodDiv[0]){
                    var currentQuantity = parseInt($(currentLi).find(".count").text());
                    console.log($(currentLi).find(".count").text())
                    var newQuantity = currentQuantity + 1;
                    console.log(newQuantity)
                    $(currentLi).find(".count").text(newQuantity);
                    var totalSplit = $(".total").text().split("R$");
                    var newTotal = parseInt(totalSplit[1]) + priceProd
                    $('.total').text("R$" + newTotal);
                    var newValCart = parseInt($(spanCart).text()) + 1;
                    $(spanCart).text(newValCart);
                }
            
            });
        }
        
    } else {
        const idDiv = $(btn).closest('div').attr('id');
        const imagePath = $('#' + idDiv).find('p').text();
        const nameProd = $('#' + idDiv).find('h2').text();
        const priceProd = parseInt($('#' + idDiv).find('h3').text().replace(/[^0-9.]/g, ""));
        const total = $('.total').text();

        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="images/${imagePath}"/></div>
            <div id="textProd">${nameProd}</div>
            <div id="priceProd">R$${priceProd.toLocaleString()}</div>
            <div id="quantBtn">
                <button onclick="changeQuantity(this)">-</button>
                <div class="count">1</div>
                <button onclick="changeQuantity(this)">+</button>
            </div>`;
            listCard.appendChild(newDiv);
            $('.total').text(total + priceProd)
            $(spanCart).text(1)
    }
    
}

function changeQuantity(btn){
    var operation = $(btn).text();
    var quant = parseInt($(btn).parent().find(".count").text());

    if(operation == "+"){
        var newQuant = quant + 1;
        $(btn).parent().find(".count").text(newQuant);
        var totalSplit = $(".total").text().split("R$");
        var priceProd = parseInt($(btn).closest('li').find('#priceProd').text().replace(/[^0-9.]/g, ""));
        var newTotal = parseInt(totalSplit[1]) + priceProd
        $('.total').text("R$" + newTotal);
        var cartCurrent = parseInt($("body").find(".quantityItem").text());
        var newCart = cartCurrent + 1;
        $("body").find(".quantityItem").text(newCart);

    }else{
        if(quant == 1){
            $(btn).closest('li').remove();
            $('.total').text("R$");
        }else{
            var newQuant = quant - 1;
            $(btn).parent().find(".count").text(newQuant);
            var totalSplit = $(".total").text().split("R$");
            var priceProd = parseInt($(btn).closest('li').find('#priceProd').text().replace(/[^0-9.]/g, ""));
            var newTotal = parseInt(totalSplit[1]) - priceProd
            $('.total').text("R$" + newTotal);
            var cartCurrent = parseInt($("body").find(".quantityItem").text());
            var newCart = cartCurrent - 1;
            $("body").find(".quantityItem").text(newCart);
        }
        
    }
}