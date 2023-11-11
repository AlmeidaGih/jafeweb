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
    });

    let list = document.querySelector('.list');
    let listCard = document.querySelector('.listCard');
    let body = document.querySelector('body');
    let total = document.querySelector('.total');
    let quantity = document.querySelector('.quantity');
}