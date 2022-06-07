console.log("hola mundo");

const socket = io();

const online= document.getElementById('online');
const offline= document.getElementById('offline');
const btnEnviar= document.getElementById('btnEnviar');
const textMensaje= document.getElementById('textMensaje');



socket.on('connect',() => {
    offline.style.display='none';
    online.style.display='';
})

socket.on('disconnect',() => {
    offline.style.display='';
    online.style.display='none';
})

socket.on('enviar-mensaje',(payload) => {
    //ESCUHCA
    console.log(payload)
})

btnEnviar.addEventListener('click',() => {
    const mensaje = textMensaje.value;

    const payload = {
        mensaje,
        id:1123,
        fecha:new Date()
    }

    socket.emit('enviar-mensaje',payload,(id)=>{
        ///EMITE
        console.log("desde el server:" + id)
    });
})