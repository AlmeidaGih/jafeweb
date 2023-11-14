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
        })

        closeShopping.addEventListener('click', ()=>{
            body.classList.remove('active');
        })

        userIcon.addEventListener('click', ()=>{
            document.querySelector('.modal').style.display = 'block';
            document.querySelector('.modal').style.height = '220px';
            document.querySelector('#frmLogin').style.display = 'block';
            document.querySelector('#frmCad').style.display = 'none';
            document.querySelector('#loginTitle').style.color = '#8A593F';
            document.querySelector('#loginTitle').style.backgroundColor = '#EDD5C2';
            document.querySelector('#frmLogin').style.borderRadius = "2px 2px 12px 12px";
            $('#cadTitle').css('color', '#EDD5C2');
            $('#cadTitle').css('background-color', '#8A593F');
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
            document.querySelector('.modal').style.height = '480px';
            document.querySelector('#frmCad').style.borderRadius = "2px 2px 2px 2px";
            document.querySelector('#frmLogin').style.display = 'none';
            document.querySelector('#frmCad').style.display = 'block';
            document.querySelector('#cadTitle').style.color = '#8A593F';
            document.querySelector('#cadTitle').style.backgroundColor = '#EDD5C2';
            $('#loginTitle').css('color', '#EDD5C2');
            $('#loginTitle').css('background-color', '#8A593F');
        });
    });

    let list = document.querySelector('.list');
    let listCard = document.querySelector('.listCard');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');

   
    

    fetch('http://localhost:3000/receitas')
    .then(response => response.json())
    .then(data => {
      // Manipula os dados recebidos
      
      console.log(data)
    })
    .catch(error => console.error('Erro ao obter dados:', error));

    let products = [
        {
            id: 1,
            name: 'PRODUCT NAME 1',
            image: '1.PNG',
            price: 120000
        },
        {
            id: 2,
            name: 'PRODUCT NAME 2',
            image: '2.PNG',
            price: 120000
        },
        {
            id: 3,
            name: 'PRODUCT NAME 3',
            image: '3.PNG',
            price: 220000
        },
        {
            id: 4,
            name: 'PRODUCT NAME 4',
            image: '4.PNG',
            price: 123000
        },
        {
            id: 5,
            name: 'PRODUCT NAME 5',
            image: '5.PNG',
            price: 320000
        },
        {
            id: 6,
            name: 'PRODUCT NAME 6',
            image: '6.PNG',
            price: 120000
        }
    ];
    let listCards  = [];
    function initApp(){
        products.forEach((value, key) =>{
            let newDiv = document.createElement('div');
            newDiv.classList.add('item');
            newDiv.innerHTML = `
                <img src="image/${value.image}">
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}</div>
                <button onclick="addToCard(${key})">Add To Card</button>`;
            list.appendChild(newDiv);
        })
    }
    initApp();
    function addToCard(key){
        if(listCards[key] == null){
            // copy product form list to list card
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
            listCards[key].quantity = 1;
        }
        reloadCard();
    }
    function reloadCard(){
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
    }
    function changeQuantity(key, quantity){
        if(quantity == 0){
            delete listCards[key];
        }else{
            listCards[key].quantity = quantity;
            listCards[key].price = quantity * products[key].price;
        }
        reloadCard();
    }
}