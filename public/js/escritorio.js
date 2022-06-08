
const escritorioTitle = document.querySelector('#escritorio-title');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const lblPendientes = document.querySelector('#lblPendientes')
const alert = document.querySelector('.alert');

const searchParams  = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){

    window.location='index.html';
    throw new Error('El escritorio es obligatorio');
} 

const escritorio = searchParams.get('escritorio');
escritorioTitle.innerText=escritorio
alert.style.display='none'

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


socket.on('ultimo-ticket', (payload) => {
    //nuevoTicket.innerText="Ticket "+payload
})

socket.on('ticket-pendientes',(payload) => {
    console.log(payload);
    lblPendientes.innerText= payload.length
})


btnAtender.addEventListener('click', () => {

    const payload ={
        escritorio
    }

    socket.emit('atender-ticket', payload, ({ok,ticket}) => {
        if(!ok) {
         lblTicket.innerText= "Nadie"
           return  alert.style.display=''
        };

        lblTicket.innerText= "Ticket "+ticket.numero

    });

});