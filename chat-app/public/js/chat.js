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

const $msgForm = document.getElementById('msg-form')
const $input = document.getElementById('inputMsg')
const $btn = document.getElementById('btnMsg')
const $btnLocation = document.getElementById('send-location')

$msgForm.addEventListener('submit', (event) =>{
    event.preventDefault() // submit 기본동작 차단

    $btn.setAttribute('disabled', 'disabled')
    
    // 이름이 inputMsg인 요소 값
    // const msg = event.target.elements.inputMsg.value
    const msg = $input.value

    socket.emit('msg',  msg, ()=>{
        $btn.removeAttribute('disabled', 'disabled')
        $input.value =''
        $input.focus()
        console.log(`입력값 전송됨: ${msg}`)
    })
  
})


document.getElementById('send-location').addEventListener('click', () =>{
    if(!navigator.geolocation){
        return alert('geolocation is not suppoorted by your browser')
    }
    
    $btnLocation.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos)
        $btnLocation.removeAttribute('disabled', 'disabled')
        
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

