const router = require("express").Router();

router.get("/", (req,res) => {
    console.log(req.body);
    res.send("Route working");
});


module.exports = router
