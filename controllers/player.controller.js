

let playersDB = [];

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
        name: req.body.name,
        score: req.body.score
    }

    playersDB.push(player);
    
    res.send({
        msg: "Player Added",
        player
    })
}


module.exports = {
    getAllPlayers,
    addPlayer
}