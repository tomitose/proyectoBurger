$('#btnWhatsapp').click(function(e){
    e.preventDefault()
    const nombre = $("#inputNombre").val()
    const apellido = $("#inputApellido").val()
    const tel = $("#inputTelefono").val()
    if (!nombre || !apellido || !tel ){
        alert("Ingresa los datos del formulario")
        return
    }
    const listadoPedido = JSON.parse(localStorage.getItem("listadoPedido"))
    let mensaje = `Hola que tal mi nombre es *${nombre} ${apellido} - Número de Teléfono ${tel}*, quiero hacer un pedido con las siguientes hamburguesas:%0A%0A`
    listadoPedido.forEach( h => {
        mensaje += `*${h.cantidad}x ${h.nombre} - $${parseInt(h.cantidad) * h.precio}*`
        if(h.nombre == "CUSTOM"){
            mensaje += ` con los siguientes ingredientes: ${h.carac}`
        }
        mensaje += "%0A"

    });
    mensaje += "%0AMuchas gracias!"
    window.location.href = 'https://api.whatsapp.com/send?text='+mensaje+'&phone=5493543552837'
});
