console.log("Client side javascript file is loaded!");

fetch('http://localhost:3000/weather?address=korea').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.address)
            console.log(data.forecast)
        }
    })
})