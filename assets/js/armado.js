const listaHamburguesaArm = [
    {nombre:"CUSTOM",precio:450,id:8,img:"armaBurger2.jpg",cantidad:1,carac:""}
]



//Carga inicial del modal
let listadoPedido = JSON.parse(localStorage.getItem("listadoPedido"))

let total = 0;
let pedido = "";
let hayHamburguesa = false;

listadoPedido.forEach((hamburguesa) => {
    total += parseInt(hamburguesa.cantidad) * hamburguesa.precio 
});

listadoPedido.forEach(function(hamburguesa){
    if(hamburguesa.cantidad > 0){
        hayHamburguesa = true;
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


function eliminarBurger(idHamburguesa){
    for (let i = 0; i < listadoPedido.length; i++) {
        const element = listadoPedido[i];
        if(element.id == idHamburguesa){
            listadoPedido.splice(i,1)
            break
        }
        
    }
    $(`#pedido${idHamburguesa}`).remove()

}


$("#btnAgregarArmado").click(function() {
    let desc = ""
    let precio = 450;
    let data = $("#formularioArmado").serializeArray();
    data.forEach((d) => {
        if(d.name == "presentacion"){
            desc += `${d.value} medallones de carne `
            precio += d.value * 50
        }
        else{
            if(d.name == "pan"){
                desc += `${d.value}, `
            }
            else{
                desc += `${d.name}, `
            }
        }

        if(d.name == "pan" && d.value == "papaqueso"){
            precio += 30
        }
    })
    console.log("$",precio,desc)
    $("html,body").animate({scrollTop:0},100)


});



$("#agregadoCarrito").click(function(){
    let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    myModal.show()
});



