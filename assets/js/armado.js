const ArmadoBurger =[
    {nombre:"Simple",precio: 500,id:10},
    {nombre:"Doble",precio: 550,id:11},
    {nombre:"Triple",precio: 600,id:12},
    {nombre:"Cuádruple",precio: 630,id:13}
]


//Carrito//

$("#btnAgregarArmado").click(function() {
    let str = $("#formularioArmado").serialize();
    $("#agregadoCarrito").css("display","block");
    alert( str );
  });



  