

const socketController = (socket) => {
    // console.log("cliente Conectado: ",socket.id);


    // receive a message from the client
    socket.on("enviar-mensaje", (payload, callback) => {
        // console.log(payload);
        // this.io.emit("enviar-mensaje",payload)

        const id = 123456;
        callback(id);
        socket.broadcast.emit("enviar-mensaje",payload)

    });


    socket.on('disconnect', () => {
        // console.log("cliente Desconectado",socket.id)
    })

}

module.exports = {
    socketController
}