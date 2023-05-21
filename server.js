require('dotenv').config();

const cors = require('cors')
const express = require('express');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.APP_PORT;
    
        this.path = '/api/player';

        this.middlewares();

        this.routes();
    }

    start(){
        this.app.listen(this.port,() => {
            console.log(`Server online on port ${this.port}`)
        })
    }

    // Antes de procesar la peticion haz esto
    middlewares() {

        // arregla el errror de cors
        this.app.use(cors())

        // Convertir los datos recibido en json
        this.app.use(express.json());
    }

    routes(){   
        this.app.use(this.path, require('./routes/player.routes'));
    }

}

module.exports = Server;