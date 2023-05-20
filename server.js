require('dotenv').config();

const express = require('express');

class Server {
    
    constructor(){
        this.app = express();
        this.port=process.env.APP_PORT;
    }

    start(){
        this.app.listen(this.port,() => {
            console.log(`Server online on port ${this.port}`)
        })
    }

}

module.exports = Server;