const { Router } = require("express");


const router = Router();

router.get('/',( req, res ) => {
    res.send("Player Get");
})

router.post('/', ( req, res ) => {
    console.log("Player Post", req.body);
    res.send(req.body);
})

router.put('/', ( req, res ) => {
    res.send("Player Update");
})

router.delete('/', ( req, res ) => {
    res.send("Player Delete");

})

module.exports = router;