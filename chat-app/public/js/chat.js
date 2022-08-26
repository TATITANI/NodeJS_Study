const socket = io()

socket.on('countUpdated', (count) => {
    console.log(`the count has been updated ${count}`)
})

socket.on("connect message", (msg) => {
    document.getElementById('msg').innerText = msg
})

socket.on('msg', (msg)=>{
    console.log(`msg 수신 : ${msg}`)
})

document.getElementById('msg-form').addEventListener('submit', (event) =>{
    event.preventDefault() // submit 기본동작 차단
    // 이름이 msg인 요소 값
    const msg = event.target.elements.msg
    SendMsg(document.getElementById('inputMsg').value)
})

function SendMsg(msg) {
    console.log(`msg 전송 : ${msg}`)
    socket.emit('msg',  msg)
}

document.getElementById('send-location').addEventListener('click', () =>{
    if(!navigator.geolocation){
        return alert('geolocation is not suppoorted by your browser')
    }
     navigator.geolocation.getCurrentPosition((pos)=>{
        console.log(pos)
        socket.emit('sendLocation', {
            latitude : pos.coords.latitude,
            longitude : pos.coords.longitude
        })
     })
})


// document.querySelector('#increment').addEventListener('click', () =>{
//     console.log('click')
//     socket.emit('increment')
// })

