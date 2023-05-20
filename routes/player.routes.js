const { Router } = require("express");
const { getAllPlayers, addPlayer } = require("../controllers/player.controller");

const router = Router();

router.get('/',getAllPlayers)

router.post('/', addPlayer)

router.put('/', ( req, res ) => {
    res.send("Player Update");
})

router.delete('/', ( req, res ) => {
    res.send("Player Delete");

})

module.exports = router;