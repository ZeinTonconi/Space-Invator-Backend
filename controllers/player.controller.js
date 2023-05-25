require('dotenv').config();
const fs = require('fs')

// La Base de Datos de los jugadores
let playersDB = [];

const pathDB = `${ __dirname }/../database/data.json`;

fs.readFile(pathDB, (err, data) => {
    // Pregunta si existe /database/data.json
    if(err){ // Si es que no existe
        fs.writeFile(pathDB, "[]", err => console.log(err) )
        return;
    }
    // Si es que si existia
    playersDB = JSON.parse(data);
})



const getAllPlayers = (req,res) => {

    const sortedDB = [...playersDB]
    sortedDB.sort( (a,b) => {
        return b.score-a.score;
    })

    res.send(sortedDB);
}   


const addPlayer = (req,res) => {

    if(!req.body.name || req.body.score == undefined){
        // codigo 401 Peticion Erronea
        res.status(401).send({
            msg: "The Player must have a name and a score"
        })
        return;
    }

    const player = {
        id: playersDB.length,
        name: req.body.name,
        score: req.body.score
    }

    playersDB.push(player);

    while(playersDB.length > process.env.NUM_PLAYER_LIMIT){


        // Buscar el jugador con menor puntaje
        let minScore = process.env.MAX_SCORE;
        let minScoreID;
        playersDB.forEach( (player, index) => {
            if( minScore > player.score ){
                minScore = player.score;
                minScoreID = index;
            }
        })
        //Eliminarlo
        playersDB.splice(minScoreID,1);
    }

    fs.writeFile(pathDB, JSON.stringify(playersDB), (err) => {
        if(err)
            console.log("Error to Save", err)
    });
    // Codigo 200 peticion Correcta
    res.send({
        msg: "Player Added",
        player
    })
}


module.exports = {
    getAllPlayers,
    addPlayer
}