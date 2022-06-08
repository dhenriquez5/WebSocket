


const nuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('#btn_crear');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});


socket.on('ultimo-ticket', (payload) => {
    nuevoTicket.innerText="Ticket "+payload
})


btnCrear.addEventListener('click', () => {


    socket.emit('siguiente-ticket', null, (ticket) => {
        nuevoTicket.innerText=ticket
    });

});