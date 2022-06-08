const TicketControl = require("../models/TicketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // console.log("cliente Conectado: ",socket.id);

    // receive a message from the client
    socket.on("siguiente-ticket", (payload, callback) => {
        // console.log(payload);
        // this.io.emit("enviar-mensaje",payload)

        const sgte = ticketControl.siguiente();
        callback(sgte);

        socket.broadcast.emit('ticket-pendientes', ticketControl.tickets);

        //TODO: Notificar que hay un nuevo ticket
        //socket.broadcast.emit("enviar-mensaje",payload)
    });


    socket.on("atender-ticket", ({ escritorio }, callback) => {

        if (!escritorio) {
            callback({ ok: false, msg: "Escritorio es requerido" });
        }
        const ticket = ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit("estado-actual", ticketControl.ultimos4Tickets);
        socket.emit('ticket-pendientes', ticketControl.tickets);
        socket.broadcast.emit('ticket-pendientes', ticketControl.tickets);

        if (!ticket) {
            callback({ ok: false, msg: "Ya no hay tickets pendientes" });
        } else {
            callback({ ok: true, ticket })
        }
        //TODO: Notificar que hay un nuevo ticket
        //socket.broadcast.emit("enviar-mensaje",payload)
    });

    socket.emit("ultimo-ticket", ticketControl.ultimo);
    socket.emit("estado-actual", ticketControl.ultimos4Tickets);
    socket.emit('ticket-pendientes', ticketControl.tickets);
    socket.broadcast.emit('ticket-pendientes', ticketControl.tickets);



    socket.on('disconnect', () => {
        // console.log("cliente Desconectado",socket.id)
    })

}

module.exports = {
    socketController
}