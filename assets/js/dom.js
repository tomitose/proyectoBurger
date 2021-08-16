// array de tipos de hamburguesas//

const listaHamburguesas = [
    {nombre:"CLÁSICA", precio: 530, id: 1, img:"clasicBurger.jpg", cantidad: 0},
    {nombre:"CHICKEN", precio: 550, id: 2, img:"chickenBurger.jpg", cantidad: 0},
    {nombre:"BACON", precio: 570, id: 3, img:"baconBurger.jpg", cantidad: 0},
    {nombre:"BACONERA", precio: 580, id: 4, img:"baconBurger2.jpg", cantidad: 0},
]



const ul = document.querySelector(".burgers");

let html = "";

listaHamburguesas.forEach(function(hamburguesa){
    html +=`<div class= "col"> <img src="../assets/img/${hamburguesa.img}"" class="imgMenus">
    <p><b>${hamburguesa.nombre}</b></p>
    <p class= "precioBurger"><b> Precio: $ ${hamburguesa.precio}</b></p>
    <p> Cantidad: 
    <input type='number' id="cantidad${hamburguesa.id}" value="${hamburguesa.cantidad}" min="0" max="50"></p><br>
    <button id="${hamburguesa.id}" class="btnAgregar btn-primary">Agregar</button>
    </div>`;
    ul.innerHTML = html;
});



//función pedido final//


let elemento = document.getElementById("btnFinal");
elemento.addEventListener("click",resumenPedido);


function resumenPedido() {
    let total = 0;
    let pedido = "";
    let hayHamburguesa = false;

    listaHamburguesas.forEach((hamburguesa) => {
        hamburguesa.cantidad = document.getElementById(`cantidad${hamburguesa.id}`).value;
        total += parseInt(hamburguesa.cantidad) * hamburguesa.precio 
    });

    listaHamburguesas.forEach(function(hamburguesa){
        if(hamburguesa.cantidad > 0){
            hayHamburguesa = true;
            pedido +=`<div class= "d-flex">
            <img class= "imgMenuCompra" src="../assets/img/${hamburguesa.img}">
                <div>${hamburguesa.cantidad} x ${hamburguesa.nombre}: $ ${parseInt(hamburguesa.cantidad) * hamburguesa.precio }</div>
            </div><hr>`;
        }
    });

    if(hayHamburguesa){
        pedido+=`<div class="tot">Total: $ ${total} </div>`
        pedido+=`<button id='confirmar'>Confirmar pedido</button>`
    }
    else{
        pedido+=`<div class="tot">No hay hamburguesas en el pedido</div>`
    }

    $(".modal-body").html(pedido);
    $("#confirmar").click(function(){
        alert("Su pedido ha sido confirmado")
        location.reload();
    });
}


