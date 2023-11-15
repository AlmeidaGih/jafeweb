window.onload = function () {
    let list = document.querySelector('.list');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');

    $("#nav-placeholder").load("/header", function(){

        let openShopping = document.querySelector('#cartDark');
        let closeShopping = document.querySelector('.closeShopping');
        let listCard = document.querySelector('.listCard');
        let spanCart = document.querySelector('.quantityItem');
        let userIcon = document.querySelector('#navUser');
        let btnCancelModal = document.querySelector('.cancel');
        let loginTitle = document.querySelector('#loginTitle');
        let cadTitle = document.querySelector('#cadTitle');
        let btnCad = document.querySelector('#btnCad');
        let btnLogin = document.querySelector('#btnLogin');
        
        openShopping.addEventListener('click', ()=>{
            body.classList.add('active');
        });

        closeShopping.addEventListener('click', ()=>{
            body.classList.remove('active');
        });

        userIcon.addEventListener('click', ()=>{
            const userId = sessionStorage.getItem('userID');
            console.log(userId)
            if(userId > 0){
                if($('#menuuser').css('display') == 'block'){
                    document.querySelector('#menuuser').style.display = 'none';
                }else{
                    document.querySelector('#menuuser').style.display = 'block';
                }
                
            }else{
                document.querySelector('.modal').style.display = 'block';
                document.querySelector('.modal').style.height = '220px';
                document.querySelector('#frmLogin').style.display = 'block';
                document.querySelector('#frmCad').style.display = 'none';
                document.querySelector('#loginTitle').style.color = '#8A593F';
                document.querySelector('#loginTitle').style.backgroundColor = '#EDD5C2';
                document.querySelector('#frmLogin').style.borderRadius = "2px 2px 12px 12px";
                $('#cadTitle').css('color', '#EDD5C2');
                $('#cadTitle').css('background-color', '#8A593F');
            }
            
        });

        btnCancelModal.addEventListener('click', ()=>{
            document.querySelector('.modal').style.display = 'none';
        });

        loginTitle.addEventListener('click', ()=>{
            console.log("aaaaa")
            document.querySelector('.modal').style.height = '220px';
            document.querySelector('#frmLogin').style.borderRadius = "2px 2px 12px 12px";
            document.querySelector('#frmLogin').style.display = 'block';
            document.querySelector('#frmCad').style.display = 'none';
            document.querySelector('#loginTitle').style.color = '#8A593F';
            document.querySelector('#loginTitle').style.backgroundColor = '#EDD5C2';
            $('#cadTitle').css('color', '#EDD5C2');
            $('#cadTitle').css('background-color', '#8A593F');
        });

        cadTitle.addEventListener('click', ()=>{
            document.querySelector('.modal').style.height = '416px';
            document.querySelector('#frmCad').style.borderRadius = "2px 2px 2px 2px";
            document.querySelector('#frmLogin').style.display = 'none';
            document.querySelector('#frmCad').style.display = 'block';
            document.querySelector('#cadTitle').style.color = '#8A593F';
            document.querySelector('#cadTitle').style.backgroundColor = '#EDD5C2';
            $('#loginTitle').css('color', '#EDD5C2');
            $('#loginTitle').css('background-color', '#8A593F');
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
            addToCart($(this), listCard, spanCart);
        });

        if ($('.card ul li').length >= 1) {
            $("#quantBtn").find("button").on('click', function() {
                changeQuantity($(this));
            });
        }

        document.getElementById('frmCad').addEventListener('submit', function(event) {
            event.preventDefault();
            
            var nameUser = $("#txtName").val();
            var emailUser = $("#txtEmailCad").val();
            var cellphoneUser = $("#txtCellphone").val();
            var birthdayUser = $("#birthday").val();
            var passwordUser = $("#txtPasswordCad").val();
            
            fetch('/cad-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    user: nameUser,
                    email: emailUser,
                    cellphone: cellphoneUser,
                    birthday: birthdayUser,
                    password: passwordUser
                  })
              })
              .then(response => {
                if (!response.ok) {
                    if(response.status == 400){
                        throw new Error('400');
                    }else{
                        throw new Error('Erro ao inserir dados.');
                    }
                  
                }
                return response.text();
              })
              .then(data => {
                console.log(data);
                alert("Usuário inserido com sucesso!")
                $('#frmCad input').val('');
                document.querySelector('#frmLogin').style.display = 'block';
                document.querySelector('#frmCad').style.display = 'none';
                document.querySelector('#loginTitle').style.color = '#8A593F';
                document.querySelector('#loginTitle').style.backgroundColor = '#EDD5C2';
                $('#cadTitle').css('color', '#EDD5C2');
                $('#cadTitle').css('background-color', '#8A593F');
                document.querySelector('.modal').style.height = '220px';
              })
              .catch(error => {
                console.error('Erro:', error);
                if(error.message.includes('400') ){
                    alert("Email já cadastrado")
                }else{
                    alert("Erro ao inserir usuário!")
                }
                
              });
        });

        document.getElementById('frmLogin').addEventListener('submit', function(event) {
            event.preventDefault();
            
            var emailUser = $("#txtEmailLogin").val();
            var passwordUser = $("#txtPasswordLogin").val();
            
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    user: emailUser,
                    password: passwordUser
                  })
              })
              .then(response => response.json())
              .then(data => {
                
                sessionStorage.setItem('userID', data[0].FK_ID_CUSTOMER);
                alert("Login feito com sucesso!")
                $('#frmLogin input').val('');
                document.querySelector('.modal').style.display = 'none';
              })
              .catch(error => {
                console.error('Erro:', error);
                if(error.message.includes('401') ){
                    alert("Usuário/senha incorretos!")
                }else{
                    alert("Erro ao realizar login!")
                }
                
              });
        });
        
        $("#imgPassword").mouseenter(function() {
            $("#txtPasswordCad").attr("type", "text");
        });
          
        $( "#imgPassword" ).mouseleave(function() {
            $("#txtPasswordCad").attr("type", "password");
        });

        $("#imgPassword2").mouseenter(function() {
            $("#txtPasswordLogin").attr("type", "text");
        });
          
        $( "#imgPassword2" ).mouseleave(function() {
            $("#txtPasswordLogin").attr("type", "password");
        });
    });
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

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}
  
const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
}