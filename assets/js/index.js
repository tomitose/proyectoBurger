
fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => {
    //Fetch se ejecuto OK
    response.json().then((json) => {
        let min = 0;
        let max = json.length - 1
        const random = Math.floor(Math.random() * (max - min) + min);
        const chef = json[random]
        console.log(chef)
        alert("El chef de hoy es " + chef.name)
    })
})
.catch((error) => {
    //Fetch fallo
    console.log("error")
})