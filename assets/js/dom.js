// array de tipos de hamburguesas//

const listaHamburguesas = [
    {nombre:"CLÁSICA", precio: 530, id: 1, img:"clasicBurger.jpg", cantidad: 0, carac:"(Pan de papa, carne smasheada, queso cheddar, lechuga, tomate, salsa especial y ketchup + papas)"},
    {nombre:"CHICKEN", precio: 550, id: 2, img:"chickenBurger.jpg", cantidad: 0 ,carac:"(Pan de papa, pechuga de pollo, queso emmental, bacon, salsa especial + papas)"},
    {nombre:"BACON", precio: 570, id: 3, img:"baconBurger.jpg", cantidad: 0,carac:"(Pan de papa, carne smasheada, queso cheddar, salsa especial + papas)"},
    {nombre:"BACONERA", precio: 580, id: 4, img:"baconBurger2.jpg", cantidad: 0,carac:"(Pan de papa, doble carne smasheada, queso cheddar, queso emmental, mayonesa casera + papas)"},
    {nombre:"ANIMAL", precio: 580, id: 5, img:"animalBurger.jpg", cantidad: 0,carac:"(Pan de papa con semillas, carne smasheada, queso fundido, cebolla morada, tomate con especias, lechuga morada, mayonesa casera + papas)"},
    {nombre:"DELUX", precio: 580, id: 6, img:"deluxBurger.jpg", cantidad: 0,carac:"(Pan de papa, doble carne smasheada premium, doble queso cheddar, lechuga, tomate, cebolla, pepinillos especiados, salsa especial hot + papas)"},
    {nombre:"BOMBASTER", precio: 580, id: 7, img:"gourmetBurger.jpg", cantidad: 0,carac:"(Pan de papa con semillas, doble carne smasheada, doble queso cheddar, cebolla caramelizada, pepinillos, morrones, salsa especial + papas)"},
]


//Lista hamburguesas//

const ul = document.querySelector(".burgers");
const listadoPedido = JSON.parse(localStorage.getItem("listadoPedido")) || []

let html = "";

listaHamburguesas.forEach(function(hamburguesa){
    html +=`<div class= "col etiquetaBurgers"> <img src="../assets/img/${hamburguesa.img}"" class="imgMenus">
    <p><b>${hamburguesa.nombre}</b></p>
    <p class= "caracteristicas">${hamburguesa.carac}</p>
    <p class= "precioBurger"><b> Precio: $ ${hamburguesa.precio}</b></p>
    <p> Cantidad: 
    <input type='number' class="cantidad" id="cantidad${hamburguesa.id}" value="${hamburguesa.cantidad}" min="0" max="50"></p><br>
    </div>`;
    ul.innerHTML = html;
});


//Carrito//


$("#agregadoCarrito").click(function(){
    resumenPedido()
    let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    myModal.show();
});

$(".cantidad").change(function(){
    resumenPedido()
})

//Función pedido final//


let elemento = document.getElementById("btnFinal");
elemento.addEventListener("click",resumenPedido);


function resumenPedido() {
    let total = 0;
    let pedido = "";
    let hayHamburguesa = false;
    listadoPedido.splice(0,listadoPedido.length)

    listaHamburguesas.forEach((hamburguesa) => {
        hamburguesa.cantidad = document.getElementById(`cantidad${hamburguesa.id}`).value;
        total += parseInt(hamburguesa.cantidad) * hamburguesa.precio 
    });

    listaHamburguesas.forEach(function(hamburguesa){
        if(hamburguesa.cantidad > 0){
            hayHamburguesa = true;
            listadoPedido.push(hamburguesa)
            pedido +=`
                <div id="pedido${hamburguesa.id}">
                <div class= "d-flex modalPedido" >
                <img class= "imgMenuCompra" src="../assets/img/${hamburguesa.img}">
                <div>${hamburguesa.cantidad} x ${hamburguesa.nombre}: $ ${parseInt(hamburguesa.cantidad) * hamburguesa.precio }</div>
                <div> <button onclick="eliminarBurger(${hamburguesa.id})" class="btn btn-primary">Eliminar</button> </div>
                </div><hr></div>`;
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
        window.location.href=`formulariopedido.html`;
    });

    localStorage.setItem("listadoPedido", JSON.stringify(listadoPedido))
}


//Carrito//


function eliminarBurger(idHamburguesa){
    for (let i = 0; i < listadoPedido.length; i++) {
        const element = listadoPedido[i];
        if(element.id == idHamburguesa){
            listadoPedido.splice(i,1)
            break
        }
        
    }
    $(`#pedido${idHamburguesa}`).remove()
    let total = 0;
    listadoPedido.forEach((hamburguesa) => {
        total += parseInt(hamburguesa.cantidad) * hamburguesa.precio 
    });
    $(".tot").text(`Total: $ ${total}`)

    function ocultar(){
        document.getElementById('confirmar').style.display = 'none';
    }
    if (total == 0){
        ocultar()
        $(".tot").text(`No hay hamburguesas en el pedido`)
    }

    localStorage.setItem("listadoPedido", JSON.stringify(listadoPedido))

    $(`#cantidad${idHamburguesa}`).val(0)
}