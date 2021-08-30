const div = document.getElementById("chefDiaCustom");
let html = "";

fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => {
    //Fetch se ejecuto OK
    response.json().then((json) => {
        let min = 0;
        let max = json.length - 1;
        const random = Math.floor(Math.random() * (max - min) + min);
        const chef = json[random]        
        console.log(chef)
        html += ( `<div><h4> Chef del día es <h4 class="nombreChef"> <b>${chef.name}</b> </h4></div>`);
        div.innerHTML = html;
    })
})
.catch((error) => {
    //Fetch fallo
    console.log("error")
})