require('dotenv').config()
const express = require('express');
var cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.port=process.env.PORT;

        //CONECTAR BD

        //Middleware
        this.middleware();

        this.routes();

        //Eventos por sockets
        this.sockets();
    }

   

    middleware() {
        ////CORS
        this.app.use(cors());

        //LECTURA Y PARSOE DEL BODY
        this.app.use(express.json())

        ///CARPETA PUBLIC PARA SERVIR WEB PAGE
        this.app.use(express.static('public'))

        
    }


    routes() {
      //this.app.use('/api/usuarios',require('../routes/usuarios'))
    }


    sockets(){
        this.io.on("connection", socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }

}

module.exports = Server