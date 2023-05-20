require('dotenv').config();
const fs = require('fs')

let playersDB = [];

const pathDB = `${ __dirname }/../database/data.json`;

fs.readFile(pathDB, (err, data) => {
    if(err){
        fs.writeFile(pathDB, "[]", err => console.log(err) )
        return;
    }
    playersDB = JSON.parse(data);
})



const getAllPlayers = (req,res) => {
    res.send(playersDB);
}   


const addPlayer = (req,res) => {

    if(!req.body.name || req.body.score == undefined){
        res.status(401).send({
            msg: "The Player must have a name and a socre"
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

        let minScore = process.env.MAX_SCORE;
        let minScoreID;
        playersDB.forEach( (player, index) => {
            if( minScore > player.score ){
                minScore = player.score;
                minScoreID = index;
            }
        })
        playersDB.splice(minScoreID,1);
    }

    fs.writeFile(pathDB, JSON.stringify(playersDB), (err) => {
        if(err)
            console.log("Error to Save", err)
    });
 
    res.send({
        msg: "Player Added",
        player
    })
}


module.exports = {
    getAllPlayers,
    addPlayer
}