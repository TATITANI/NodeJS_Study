const socket = io()

const $msgForm = document.getElementById('msg-form')
const $input = document.getElementById('inputMsg')
const $btn = document.getElementById('btnMsg')
const $btnLocation = document.getElementById('send-location')
const $msg = document.getElementById('title')
const $box = document.getElementById('box')
const $messageTempalte = document.getElementById('message-template').innerHTML
const $locationMsgTempalte = document.getElementById('locationMsg-template').innerHTML

// var qs = require('querystring');
const {userName, room} = Qs.parse(location.search, {ignoreQueryPrefix : true})

function autoScroll() {
    $box.scrollTop = $box.scrollHeight
}


socket.emit('join', {userName, room})

socket.on('countUpdated', (count) => {
    console.log(`the count has been updated ${count}`)
})

socket.on("connect message", (msg) => {
    document.getElementById('title').innerText = msg
})

socket.on('msg', (msgData)=>{
    console.log(`msg 수신 : ${msgData.msg}`)
    const html = Mustache.render($messageTempalte, {
        msg : msgData.msg ,
        userName : msgData.userName,
        createdAt : moment(msgData.createdAt).format('h:mm a')
    })
    // const html = Mustache.render($messageTempalte, msgData)
    // beforeend : element 안에 가장 마지막 child
    $box.insertAdjacentHTML('beforeend', html)
    autoScroll()

})
socket.on('locationMsg', (msgData)=>{
    const html = Mustache.render($locationMsgTempalte, {
        url : msgData.url,
        userName : msgData.userName,
        createdAt : moment(msgData.createdAt).format('h:mm a')
    })
    $box.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

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
